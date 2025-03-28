import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserList.css';

function UserList() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [message, setMessage] = useState({ text: '', type: '' });
  const navigate = useNavigate();

  // Fetch all users when component mounts
  useEffect(() => {
    fetchAllUsers();
  }, []);

  // Fetch all users from all pages
  const fetchAllUsers = async () => {
    setLoading(true);
    try {
      let allUserData = [];
      const firstResponse = await axios.get('https://reqres.in/api/users?page=1');
      const totalPages = firstResponse.data.total_pages;

      // Fetch all pages
      for (let page = 1; page <= totalPages; page++) {
        const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
        allUserData = [...allUserData, ...response.data.data];
      }

      setAllUsers(allUserData);
      setTotalUsers(allUserData.length);

      // Initialize with all users on first page
      const itemsPerPage = 6;
      setTotalPages(Math.ceil(allUserData.length / itemsPerPage));
      setUsers(allUserData.slice(0, itemsPerPage));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching all users:', error);
      setLoading(false);
    }
  };

  // Handle search and pagination
  const handleSearch = (searchValue = searchTerm) => {
    const filteredUsers = allUsers.filter(user =>
      `${user.first_name} ${user.last_name}`
        .toLowerCase()
        .includes(searchValue.toLowerCase())
    );

    setTotalUsers(filteredUsers.length);
    setTotalPages(Math.ceil(filteredUsers.length / 6));

    // Get current page's users
    const indexOfLastUser = currentPage * 6;
    const indexOfFirstUser = indexOfLastUser - 6;
    setUsers(filteredUsers.slice(indexOfFirstUser, indexOfLastUser));
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      handleSearch();
    }
  };

  // Update search term handler
  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    setCurrentPage(1); // Reset to first page when searching
    handleSearch(newSearchTerm); // Pass the new search term directly
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      
      // Update allUsers state
      const updatedAllUsers = allUsers.filter(user => user.id !== id);
      setAllUsers(updatedAllUsers);
      
      // Store in localStorage
      localStorage.setItem('users', JSON.stringify(updatedAllUsers));
      
      // Recalculate pagination
      setTotalUsers(updatedAllUsers.length);
      const newTotalPages = Math.ceil(updatedAllUsers.length / 6);
      setTotalPages(newTotalPages);
      
      // Adjust current page if necessary
      if (currentPage > newTotalPages) {
        setCurrentPage(newTotalPages);
      }
      
      // Update displayed users
      handleSearch(searchTerm);
      
      setMessage({
        text: 'User deleted successfully!',
        type: 'success'
      });
      
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    } catch (error) {
      console.error('Error deleting user:', error);
      setMessage({
        text: 'Failed to delete user. Please try again.',
        type: 'error'
      });
    }
  };

  useEffect(() => {
    const handleUserUpdate = (event) => {
      if (event.state?.updatedUser) {
        const updatedUser = event.state.updatedUser;
        
        // Update allUsers state
        setAllUsers(prevUsers =>
          prevUsers.map(user =>
            user.id === updatedUser.id ? updatedUser : user
          )
        );

        // Update displayed users if necessary
        setUsers(prevUsers =>
          prevUsers.map(user =>
            user.id === updatedUser.id ? updatedUser : user
          )
        );

        // Show success message
        setMessage({
          text: 'User updated successfully!',
          type: 'success'
        });

        // Clear message after 3 seconds
        setTimeout(() => setMessage({ text: '', type: '' }), 3000);
      }
    };

    window.addEventListener('popstate', handleUserUpdate);
    return () => window.removeEventListener('popstate', handleUserUpdate);
  }, []);

  // Generate an array of page numbers to display
  const generatePaginationNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="user-list-container">
      <div className="header">
        <h2>User List</h2>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>

      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      {loading ? (
        <div className="loading-spinner">Loading...</div>
      ) : (
        <>
          <div className="users-grid">
            {users.map(user => (
              <div key={user.id} className="user-card">
                <img 
                  src={user.avatar.replace('/140', '/512')} // Request larger image
                  alt={`${user.first_name} ${user.last_name}`}
                  loading="lazy" // Add lazy loading
                  decoding="async" // Optimize image decoding
                />
                <div className="user-info">
                  <h3>{`${user.first_name} ${user.last_name}`}</h3>
                  <p>{user.email}</p>
                  <div className="user-actions">
                    <button 
                      onClick={() => navigate(`/edit/${user.id}`)}
                      className="edit-button"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(user.id)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pagination">
            <button 
              onClick={() => handlePageChange(currentPage - 1)} 
              disabled={currentPage === 1}
              className="pagination-button"
            >
              Previous
            </button>

            {generatePaginationNumbers().map(pageNum => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`pagination-number ${currentPage === pageNum ? 'active' : ''}`}
              >
                {pageNum}
              </button>
            ))}

            <button 
              onClick={() => handlePageChange(currentPage + 1)} 
              disabled={currentPage === totalPages}
              className="pagination-button"
            >
              Next
            </button>
          </div>

          <div className="pagination-info">
            Page {currentPage} of {totalPages} | Total Users: {totalUsers}
          </div>
        </>
      )}
    </div>
  );
}

export default UserList;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './EditUser.css';

function EditUser() {
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    avatar: ''
  });
  const [error, setError] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`https://reqres.in/api/users/${id}`);
        setUser(response.data.data);
        setTimeout(() => setIsFlipped(true), 500);
      } catch (error) {
        setError('Failed to fetch user details');
      }
    };
    fetchUserDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.put(`https://reqres.in/api/users/${id}`, {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email
      });

      if (response.status === 200) {
        const updatedUser = { ...user, id: parseInt(id) };
        const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const updatedUsers = allUsers.map(u => 
          u.id === updatedUser.id ? updatedUser : u
        );
        localStorage.setItem('users', JSON.stringify(updatedUsers));

        navigate('/users', { state: { updatedUser } });
      }
    } catch (error) {
      setError('Failed to update user. Please try again.');
    }
  };

  return (
    <div className="edit-container">
      <div className={`card-flip ${isFlipped ? 'flipped' : ''}`}>
        <div className="card-inner">
          <div className="card-front">
            <button 
              className="flip-trigger" 
              onClick={handleFlip}
              title="Click to edit"
            >
              ✏️
            </button>
            {user.avatar && (
              <div className="user-avatar-container">
                <img 
                  src={user.avatar}
                  alt={`${user.first_name} ${user.last_name}`}
                  className="user-avatar"
                />
                <div className="user-info-overlay">
                  <h3>{`${user.first_name} ${user.last_name}`}</h3>
                  <p>{user.email}</p>
                </div>
              </div>
            )}
          </div>

          <div className="card-back">
            <button 
              className="flip-trigger" 
              onClick={handleFlip}
              title="Back to profile"
            >
              👤
            </button>
            <form onSubmit={handleSubmit} className="edit-form">
              <h2>Edit User</h2>
              {error && <div className="error-message">{error}</div>}
              
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="first_name"
                  value={user.first_name || ''}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  value={user.last_name || ''}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={user.email || ''}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-actions">
                <button type="submit" className="update-button">
                  Update User
                </button>
                <button 
                  type="button" 
                  onClick={() => navigate('/users')}
                  className="cancel-button"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditUser;
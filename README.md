# User Management System

A React-based user management system with authentication, CRUD operations, and responsive design.

## Features

- User authentication with JWT
- User listing with pagination and search
- Edit user details with card flip animation
- Delete user functionality
- Responsive design for all devices
- Token-based authentication persistence
- Loading states and error handling

## Live Demo

[Demo Link](https://employwise-user-management-six.vercel.app/)

## Installation

1. Clone the repository
```bash
git clone https://github.com/sksoni2006/employ.git
cd user-management-system
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

The application will start running at `http://localhost:3000`

## Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=https://reqres.in/api
```

## Usage

### Login Credentials
- Email: eve.holt@reqres.in
- Password: cityslicka

### Available Routes
- `/login` - Login page
- `/users` - User listing page (Protected)
- `/edit/:id` - Edit user page (Protected)

## Project Structure

```
my-app/
│── node_modules/
│── public/
│── src/
│   ├── components/
│   │   ├── Edituser/
│   │   │   ├── EditUser.css
│   │   │   ├── EditUser.js
│   │   ├── Login/
│   │   │   ├── Login.css
│   │   │   ├── Login.js
│   │   ├── Userlist/
│   │   │   ├── UserList.css
│   │   │   ├── UserList.js
│   │   ├── PrivateRoute.js
│   ├── utils/
│   │   ├── auth.js
│   │   ├── axios-config.js
│   ├── App.js
│   ├── index.js
│── .env
│── package.json
│── README.md
```

## API Integration

This project uses the ReqRes API for demonstration:
- Authentication: POST /api/login
- User List: GET /api/users
- Update User: PUT /api/users/{id}
- Delete User: DELETE /api/users/{id}

## Tech Stack

- React 18
- React Router v6
- Axios
- CSS3 with animations
- Local Storage for persistence

## Features in Detail

1. **Authentication**
   - JWT token-based auth
   - Protected routes
   - Token persistence
   - Auto logout on token expiry

2. **User Management**
   - List users with pagination
   - Search functionality
   - Edit user details
   - Delete users
   - Responsive card layout

3. **UI/UX**
   - Card flip animations
   - Loading states
   - Error handling
   - Success messages
   - Responsive design
   - Dark mode support

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Known Limitations

1. ReqRes API is a mock API:
   - Updates aren't persistent on the server
   - Limited to provided test data
   - Token doesn't actually expire

2. Search is client-side only

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details

## Contact

Your Name - Shubham Kumar Soni
Mail id:shubhamkumar99399006@gmail.com
Project Link: [https://github.com/sksoni2006/employ.git](https://github.com/sksoni2006/employ)

## Acknowledgments

- [ReqRes API](https://reqres.in/) for the test API
- [React Documentation](https://reactjs.org/)
- [React Router](https://reactrouter.com/)

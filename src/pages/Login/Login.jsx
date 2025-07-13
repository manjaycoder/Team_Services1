import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError('Email and password are required.');
      return;
    }

    try {
      // Dummy role logic based on email
      let role = 'viewer'; // default
      if (email.includes('admin')) role = 'admin';
      else if (email.includes('manager')) role = 'manager';

      // Call login function from context
      login(email, role); // You can add EmpId and userName if needed

      // Redirect
      navigate('/Team-Service-UI/', { replace: true });
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h2>

        {error && (
          <p className="text-red-600 text-sm mb-4 text-center font-medium">{error}</p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
              Email:
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
              placeholder="e.g. admin@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
              placeholder="Enter any password"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md w-full transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Navbar rendered, user state:', user);
  }, [user]);

  const handleLogout = () => {
    console.log('Logout clicked');
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-green-600">Bloganza</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/create-blog"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Create Blog
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-white text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 
import React, { useState } from 'react';
import { assets } from '../assets/assets.js';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-400 px-4 md:px-10">
      {/* Logo */}
      <img
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt="logo"
        onClick={() => navigate('/')}
      />

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center gap-5 font-medium">
        <NavLink to="/"><li className="py-1">Home</li></NavLink>
        <NavLink to="/doctors"><li className="py-1">All Doctors</li></NavLink>
        <NavLink to="/about"><li className="py-1">About</li></NavLink>
        <NavLink to="/contact"><li className="py-1">Contact</li></NavLink>
      </ul>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        {isAuthenticated && user ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img
              onClick={() => navigate('/')}
              className="w-8 rounded-full"
              src={user?.image || assets.profile_pic || 'https://via.placeholder.com/150'}
              alt="profile"
            />
            <img className="w-2.5" src={assets.dropdown_icon} alt="dropdown" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p onClick={() => navigate('/my-profile')} className="hover:text-black cursor-pointer">My Profile</p>
                <p onClick={() => navigate('/my-appointments')} className="hover:text-black cursor-pointer">My Appointments</p>
                <p onClick={handleLogout} className="hover:text-black cursor-pointer">Logout</p>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Login Button */}
            <button
              onClick={() => navigate('/login')}
              className="bg-primary text-white px-5 py-2 rounded-full font-light hidden md:block"
            >
              Login
            </button>
            {/* Admin Panel Button */}
            <a
              href="https://doctor-booking-appointment-application-6gu7-bg7b4nbd7.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-600 text-white px-5 py-2 rounded-full font-light hidden md:block"
            >
              Admin Panel
            </a>
          </>
        )}

        {/* Hamburger Menu Icon */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden"
          src={assets.menu_icon}
          alt="menu"
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed md:hidden top-0 right-0 z-50 bg-white h-screen w-[70%] transition-transform ${
          showMenu ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-6 border-b border-gray-200">
         
          <img
            className="w-7 cursor-pointer"
            onClick={() => setShowMenu(false)}
            src={assets.cross_icon}
            alt="close"
          />
        </div>

        <ul className="flex flex-col items-start gap-4 mt-5 px-6 text-base font-medium">
          <NavLink to="/" onClick={() => setShowMenu(false)}>Home</NavLink>
          <NavLink to="/doctors" onClick={() => setShowMenu(false)}>All Doctors</NavLink>
          <NavLink to="/about" onClick={() => setShowMenu(false)}>About</NavLink>
          <NavLink to="/contact" onClick={() => setShowMenu(false)}>Contact</NavLink>

          {!isAuthenticated ? (
            <>
              <NavLink to="/login" onClick={() => setShowMenu(false)} className="text-blue-600 mt-4">Login</NavLink>
              <a
                href="https://doctor-booking-appointment-application-6gu7.vercel.app"
              
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600"
              >
                Admin Panel
              </a>
            </>
          ) : (
            <>
              <NavLink to="/my-profile" onClick={() => setShowMenu(false)}>My Profile</NavLink>
              <NavLink to="/my-appointments" onClick={() => setShowMenu(false)}>My Appointments</NavLink>
              <p onClick={() => { setShowMenu(false); handleLogout(); }} className="cursor-pointer text-red-500">Logout</p>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

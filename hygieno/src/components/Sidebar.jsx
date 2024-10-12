import React from 'react';
import '../styles/sidebar.css'; // Import your sidebar styling here
import logo192  from '../assets/Guts.jpg';

const Sidebar = ({state , userType}) => {
  const firstName=state.firstName;
  const lastName=state.lastName;
  //        <img className="afterExp" src={''} alt="profile picture" />

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        {/* Sidebar header content */}
        <h2>{firstName}{lastName}</h2>
      </div>
      <div className="sidebar-menu">
        {/* Sidebar menu items */}
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

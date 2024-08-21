// UserProfile.js

import React from 'react';
import './userprofile.css';
// import profileImage from './businessman-profile-cartoon_18591-58479.jpg';
// import backgroundImage from './cosmos-1853491_1280.jpg';

const UserProfile = () => {
  return (
    <div className="profile-body">
        <div className='profile-container'>
            <div className="profile-img">
            <img src={profileImage} alt="Profile" />
            </div>
            <div className="profile-info">
                <h2>John Doe</h2>
                <p>Software Engineer</p>
                <p>Location: San Francisco, CA</p>
                <p>Email: johndoe@example.com</p>
                <p>Phone: (123) 456-7890</p>
            </div>
      {/* <div className="profile-img">
        <img src={profileImage} alt="Profile" />
      </div>
      <div className="profile-info">
        <h2>John Doe</h2>
        <p>Software Engineer</p>
        <p>Location: San Francisco, CA</p>
        <p>Email: johndoe@example.com</p>
        <p>Phone: (123) 456-7890</p> */}
      </div>
    </div>
  );
};

export default UserProfile;
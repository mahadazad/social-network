import React from 'react';

import './ProfileHeader.css';

const ProfileHeader = () => {
  return (
    <div className="ProfileHeader">
      <div className="ProfileHeader__avatar-area">
        <div className="ProfileHeader__avatar" />
        <div className="ProfileHeader__details-wrap">
          <div className="ProfileHeader__name">Itchy</div>
          <div className="ProfileHeader__location">Karachi | Pakistan</div>
        </div>
      </div>
      <div className="ProfileHeader__menu-area">

      </div>
    </div>
  )
};

export default ProfileHeader;

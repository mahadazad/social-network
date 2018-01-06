import React from 'react';
import PropTypes from 'prop-types';

import './ProfileHeader.css';

import { DEFAULT_AVATR } from '../../constants';

import BorderButton from '../Button/BorderButton';

const ProfileHeader = (props) => {
  const src = props.avatar || DEFAULT_AVATR;

  return (
    <div className="ProfileHeader">
      <div className="ProfileHeader__avatar-area">
        <div style={{
          backgroundImage: `url(${src})`,
        }}
             className="ProfileHeader__avatar"/>
        <div className="ProfileHeader__details-wrap">
          <div className="ProfileHeader__name">{props.firstName} {props.lastName}</div>
          <div className="ProfileHeader__location">{props.city} | {props.country}</div>
        </div>
      </div>
      <div className="ProfileHeader__menu-area">
        {props.isFollowed
          ? <BorderButton className="ProfileHeader__button"
                          onClick={props.onUnFollow}>
            <span className="ProfileHeader__button-icon fa fa-user-times"/>
            unfollow
          </BorderButton>
          : <BorderButton className="ProfileHeader__button"
                          onClick={props.onFollow}>
            <span className="ProfileHeader__button-icon fa fa-user-plus"/>
            follow
          </BorderButton>}
      </div>
    </div>
  )
};

ProfileHeader.propTypes = {
  isFollowed: PropTypes.bool,
  userId: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  city: PropTypes.string,
  country: PropTypes.string,
  avatar: PropTypes.string,
  onFollow: PropTypes.func,
  onUnFollow: PropTypes.func,
};

export default ProfileHeader;

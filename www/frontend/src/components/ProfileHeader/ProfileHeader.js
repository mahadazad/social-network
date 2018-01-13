// @flow
import * as React from 'react';

import { DEFAULT_AVATR } from '../../constants';

import BorderButton from '../Button/BorderButton';

import './ProfileHeader.css';

const renderFollowButton = ({ isCurrentUser, isFollowed, onFollow, onUnFollow }) => {
  if (!isCurrentUser) {
    if (isFollowed) {
      return (
        <BorderButton className="ProfileHeader__button" onClick={onUnFollow}>
          <span className="ProfileHeader__button-icon fa fa-user-times" />
          unfollow
        </BorderButton>
      );
    }

    return (
      <BorderButton className="ProfileHeader__button" onClick={onFollow}>
        <span className="ProfileHeader__button-icon fa fa-user-plus" />
        follow
      </BorderButton>
    );
  }

  return null;
};

type ProfileHeaderProps = {
  isCurrentUser: boolean,
  isFollowed: boolean,
  userId: string,
  firstName: string,
  lastName: string,
  city: string,
  country: string,
  avatar: string,
  onFollow: Function,
  onUnFollow: Function,
};

const ProfileHeader = (props: ProfileHeaderProps) => {
  const src = props.avatar || DEFAULT_AVATR;

  return (
    <div className="ProfileHeader">
      <div className="ProfileHeader__avatar-area">
        <div
          style={{
            backgroundImage: `url(${src})`,
          }}
          className="ProfileHeader__avatar"
        />
        <div className="ProfileHeader__details-wrap">
          <div className="ProfileHeader__name">
            {props.firstName} {props.lastName}
          </div>
          <div className="ProfileHeader__location">
            {props.city} | {props.country}
          </div>
        </div>
      </div>
      <div className="ProfileHeader__menu-area">{renderFollowButton(props)}</div>
    </div>
  );
};

export default ProfileHeader;

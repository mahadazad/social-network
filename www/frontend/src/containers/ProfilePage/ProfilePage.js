// @flow
import React, { Fragment } from 'react';
import jwtDecode from 'jwt-decode';
import { withRouter } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import Sidebar from '../../components/Sidebar/Sidebar';
import SidebarAbout from '../../components/Sidebar/SidebarAbout';
import SidebarUsers from '../../components/Sidebar/SidebarUsers';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import StatusArea from '../../components/StatusArea/StatusArea';
import Posts from '../Posts/Posts';

import './ProfilePage.scss';

type ProfilePageProps = {
  subscribeToChangeFollow: Function,
  onChangeFollow: Function,
  profileData: Object,
};

type ProfilePageState = {
  isCurrentUser: boolean,
  isFollowed: boolean,
};

class ProfilePage extends React.Component<ProfilePageProps, ProfilePageState> {
  state = {
    isCurrentUser: false,
    isFollowed: false,
  };

  componentDidMount() {
    this.props.subscribeToChangeFollow();
  }

  componentWillReceiveProps(nextProps) {
    let currentUserId;

    try {
      const data = jwtDecode(localStorage.getItem('token'));
      currentUserId = data.id;
    } catch (e) {
    }

    this.setState({
      isCurrentUser: currentUserId === nextProps.profileData.user.id,
      isFollowed: nextProps.profileData.isFollowed,
    });
  }

  onFollow = () => {
    this.props.onChangeFollow('follow').then(() => {
      this.setState({
        isFollowed: true,
      });
    });
  };

  onUnFollow = () => {
    this.props.onChangeFollow('unfollow').then(() => {
      this.setState({
        isFollowed: false,
      });
    });
  };

  render() {
    const { user, followers, followings } = this.props.profileData;

    if (!user) {
      return null;
    }

    const { isFollowed } = this.state;

    return (
      <Fragment>
        <Sidebar position="left">
          <SidebarAbout />
          <SidebarUsers title="Following" users={followings} />
        </Sidebar>
        <div>
          <ProfileHeader
            isCurrentUser={this.state.isCurrentUser}
            isFollowed={isFollowed}
            userId={user.id}
            firstName={user.firstName}
            lastName={user.lastName}
            avatar={user.avatar}
            city={user.city}
            country={user.country}
            onFollow={this.onFollow}
            onUnFollow={this.onUnFollow}
          />

          {this.state.isCurrentUser && <StatusArea />}

          <Posts userId={user.id} />
        </div>
        <Sidebar position="right">
          <SidebarUsers title="Followers" users={followers} />
        </Sidebar>
      </Fragment>
    );
  }
}

const UserProfileQuery = gql`
  query ProfileData($userId: String) {
    user(id: $userId) {
      id
      firstName
      lastName
      avatar
      city
      country
    }
    followers(id: $userId) {
      id
      firstName
      lastName
      avatar
    }
    followings(id: $userId) {
      id
      firstName
      lastName
      avatar
    }
    isFollowed(followingId: $userId)
  }
`;

const changeFollowMutation = gql`
  mutation ChangeFollow($type: String, $user: String) {
    changeFollow(type: $type, user: $user) {
      type
    }
  }
`;

const onChangeFollowSubscription = gql`
  subscription {
    onChangeFollow {
      type
      follower {
        id
        firstName
        lastName
        avatar
      }
      following {
        id
        firstName
        lastName
        avatar
      }
    }
  }
`;

export default compose(
  graphql(UserProfileQuery, {
    name: 'profileData',
    options(props) {
      const userId = props.match.params.id;
      return {
        variables: {
          userId,
        },
      };
    },
    props: props => ({
      ...props,
      subscribeToChangeFollow() {
        props.profileData.subscribeToMore({
          document: onChangeFollowSubscription,
          updateQuery(prev, { subscriptionData }) {
            const { type, follower, following } = subscriptionData.data.onChangeFollow;

            if (type === 'follow') {
              return {
                ...prev,
                followers: [...prev.followers, follower],
              };
            }

            return {
              ...prev,
              followers: prev.followers.filter(user => user.id !== follower.id),
            };
          },
        });
      },
    }),
  }),
  graphql(changeFollowMutation, {
    name: 'follow',
    props: ({ ownProps, follow }) => ({
      onChangeFollow(type) {
        const user = ownProps.match.params.id;

        return follow({
          variables: {
            type,
            user,
          },
        });
      },
    }),
  }),
)(withRouter(ProfilePage));

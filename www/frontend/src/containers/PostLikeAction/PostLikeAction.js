// @flow
import * as React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import PostAction from '../../components/Post/PostAction';

type PostLikeActionProps = {
  postId: string,
  onLike: Function, // eslint-disable-line react/no-unused-prop-types
  like: Function,
};

class PostLikeAction extends React.PureComponent<PostLikeActionProps> {
  static defaultProps = {
    onLike: null,
  };

  like = () => {
    this.props.like(this.props.postId);
  };

  render() {
    return <PostAction icon="thumbs-o-up" onClick={this.like} />;
  }
}

const likeMutation = gql`
  mutation LikePost($postId: String!) {
    likePost(postId: $postId)
  }
`;

export default graphql(likeMutation, {
  name: 'like',
  props: ({ ownProps: { onLike }, like }) => ({
    like: async postId => {
      await like({
        variables: {
          postId,
        },
        update(store, response) {
          if (onLike) {
            onLike(postId, store, response.data.likePost);
          }
        },
      });
    },
  }),
})(PostLikeAction);

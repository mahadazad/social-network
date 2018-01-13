// @flow
import * as React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import Post from '../../components/Post/Post';

const postsQuery = gql`
  query PostsQuery($userId: String, $cursor: String) {
    posts(userId: $userId, cursor: $cursor) @connection(key: "posts", filter: ["userId"]) {
      id
      content
      type
      likesCount
      hasLiked
      createdAt
      user {
        id
        firstName
        lastName
        email
      }
      comments {
        id
        comment
        createdAt
        user {
          id
          firstName
          lastName
          avatar
        }
      }
    }
  }
`;

type PostsProps = {
  userId: string,
  loading: boolean,
  posts: Array<Object>,
  loadMore: Function,
};

class Posts extends React.Component<PostsProps> {
  onLike = (postId, store, response) => {
    const { post, data, variables } = this.findFromStore(store, postId);
    post.likesCount = response;
    post.hasLiked = true;
    store.writeQuery({ query: postsQuery, data, variables });
  };

  updateComments = (postId, store, response) => {
    const { post, data, variables } = this.findFromStore(store, postId);
    post.comments.push({
      ...response.comment,
      user: response.user,
    });
    store.writeQuery({ query: postsQuery, data, variables });
  };

  findFromStore(store, postId) {
    const variables = { userId: this.props.userId };
    const data = store.readQuery({ query: postsQuery, variables });
    const post = data.posts.find(p => p.id === postId);
    return { post, data, variables };
  }

  render() {
    if (this.props.loading) {
      return null;
    }

    return (
      <div>
        {this.props.posts.map(post => (
          <Post
            key={post.id}
            user={post.user}
            postId={post.id}
            content={post.content}
            type={post.type}
            comments={post.comments}
            hasLiked={post.hasLiked}
            likesCount={post.likesCount}
            createdAt={post.createdAt}
            updateComments={this.updateComments}
            onLike={this.onLike}
          />
        ))}
        <button key="load-more" onClick={this.props.loadMore}>
          Load More
        </button>
      </div>
    );
  }
}

export default graphql(postsQuery, {
  props: ({ ownProps, data: { loading, posts, fetchMore } }) => {
    const { userId } = ownProps;

    return {
      loading,
      posts,
      variables: {
        userId,
      },
      loadMore: () => {
        const lastPost = posts && posts[posts.length - 1];

        fetchMore({
          variables: {
            cursor: lastPost && lastPost.id,
            userId,
          },
          updateQuery: (previousResult, { fetchMoreResult }) => ({
            ...previousResult,
            posts: [...previousResult.posts, ...fetchMoreResult.posts],
          }),
        });
      },
    };
  },
})(Posts);

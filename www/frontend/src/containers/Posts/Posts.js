import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import Post from '../../components/Post/Post';

class Posts extends React.Component {
  render() {
    if (this.props.loading) {
      return null;
    }

    return (
      <div>
        {this.props.posts.map(post =>
          <Post key={post.id}
                user={post.user}
                content={post.content}
                type={post.type}
                comments={post.comments}
                createdAt={post.createdAt}
          />
        )}
        <button key="load-more" onClick={this.props.loadMore}>Load More</button>
      </div>
    );
  }
}

const PostsQuery = gql`
    query PostsQuery($userId: String, $cursor: String) {
        posts(userId: $userId, cursor: $cursor) {
            id
            content
            type
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

export default graphql(PostsQuery, {
  props: ({ ownProps, data: { loading, posts, fetchMore } }) => {
    const userId = ownProps.userId;

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
          updateQuery: (previousResult, { fetchMoreResult }) => {
            return {
              ...previousResult,
              posts: [...previousResult.posts, ...fetchMoreResult.posts],
            };
          },
        });
      }
    };
  },
})(Posts);

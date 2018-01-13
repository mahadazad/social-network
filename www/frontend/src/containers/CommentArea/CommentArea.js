// @flow
import * as React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import './CommentArea.css';

import MessageArea from '../../components/MessageArea/MessageArea';

type CommentAreaProps = {
  postId: string,
  update: Function,
  onEditorCreate: Function,
};

class CommentArea extends React.PureComponent<CommentAreaProps> {
  static defaultProps = {
    update: null,
    onEditorCreate: null,
  };

  onCreate = messageArea => {
    this.messageArea = messageArea;

    if (this.props.onEditorCreate) {
      this.props.onEditorCreate(messageArea.editor);
    }
  };

  onEnter = comment => {
    this.messageArea.editor.setText('');
    this.props.sendComment(this.props.postId, comment);
  };

  messageArea = null;

  render() {
    return (
      <MessageArea
        className="CommentArea"
        placeholder="Type your comment..."
        onEnter={this.onEnter}
        onCreate={this.onCreate}
      />
    );
  }
}

const commentMutation = gql`
  mutation SendComment($postId: String!, $comment: String!) {
    sendComment(postId: $postId, comment: $comment) {
      comment {
        id
        comment
        createdAt
      }
      user {
        id
        firstName
        lastName
        avatar
      }
    }
  }
`;

export default graphql(commentMutation, {
  name: 'sendComment',
  props: ({ ownProps, sendComment }) => ({
    sendComment: async (postId, comment) => {
      const response = await sendComment({
        variables: {
          postId,
          comment,
        },
        update: (store, { data }) => {
          if (ownProps.update) {
            ownProps.update(postId, store, data.sendComment);
          }
        },
      });

      return response.data.sendComment;
    },
  }),
})(CommentArea);

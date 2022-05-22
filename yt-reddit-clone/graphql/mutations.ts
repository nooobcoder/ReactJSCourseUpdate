import { gql } from "@apollo/client";

const ADD_POST = gql`
  mutation AddPost(
    $body: String!
    $image: String!
    $title: String!
    $username: String!
    $subreddit_id: ID!
  ) {
    insertPost(
      body: $body
      image: $image
      title: $title
      username: $username
      subreddit_id: $subreddit_id
    ) {
      id
      body
      image
      title
      username
      subreddit_id
    }
  }
`;

const ADD_SUBREDDIT = gql`
  mutation AddSubreddit($topic: String!) {
    insertSubreddit(topic: $topic) {
      id
      topic
      created_at
    }
  }
`;

const ADD_COMMENT = gql`
  mutation AddComment($post_id: ID!, $username: String!, $text: String!) {
    insertComment(post_id: $post_id, username: $username, text: $text) {
      id
      post_id
      username
      text
    }
  }
`;

export { ADD_COMMENT, ADD_SUBREDDIT, ADD_POST };

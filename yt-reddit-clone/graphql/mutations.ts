import { gql } from '@apollo/client'

export const ADD_POST = gql`
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
`

export const ADD_SUBREDDIT = gql`
  mutation AddSubreddit($topic: String!) {
    insertSubreddit(topic: $topic) {
      id
      topic
      created_at
    }
  }
`

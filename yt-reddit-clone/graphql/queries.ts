import { gql } from "@apollo/client";

const GET_SUBREDDIT_BY_TOPIC = gql`
  query GetSubredditQuery($topic: String!) {
    getSubredditListByTopic(topic: $topic) {
      id
      topic
      created_at
    }
  }
`;

const GET_ALL_POSTS = gql`
  query GetAllPosts {
    getPostList {
      body
      created_at
      id
      image
      title
      subreddit_id
      username
      comments {
        created_at
        id
        post_id
        text
        username
      }
      subreddit {
        created_at
        id
        topic
      }
      votes {
        created_at
        id
        post_id
        upvote
        username
      }
    }
  }
`;

const GET_ALL_POSTS_BY_TOPIC = gql`
  query GetAllPostsByTopic($topic: String!) {
    getPostListByTopic(topic: $topic) {
      body
      created_at
      id
      image
      title
      subreddit_id
      username
      comments {
        created_at
        id
        post_id
        text
        username
      }
      subreddit {
        created_at
        id
        topic
      }
      votes {
        created_at
        id
        post_id
        upvote
        username
      }
    }
  }
`;

const GET_POST_BY_POST_ID = gql`
  query GetPostByPostId($post_id: ID!) {
    getPostListByPostId(post_id: $post_id) {
      body
      created_at
      id
      image
      title
      subreddit_id
      username
      comments {
        created_at
        id
        post_id
        text
        username
      }
      subreddit {
        created_at
        id
        topic
      }
      votes {
        created_at
        id
        post_id
        upvote
        username
      }
    }
  }
`;

const GET_VOTES_BY_POST_ID = gql`
  query GetVotesByPostId($post_id: ID!) {
    getVotesByPostId(post_id: $post_id) {
      created_at
      id
      post_id
      upvote
      username
    }
  }
`;

const GET_SUBREDDITS_WITH_LIMIT = gql`
  query GetSubredditsWithLimit($limit: Int!) {
    getSubredditListWithLimit(limit: $limit) {
      id
      topic
      created_at
    }
  }
`;

export {
  GET_SUBREDDIT_BY_TOPIC,
  GET_ALL_POSTS,
  GET_ALL_POSTS_BY_TOPIC,
  GET_POST_BY_POST_ID,
  GET_VOTES_BY_POST_ID,
  GET_SUBREDDITS_WITH_LIMIT,
};

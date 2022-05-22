import { useQuery } from '@apollo/client'
import { GET_ALL_POSTS } from '../graphql/queries'
import Post from './Post'

function Feed() {
  const { data, error } = useQuery(GET_ALL_POSTS)
  console.log(data)
  const posts: Post[] = data?.getPostList

  return (
    <div className="mt-5 space-y-4">
      {posts?.map((p) => (
        <Post key={p.id} post={p} />
      ))}
    </div>
  )
}

export default Feed

import { useSession } from 'next-auth/react'
import Avatar from './Avatar'
import { LinkIcon, PhotographIcon } from '@heroicons/react/outline'

function Postbox() {
  const { data: session } = useSession()

  return (
    <form className="sticky top-16 z-50 rounded-md border border-gray-300 bg-white p-2">
      <div className="flex items-center space-x-3">
        <Avatar />
        <input
          type="text"
          className={`flex-1 bg-gray-50 p-2 pl-5 outline-none`}
          placeholder={
            session ? `Create a post by entering a title!` : `Sign in to post!`
          }
        />
        <PhotographIcon className={`h-6 cursor-pointer text-gray-300`} />
        <LinkIcon className={`h-6 text-gray-300`} />
      </div>
    </form>
  )
}

export default Postbox

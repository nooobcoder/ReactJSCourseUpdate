import React from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

type Props = {
  seed?: string
  large?: boolean
}

function Avatar({ seed, large }: Props) {
  const { data: session } = useSession()

  return (
    <div
      className={`relative h-10 w-10 overflow-hidden rounded-full border-gray-300 bg-white shadow-md 
      ${large && 'h-20 w-20'}`}
    >
      <Image
        src={`https://avatars.dicebear.com/api/miniavs/${
          seed || session?.user?.email || 'placeholder'
        }.svg`}
        alt="avatar"
        layout="fill"
      />
    </div>
  )
}

export default Avatar

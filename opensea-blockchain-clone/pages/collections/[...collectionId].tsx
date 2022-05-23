import Link from 'next/link'
import { useRouter } from 'next/router'

function Collection() {
  const router = useRouter()
  const { collectionId } = router.query

  return (
    <Link href="/">
      <h2>{collectionId}</h2>
    </Link>
  )
}

export default Collection

import { useRouter } from 'next/router'

function dynamic() {
  const router = useRouter()
  const { dynamic } = router.query

  return <p>Ini Page: {dynamic}</p>
}

export default dynamic
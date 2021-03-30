import { useRouter } from 'next/router'

function dynamic() {
  const router = useRouter()
  const { pid } = router.query
  console.log(pid)

  return <p>Ini Page: {pid}</p>
}

export default dynamic
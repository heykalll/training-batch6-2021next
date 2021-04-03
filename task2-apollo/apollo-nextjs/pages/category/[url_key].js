import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'


function CategoryDetail({characters}) {
  const router = useRouter()
  const { url_key } = router.query
  return <div> 
      <p>ini category {url_key}</p>
  </div>
}

export default CategoryDetail
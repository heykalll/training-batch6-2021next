import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <div >
      <Head>
        <title>Create Next Apps</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <title>
          <div className='title'>
            Welcome
          </div>
          <h1>
          <Link href="/about">Go to About</Link>
          </h1>
        </title>

    </div>
  )
}

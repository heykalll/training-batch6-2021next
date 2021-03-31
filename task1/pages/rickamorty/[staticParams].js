import Link from 'next/link'

function StaticPage(props) {
  return (
    <div>
      <h1>
        <Link href="/">Back To Home</Link>
      </h1>
      <div>Ini di page : { props.staticParams }</div>
    </div>
  ) 
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { staticParams: 'name' } }, 
      { params: { staticParams: 'status' } 
    }],
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const { staticParams } = params
  return {
    props: { staticParams }
  }
}

export default StaticPage
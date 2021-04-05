import { gql, useQuery } from "@apollo/client";
import { withApollo } from "../lib/apollo/apolloClient";
import Link from 'next/link'

const GET_CATEGORY = gql`
  query getProduct{
    categories(filters: {
      name: {
        match: "Default Category"
      }
    }){
      items{
        id
        name
        description
        children{
          id
          name
          description
          url_key
          include_in_menu
        }
      }
      total_count
    }
  }
`;

 const Home = () => {
  const { loading, error, data } = useQuery(GET_CATEGORY, {
    variables: { $filters: "" },
    useGETForQueries: true,
  });
  // console.log(data);
  if (loading) {
    return <p>loading</p>;
  }
  if (error) {
    return <p>error</p>;
  }
  return (
    <div> 
      {
        data.categories.items[0].children.map((category) => {
          if (category.include_in_menu === 1) {
            return (
              <div key={ category.url_key }>
                <h1>
                  <Link href={{
                    pathname: '/category/[slug]',
                    query: { slug: category.url_key},
                  }}>
                    {category.name}
                  </Link>
                </h1>
              </div>
            ) 
          }
        })
      }
    </div>
  )
}

export default withApollo({ ssr: true })(Home);

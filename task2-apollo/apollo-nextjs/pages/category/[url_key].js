import React from 'react'
import { withApollo } from "../../lib/apollo/apolloClient";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from 'next/router'
import Link from 'next/link'

const GET_CATEGORYDETAIL = gql`
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
          products(sort: {
            name: ASC
          }){
            items{
              url_key
              name
              image {
                url
              }
              price_range{
                minimum_price{
                  regular_price{
                    currency
                    value
                  }
                }
              }
            }
          }
          url_key
          include_in_menu
        }
      }
      total_count
    }
  }
`;

function CategoryDetail({characters}) {
  const router = useRouter()
  const { url_key } = router.query
  const { loading, error, data } = useQuery(GET_CATEGORYDETAIL, {
    variables: { $filters: "" },
    useGETForQueries: true,
  });

  console.log(data)

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
          if (category.url_key === url_key) {
            return (
              <div key={category.url_key}>
                <p>ini category: {category.name}</p>
                <p>Description: {category.description}</p>
                <p>Image: {category.image}</p>
                {
                  category.products.items.map(product => {
                    return (
                      <h1>
                        <Link href={{
                          pathname: '/category/[slug]',
                          query: { slug: [category.url_key]}
                        }}>
                          {product.name}
                        </Link>
                      </h1>
                    )
                  })
                }
              </div>
            ) 
          }
        })
      }
  </div>
  )
}

// CategoryDetail.getInitialProps = async (ctx) => {
//   // console.log(ctx.query.url_key)
//   console.log(ctx.res)

//   return { characters: 'koko' }
// }


export default withApollo({ ssr: true })(CategoryDetail);
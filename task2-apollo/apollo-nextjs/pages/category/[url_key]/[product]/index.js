import React from 'react'
import { withApollo } from "../../../../lib/apollo/apolloClient";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from 'next/router'
import Link from 'next/link'

const GET_PRODUCTDETAIL = gql`
  query getProduct($eq: String!){
    products(filter: {
      url_key: {
        eq: $eq
      }
    })
    {
      items{
        name
        image {
          url
        }
        description{
          html
        }
        price_range{
          maximum_price{
            regular_price {
              currency
              value
            }
          }
        }
      }
    }
  }
`;

function ProductDetail({characters}) {
  const router = useRouter()
  const { product } = router.query
  const { loading, error, data } = useQuery(GET_PRODUCTDETAIL, {
    variables: { eq: product },
    useGETForQueries: true,
  });

  let productData

  if (data) {
    productData = {
      name: data.products.items[0].name,
      image: data.products.items[0].image.url,
      currency: data.products.items[0].price_range.maximum_price.regular_price.currency,
      price: data.products.items[0].price_range.maximum_price.regular_price.value,
      description: data.products.items[0].description.html
    }
  }
  
  console.log(productData)

  if (loading) {
    return <p>loading</p>;
  }
  if (error) {
    return <p>error</p>;
  }
  return (
    <div> 
      <p>{productData.name}</p>
      <p>{productData.image}</p>
      <p>{productData.currency} {Math.round(productData.price * 14000).toLocaleString()}</p>
      <p dangerouslySetInnerHTML={{__html: productData.description}}></p>
      {/* {
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
                          pathname: '/category/[...detail]/[...product]',
                          query: { detail: [category.url_key], product:[product.url_key]}
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
      } */}
      Test Di Product: {product}
  </div>
  )
}

// CategoryDetail.getInitialProps = async (ctx) => {
//   // console.log(ctx.query.url_key)
//   console.log(ctx.res)
//   return { characters: 'koko' }
// }


export default withApollo({ ssr: true })(ProductDetail);
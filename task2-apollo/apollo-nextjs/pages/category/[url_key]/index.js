import React from 'react'
import { withApollo } from "../../../lib/apollo/apolloClient";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Typography, AppBar, Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Container } from '@material-ui/core'
import StorefrontIcon from '@material-ui/icons/Storefront'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.error.light,
    padding: theme.spacing(3, 0, 6)
  },
  cardGrid: {
    padding: '20px 0'
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardMedia: {
    paddingTop: '100%'
  },
  CardContent: {
    padding: '5px 10px',
    margin: '2px'
  }
}))

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
  const classes = useStyles()
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
    <>
      <CssBaseline/>
        <AppBar position='relative'>
          <Toolbar>
            <StorefrontIcon/>
              {
                data.categories.items[0].children.map((category) => {
                  if (category.include_in_menu === 1) {
                    return (
                      <div key={ category.url_key }>
                        <Typography variant='h6' align='center' gutterBottom>
                          <Button color='default'>
                            <Link href={{
                              pathname: '/category/[slug]',
                              query: { slug: category.url_key},
                            }}>
                              {category.name}
                            </Link>
                          </Button>           
                        </Typography>
                      </div>
                    ) 
                  }
                })
              }
          </Toolbar>
        </AppBar>
      <main>
        <div className={classes.container}>
          <Container maxWidth='md' style={{ marginTop: '5px' }}>
            <Typography variant='h2' align='center' color='textPrimary' gutterBottom>
              Welcome to the Store
            </Typography>
            <Typography variant='h5' align='center' color='textSecondary' gutterBottom>
              This is the all list of {url_key} products.
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth='md'>
          <Grid container spacing={3}>
            {
              data.categories.items[0].children.map((category) => {
                if (category.url_key === url_key) {
                  return category.products.items.map(product => {
                    return (
                      <Grid item key={product.url_key}>
                        <Card className={classes.card}>
                          <CardMedia
                            className={classes.cardMedia}
                            image={product.image.url}
                            title='Image title'
                          />
                          <CardContent className={classes.CardContent}>
                            <Typography variant='subtitle2'>
                            {product.name}
                            </Typography>
                          </CardContent>
                          <CardContent className={classes.CardContent}>
                            <Typography>
                            {product.price_range.minimum_price.regular_price.currency} {Math.round(product.price_range.minimum_price.regular_price.value * 14000).toLocaleString()}
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <Button size='small' color='primary'>
                              <Link href={{
                                pathname: '/category/[slug]/[product]',
                                query: { 
                                  slug: [category.url_key],
                                  product: [product.url_key]
                                }
                              }}>
                                View Product
                              </Link>
                            </Button>
                            <Button size='small' color='primary'>Buy Now</Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    )
                  }) 
                }
              })
            }
          </Grid>
        </Container>
      </main>
    </>
  )
}

// CategoryDetail.getInitialProps = async (ctx) => {
//   // console.log(ctx.query.url_key)
//   console.log(ctx.res)

//   return { characters: 'koko' }
// }


export default withApollo({ ssr: true })(CategoryDetail);
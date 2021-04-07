import React from 'react'
import { withApollo } from "../../../../lib/apollo/apolloClient";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Typography, AppBar, Paper, ButtonBase, Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Container } from '@material-ui/core'
import StorefrontIcon from '@material-ui/icons/Storefront'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.error.light,
    padding: theme.spacing(0, 0, 0)
  },
  cardGrid: {
    padding: '20px 0'
  },
  card: {
    height: '100%',
    display: 'flex',
  },
  cardMedia: {
    paddingTop: '100%'
  },
  CardContent: {
    padding: '5px 10px',
    margin: '2px'
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 600,
  },
  image: {
    width: '50%',
    height: '50%',
  },
  img: {
    margin: 'auto',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}))

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
  const classes = useStyles()
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
  
  // console.log(productData)
  if (loading) {
    return <p>loading</p>;
  }
  if (error) {
    return <p>error</p>;
  }
  return (
    <>
      <CssBaseline/>
      <main>
        <div className={classes.container}>
          <Container maxWidth='m' style={{ marginTop: '5px' }}>
            <Typography variant='h2' align='center' color='textPrimary' gutterBottom>
              Welcome to the Store
            </Typography>
            <Typography variant='h5' align='center' color='textSecondary' gutterBottom>
              This is Product {productData.name} Page
            </Typography>
          </Container>
        </div>
      </main>
      <div className={classes.root}>
        <Grid container>
          <Grid item md={6}>
          <Paper className={classes.paper}>
            <CardMedia>
              <img className={classes.img} alt="complex" src={productData.image}/>
            </CardMedia>
          </Paper>
          </Grid>
          <Grid item md={6}>
            <Paper className={classes.paper}>
            <Typography variant='h4'color='textSecondary' gutterBottom>
              {productData.name}
            </Typography>
            <Typography variant='h5'color='textSecondary' gutterBottom>
              {productData.currency} {Math.round(productData.price * 14000).toLocaleString()}
            </Typography>
            <Typography variant='subtitle1'color='textSecondary' gutterBottom>
              Description: 
              <Typography variant='subtitle1'color='textSecondary' gutterBottom dangerouslySetInnerHTML={{__html: productData.description}}/>
            </Typography>
            <Button size='medium' variant="outlined" color="secondary">Add To Cart</Button>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </>
  )
}

// CategoryDetail.getInitialProps = async (ctx) => {
//   // console.log(ctx.query.url_key)
//   console.log(ctx.res)
//   return { characters: 'koko' }
// }


export default withApollo({ ssr: true })(ProductDetail);
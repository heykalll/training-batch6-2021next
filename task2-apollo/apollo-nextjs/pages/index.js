import { gql, useQuery } from "@apollo/client";
import { withApollo } from "../lib/apollo/apolloClient";
import Link from 'next/link'
import { Typography, AppBar, Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Container } from '@material-ui/core'
import StorefrontIcon from '@material-ui/icons/Storefront'

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
                        <Typography variant='h6' align='center' color='white' gutterBottom>
                          <Button color='white'>
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
        <div>
          <Container maxWidth='m'>
            <Typography variant='h2' align='center' color='textPrimary' gutterBottom>
              Welcome to the Store
            </Typography>
            <Typography variant='h5' align='center' color='textSecondary' gutterBottom>
              This is the all list of most demand Product 
            </Typography>
          </Container>
        </div>
      </main>
    </>
  )
}

export default withApollo({ ssr: true })(Home);

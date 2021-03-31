import { gql, useQuery } from "@apollo/client";
import { withApollo } from "../lib/apollo/apolloClient";
const GET_CATEGORY = gql`
  query getProduct{
    categories(filters: {
      url_key: {
      }
    }) {
      __typename
      items{
        name
        image
      }
    }
  }
`;

 const Home = () => {
  const { loading, error, data } = useQuery(GET_CATEGORY, {
    variables: { $filters: "" },
    useGETForQueries: true,
  });
  console.log(data);
  if (loading) {
    return <p>loading</p>;
  }
  if (error) {
    return <p>error</p>;
  }
  return <p>ini page apollo client example</p>;

}

export default withApollo({ ssr: true })(Home);
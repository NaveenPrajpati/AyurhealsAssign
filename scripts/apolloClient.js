import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export const GET_COLLECTIONS_QUERY = gql`
  {
    collections(first: 2) {
      edges {
        node {
          title
          description
          products(first: 2) {
            edges {
              node {
                title
                description
                images(first: 1) {
                  edges {
                    node {
                      url
                    }
                  }
                }
                variants(first: 1) {
                  edges {
                    node {
                      price {
                        amount
                        currencyCode
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const client = new ApolloClient({
  uri: "https://mock.shop/api",
  cache: new InMemoryCache(),
});

export default client;

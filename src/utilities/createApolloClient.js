import { ApolloClient, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createHttpLink } from "apollo-link-http";
import Cookies from "universal-cookie";

const createApolloClient = (window = null) => {
  let uri = `${process.env.REACT_APP_API_URL}graphql`;

  if (window) {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    uri = `${uri}?code=${code}`;
  }

  const httpLink = createHttpLink({
    uri,
    credentials: "include",
    fetchOptions: {
      credentials: "include",
    },
  });

  const authLink = setContext((_, { headers }) => {
    const cookies = new Cookies();
    const XSRF_TOKEN = cookies.get("XSRF-TOKEN");
    return {
      headers: {
        ...headers,
        "X-XSRF-TOKEN": XSRF_TOKEN,
      },
    };
  });

  const cache = new InMemoryCache({});
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
  });

  return client;
};

export default createApolloClient;

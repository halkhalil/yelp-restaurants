import React from "react";
import ReactDOM from "react-dom";
import { setContext } from "@apollo/link-context";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  gql,
  InMemoryCache,
} from "@apollo/client";
import { BaseProvider, LightTheme } from "baseui";
import { Provider as StyletronProvider } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";
import Pages from "./pages";
import injectStyles from "./styles";

const engine = new Styletron();
const token =
  "wmoCtDJTRBjZDwCTOZxydQB1DqjOu376YqZrexKNCk7YHRqrYhBeXR5JijCZO0taOkeIiBobIfs1aEKDsVRCY0efY0U_Wn_aai2FAHOHHJzpePwNYsK4mk6s_-WVXnYx";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
      "Accept-Language": "en-US",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// client
//   .query({
//     query: gql`
//       {
//         business(id: "garaje-san-francisco") {
//           name
//           id
//           alias
//           rating
//           url
//         }
//       }
//     `,
//   })
//   .then((result) => console.log(result));

const App: React.FC = () => (
  <ApolloProvider client={client}>
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <Pages />
      </BaseProvider>
    </StyletronProvider>
  </ApolloProvider>
);

injectStyles();
ReactDOM.render(<App />, document.getElementById("root"));
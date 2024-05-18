import client from "@/scripts/apolloClient";
import { ApolloProvider } from "@apollo/client";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <ApolloProvider client={client}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen name="index" options={{ headerTitle: "Home" }} />
        <Stack.Screen name="product" />
      </Stack>
    </ApolloProvider>
  );
}

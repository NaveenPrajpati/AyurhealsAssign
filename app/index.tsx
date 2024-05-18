// app/HomePage.js
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useQuery } from "@apollo/client";
import { Link } from "expo-router";
import { GET_COLLECTIONS_QUERY } from "@/scripts/apolloClient";
import { SafeAreaProvider } from "react-native-safe-area-context";

export interface Product {
  variants: any;
  title: string;
  images: {
    edges: {
      node: {
        url: string | undefined;
        src: string;
      };
    }[];
  };
  price: number;
}

interface Collection {
  title: string;
  description: string;
  products: {
    edges: {
      node: Product;
    }[];
  };
}

const HomePage = () => {
  const { loading, error, data } = useQuery(GET_COLLECTIONS_QUERY);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const collections = data?.collections?.edges;

  const renderProduct = ({ item }: { item: { node: Product } }) => (
    <Link
      href={{
        pathname: "product",
        params: { product: JSON.stringify(item.node) },
      }}
      style={styles.productCard}
    >
      <View>
        <Image
          source={{ uri: item.node.images.edges[0]?.node.url }}
          style={styles.productImage}
        />
        <Text style={{ fontWeight: "500", fontSize: 15 }}>
          {item.node.title}
        </Text>
        <Text>₹ {item.node.variants.edges[0].node.price.amount}</Text>
      </View>
    </Link>
  );

  const renderCollection = ({ item }: { item: { node: Collection } }) => (
    <View style={styles.collection}>
      <Text style={styles.collectionTitle}>{item.node.title}</Text>
      <Text style={styles.collectionDescription}>{item.node.description}</Text>
      <FlatList
        data={item.node.products.edges}
        renderItem={renderProduct}
        keyExtractor={(product) => product.node.title}
        horizontal
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://img.freepik.com/free-photo/black-friday-elements-assortment_23-2149074075.jpg",
        }}
        resizeMode="cover"
        style={styles.heroBanner}
      />
      <FlatList
        data={collections}
        renderItem={renderCollection}
        keyExtractor={(collection) => collection.node.title}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "gold",
  },
  heroBanner: {
    width: "100%",
    height: 150,
    marginBottom: 20,
  },
  collection: {
    marginBottom: 20,
  },
  collectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  collectionDescription: {
    marginBottom: 10,
    fontWeight: "500",
    color: "black",
  },
  productCard: {
    marginRight: 10,
    backgroundColor: "aliceblue",
    padding: 10,
    borderRadius: 5,
  },
  productImage: {
    width: 120,
    height: 120,
  },
});

export default HomePage;

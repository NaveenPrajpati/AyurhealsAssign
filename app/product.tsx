import { useLocalSearchParams } from "expo-router";
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";

interface Product {
  title: string;
  description: string;
  images: {
    edges: {
      node: {
        url: string | undefined;
        src: string;
      };
    }[];
  };
}

interface ProductPageProps {
  route: {
    params: {
      product: Product;
    };
  };
}

const ProductPage = () => {
  const params = useLocalSearchParams();
  // const { product } = params;
  const product: Product = JSON.parse(params.product);

  const handleAddToCart = () => {
    ToastAndroid.show(`${product.title} Added to cart!`, ToastAndroid.SHORT);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{product.title}</Text>
      <Image
        source={{ uri: product.images?.edges[0]?.node.url }}
        style={styles.image}
      />
      <Text style={styles.description}>{product.description}</Text>
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={handleAddToCart}
      >
        <Text style={styles.addToCartText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "gold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 300,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: "black",
    fontWeight: "500",
  },
  addToCartButton: {
    backgroundColor: "#000",
    padding: 12,
    alignItems: "center",
    borderRadius: 15,
  },
  addToCartText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ProductPage;

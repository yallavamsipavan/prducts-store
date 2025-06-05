import { Link } from "react-router-dom";
import { Container, VStack, Text, SimpleGrid } from "@chakra-ui/react";
import { useEffect } from "react";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";

const HomePage = () => {

  const { fetchProducts, products } = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log("products : ", products);

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text fontSize={"30"} fontWeight={"bold"} bgGradient={"linear(to-r, cyan.400, blue.500)"} bgClip={"text"} textAlign={"center"}>Current Products</Text>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3}}
          spacing={10}
          w={"full"}
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product}/>
          ))}
        </SimpleGrid>
        {/* <Text fontSize="xl" textAlign={"center"} fontWeight="bold" color="gray.500">
          No Product found
          <Link to={"/create"}>
            <Text as="span" color="blue.500" _hover={{ textDecoration:"underline" }}>Create a Product</Text>
          </Link>
        </Text> */}
        {products.length === 0 && (
          <Text fontSize="xl" textAlign={"center"} fontWeight="bold" color="gray.500">
            No Product found
            <Link to={"/create"}>
              <Text as="span" color="blue.500" _hover={{ textDecoration:"underline" }}>Create a Product</Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  )
}

export default HomePage;











// import React from 'react';
// import { Box, Heading, Text } from '@chakra-ui/react';

// const HomePage = () => {
//   return (
//     <Box p={6}>
//       <Heading mb={4}>Welcome to the Products Store</Heading>
//       <Text>Browse and manage your products easily.</Text>
//     </Box>
//   );
// };

// export default HomePage;
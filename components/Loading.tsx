import { VStack, Spinner, Text } from "@chakra-ui/react";

const Loading = () => {
  return (
    <VStack spacing={4} flex={1} justify="center" align="center">
      <Spinner size="xl" />
      <Text>Loading...</Text>
    </VStack>
  );
};

export default Loading;

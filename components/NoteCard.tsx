import React from 'react';
import { Box, Heading, Text, Flex } from '@chakra-ui/react';
import { formatDate } from '@/lib/utils';

interface NoteCardProps {
  title: string;
  body: string;
  createdAt: string;
}

const NoteCard: React.FC<NoteCardProps> = ({ title, body, createdAt }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      boxShadow="sm"
      bg="white"
      transition="all 0.3s ease"
      _hover={{
        boxShadow: 'lg',
        bg: 'gray.50',
        transform: 'scale(1.01)',
        cursor: 'pointer',
      }}
    >
      <Flex direction="column" h="100%">
        <Flex direction="column" flex="1">
          <Heading as="h3" size="md">
            {title}
          </Heading>
          <Text mt={2} noOfLines={3}>
            {body}
          </Text>
        </Flex>
        <Text fontSize="sm" color="gray.500" mt={4}>
          {formatDate(createdAt)}
        </Text>
      </Flex>
    </Box>
  );
};

export default NoteCard;

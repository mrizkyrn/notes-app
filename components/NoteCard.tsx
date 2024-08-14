import React from 'react';
import Link from 'next/link';
import { Box, Heading, Text, Flex, IconButton } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { formatDate } from '@/lib/utils';

interface NoteCardProps {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ id, title, body, createdAt, onEdit, onDelete }) => {
  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(id);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(id);
  };
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
      <Flex direction="column" justify="space-between" h="100%">
        <Link href={`/notes/${id}`} passHref>
          <Heading as="h3" size="md">
            {title}
          </Heading>
          <Text mt={2} noOfLines={2}>
            {body}
          </Text>
        </Link>

        <Flex align="center" justify="space-between" mt={4}>
          <Text fontSize="sm" color="gray.500">
            {formatDate(createdAt)}
          </Text>
          <Flex>
            <IconButton
              aria-label="Edit Note"
              icon={<EditIcon />}
              size="xs"
              variant="outline"
              colorScheme="blue"
              onClick={handleEditClick}
              mr={2}
            />
            <IconButton
              aria-label="Delete Note"
              icon={<DeleteIcon />}
              size="xs"
              variant="outline"
              colorScheme="red"
              onClick={handleDeleteClick}
            />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default NoteCard;

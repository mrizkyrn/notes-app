import React from 'react';
import { useRouter } from 'next/navigation';
import { Box, Heading, Text, Flex } from '@chakra-ui/react';
import { formatDate } from '@/lib/utils';
import { DeleteButton, EditButton } from './Buttons';

interface NoteCardProps {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ id, title, body, createdAt, onEdit, onDelete }) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/notes/${id}`);
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
      onClick={handleCardClick}
    >
      <Flex direction="column" justify="space-between" h="100%">
        <Flex direction="column" h="100%" gap={2} pb={4}>
          <Heading as="h2" size="md">
            {title}
          </Heading>
          <Text noOfLines={2}>{body}</Text>
        </Flex>

        <Flex align="center" justify="space-between">
          <Text fontSize="sm" color="gray.500">
            {formatDate(createdAt)}
          </Text>
          <Flex>
            <EditButton
              onClick={(e) => {
                e.stopPropagation();
                onEdit(id);
              }}
              mr={2}
            />
            <DeleteButton
              onClick={(e) => {
                e.stopPropagation();
                onDelete(id);
              }}
            />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default NoteCard;

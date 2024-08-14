'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { Container, Heading, Text, HStack, Box, Stack } from '@chakra-ui/react';
import { GET_NOTE_QUERY } from '@/graphql/queries';
import { Note } from '@/type';
import { formatDate } from '@/lib/utils';
import { BackButton } from '@/components/Buttons';
import Loading from '@/components/Loading';

interface NoteData {
  note: Note;
}

interface NoteVars {
  id: string;
}

interface NoteDetailProps {
  params: {
    id: string;
  };
}

const NoteDetail: React.FC<NoteDetailProps> = ({ params }) => {
  const router = useRouter();
  const noteId = params.id;

  const { data, loading, error } = useQuery<NoteData, NoteVars>(GET_NOTE_QUERY, {
    variables: { id: noteId },
    skip: !noteId,
  });

  if (error) return <Text color="red.500">Error: {error.message}</Text>;

  return (
    <Container maxW="container.md" minH="100vh" py={10} centerContent>
      <HStack spacing={3} mb={10} w="100%">
        <BackButton onClick={() => router.back()} />
        <Heading as="h1" size="lg" textAlign="center">
          Detail Catatan
        </Heading>
      </HStack>

      {loading ? (
        <Loading />
      ) : data?.note ? (
        <Box borderWidth={1} borderRadius="lg" p={6} bg="white" w="100%">
          <Stack spacing={2}>
            <Heading as="h1" size="lg">
              {data.note.title}
            </Heading>
            <Text fontSize="md" color="gray.600">
              dibuat pada {formatDate(data.note.createdAt)}
            </Text>
            <Text fontSize="lg" mt={4}>
              {data.note.body}
            </Text>
          </Stack>
        </Box>
      ) : (
        <Text fontSize="lg" color="gray.500">
          Catatan tidak ditemukan
        </Text>
      )}
    </Container>
  );
};

export default NoteDetail;

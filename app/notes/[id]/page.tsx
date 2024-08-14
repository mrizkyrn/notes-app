'use client';

import { useQuery } from '@apollo/client';
import { Container, Heading, Text, Box, Stack } from '@chakra-ui/react';
import { GET_NOTE_QUERY } from '@/graphql/queries';
import { Note } from '@/type';
import { formatDate } from '@/lib/utils';
import Loading from '@/components/Loading';
import BackHeading from '@/components/BackHeading';

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
  const noteId = params.id;

  const { data, loading, error } = useQuery<NoteData, NoteVars>(GET_NOTE_QUERY, {
    variables: { id: noteId },
    skip: !noteId,
  });

  if (error) return <Text color="red.500">Error: {error.message}</Text>;

  return (
    <Container maxW="container.md" minH="100vh" py={10} centerContent>
      <BackHeading title="Detail Catatan" />

      {loading ? (
        <Loading />
      ) : data?.note ? (
        <Box borderWidth={1} borderRadius="lg" p={6} bg="white" w="100%">
          <Stack spacing={2}>
            <Heading as="h1" size={{ base: 'md', md: 'lg' }}>
              {data.note.title}
            </Heading>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.800">
              {data.note.body}
            </Text>
            <Text fontSize={{ base: 'sm', md: 'md' }} color="gray.600" mt={4}>
              dibuat pada {formatDate(data.note.createdAt)}
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

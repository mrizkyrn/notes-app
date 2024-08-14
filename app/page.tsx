'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { Container, Heading, SimpleGrid, Text, Flex, Spinner } from '@chakra-ui/react';
import { GET_NOTES_QUERY } from '@/graphql/queries';
import { Note } from '@/type';
import { AddButton } from '@/components/Buttons';
import NoteCard from '@components/NoteCard';
import Loading from '@/components/Loading';


export default function Home() {
  const { data, loading, error } = useQuery<{ notes: Note[] }>(GET_NOTES_QUERY);
  const router = useRouter();

  if (error) return <Text color="red.500">Terjadi kesalahan: {error.message}</Text>;

  return (
    <Container maxW="container.md" minH="100vh" py={10} centerContent>
      <Flex justify="space-between" w="100%" mb="10">
        <Heading as="h1" size="lg">
          Daftar Catatan
        </Heading>
        <AddButton onClick={() => router.push('/create-note')} />
      </Flex>

      {loading ? (
        <Loading />
      ) : data?.notes.length ?? 0 > 0 ? (
        <SimpleGrid columns={[1, 2, 2]} spacing={5} w="100%">
          {data!.notes.map((note) => (
            <NoteCard key={note.id} id={note.id} title={note.title} body={note.body} createdAt={note.createdAt} />
          ))}
        </SimpleGrid>
      ) : (
        <Text fontSize={{ base: 'sm', md: 'md' }} color="gray.500" mt={35}>
          Tidak ada catatan
        </Text>
      )}
    </Container>
  );
}

'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { Container, Heading, SimpleGrid, Text, Flex, Spinner } from '@chakra-ui/react';
import { Note } from '@/type';
import { AddButton } from '@/components/Buttons';
import NoteCard from '@components/NoteCard';

import { GET_NOTES_QUERY } from '@/graphql/queries';

export default function Home() {
  const { data, loading, error } = useQuery<{ notes: Note[] }>(GET_NOTES_QUERY);
  const router = useRouter();

  if (loading) {
    return (
      <Flex align="center" justify="center" h="100vh" w="100vw" direction="column">
        <Spinner size="xl" />
        <Text mt={4}>Loading...</Text>
      </Flex>
    );
  }
  if (error) return <Text color="red.500">Terjadi kesalahan: {error.message}</Text>;

  return (
    <Container maxW="container.md" py={10} px={25} centerContent>
      <Flex justify="space-between" w="100%" mb="10">
        <Heading as="h1" size="lg">
          Daftar Catatan
        </Heading>
        <AddButton onClick={() => router.push('/create-note')} />
      </Flex>

      {data?.notes.length ?? 0 > 0 ? (
        <SimpleGrid columns={[1, 2, 2]} spacing={5} w="100%">
          {data!.notes.map((note) => (
            <NoteCard key={note.id} title={note.title} body={note.body} createdAt={note.createdAt} />
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

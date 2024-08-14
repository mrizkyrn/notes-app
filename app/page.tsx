'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation } from '@apollo/client';
import { Container, Heading, SimpleGrid, Text, Flex, useToast } from '@chakra-ui/react';
import { GET_NOTES_QUERY } from '@/graphql/queries';
import { DELETE_NOTE_MUTATION } from '@/graphql/mutations';
import { Note } from '@/type';
import { AddButton } from '@/components/Buttons';
import NoteCard from '@/components/NoteCard';
import Loading from '@/components/Loading';
import DialogAlert from '@/components/DialogAlert';

export default function Home() {
  const { data, loading, error } = useQuery<{ notes: Note[] }>(GET_NOTES_QUERY);
  const [deleteNote] = useMutation(DELETE_NOTE_MUTATION);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const router = useRouter();
  const toast = useToast();

  if (error) return <Text color="red.500">Terjadi kesalahan: {error.message}</Text>;

  const handleEdit = (id: string) => {
    router.push(`/notes/edit?id=${id}`);
  };

  const handleDelete = async () => {
    if (selectedNoteId) {
      try {
        await deleteNote({
          variables: { id: selectedNoteId },
          update(cache) {
            cache.modify({
              fields: {
                notes(existingNotes = [], { readField }) {
                  return existingNotes.filter((noteRef: any) => selectedNoteId !== readField('id', noteRef));
                },
              },
            });
          },
        });

        toast({
          title: 'Catatan berhasil dihapus.',
          description: `Catatan dengan id ${selectedNoteId} berhasil dihapus.`,
          status: 'success',
          position: 'top-right',
        });
      } catch (error: any) {
        toast({
          title: 'Gagal menghapus catatan.',
          description: error.message,
          status: 'error',
          position: 'top-right',
        });
      } finally {
        setSelectedNoteId(null);
        setIsDialogOpen(false);
      }
    }
  };

  return (
    <Container maxW="container.md" minH="100vh" py={10} centerContent>
      <Flex justify="space-between" w="100%" mb="10">
        <Heading as="h1" size="lg">
          Daftar Catatan
        </Heading>
        <AddButton onClick={() => router.push('/notes/create')} />
      </Flex>

      {loading ? (
        <Loading />
      ) : data?.notes.length ?? 0 > 0 ? (
        <SimpleGrid columns={[1, 2, 2]} spacing={5} w="100%">
          {data!.notes.map((note) => (
            <NoteCard
              key={note.id}
              id={note.id}
              title={note.title}
              body={note.body}
              createdAt={note.createdAt}
              onEdit={handleEdit}
              onDelete={() => {
                setSelectedNoteId(note.id);
                setIsDialogOpen(true);
              }}
            />
          ))}
        </SimpleGrid>
      ) : (
        <Text fontSize={{ base: 'sm', md: 'md' }} color="gray.500" mt={35}>
          Tidak ada catatan
        </Text>
      )}

      <DialogAlert
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleDelete}
        title="Hapus Catatan"
        message="Apakah Anda yakin ingin menghapus catatan ini? Tindakan ini tidak dapat dikembalikan."
      />
    </Container>
  );
}

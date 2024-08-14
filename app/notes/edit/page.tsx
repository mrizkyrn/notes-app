'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast, Text } from '@chakra-ui/react';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_NOTE_MUTATION } from '@/graphql/mutations';
import { GET_NOTE_QUERY } from '@/graphql/queries';
import NoteForm from '@/components/NoteForm';
import Loading from '@/components/Loading';

const EditNotePage = () => {
  const router = useRouter();
  const toast = useToast();
  const searchParams = useSearchParams();
  const noteId = searchParams.get('id');

  const { data, loading, error } = useQuery(GET_NOTE_QUERY, {
    variables: { id: noteId },
    skip: !noteId,
  });

  const [submitting, setSubmitting] = useState(false);
  const [note, setNote] = useState({
    title: '',
    body: '',
  });

  const [updateNote] = useMutation(UPDATE_NOTE_MUTATION);

  useEffect(() => {
    if (data && data.note) {
      setNote({
        title: data.note.title,
        body: data.note.body,
      });
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await updateNote({
        variables: {
          id: noteId,
          title: note.title,
          body: note.body,
        },
      });

      toast({
        title: 'Catatan berhasil diperbarui.',
        description: `Catatan dengan judul ${note.title} berhasil diperbarui.`,
        status: 'success',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
      });

      router.push('/');
    } catch (error) {
      console.error('Error updating note:', error);
      toast({
        title: 'Terjadi kesalahan.',
        description: 'Gagal memperbarui catatan. Silakan coba lagi.',
        status: 'error',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <Loading />;
  if (error) return <Text color="red.500">Error: {error.message}</Text>;

  return (
    <NoteForm
      type='edit'
      note={note}
      setNote={setNote}
      submitting={submitting}
      handleSubmit={handleSubmit}
    />
  );
};

export default EditNotePage;

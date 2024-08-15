'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { gql, useMutation } from '@apollo/client';
import { Container, useToast } from '@chakra-ui/react';
import { CREATE_NOTE_MUTATION } from '@/graphql/mutations';
import NoteForm from '@/components/NoteForm';
import BackHeading from '@/components/BackHeading';

const CreateNote: React.FC = () => {
  const router = useRouter();
  const toast = useToast();

  const [submitting, setSubmitting] = useState(false);
  const [note, setNote] = useState({
    title: '',
    body: '',
  });
  const [createNote] = useMutation(CREATE_NOTE_MUTATION, {
    update(cache, { data: { createNote } }) {
      cache.modify({
        fields: {
          notes(existingNotes = []) {
            const newNoteRef = cache.writeFragment({
              data: createNote,
              fragment: gql`
                fragment NewNote on Note {
                  id
                  title
                  body
                  createdAt
                }
              `,
            });

            return [...existingNotes, newNoteRef];
          },
        },
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { data } = await createNote({
        variables: {
          title: note.title,
          body: note.body,
        },
      });

      toast({
        title: 'Catatan berhasil dibuat.',
        description: `Catatan dengan judul ${data.createNote.title} berhasil dibuat.`,
        status: 'success',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
      });

      router.push('/');
    } catch (error) {
      toast({
        title: 'Terjadi kesalahan',
        description: 'Terjadi kesalahan saat membuat catatan. Silahkan coba lagi.',
        status: 'error',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxW="container.md" py={10} centerContent>
      <BackHeading title="Buat Catatan" />

      <NoteForm type="create" note={note} setNote={setNote} submitting={submitting} handleSubmit={handleSubmit} />
    </Container>
  );
};

export default CreateNote;

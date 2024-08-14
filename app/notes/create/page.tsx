'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { gql, useMutation } from '@apollo/client';
import { useToast } from '@chakra-ui/react';
import { CREATE_NOTE_MUTATION } from '@/graphql/mutations';
import NoteForm from '@/components/NoteForm';

const CreateNote: React.FC = () => {
  const router = useRouter();
  const toast = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
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
    setIsSubmitting(true);

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
        position: 'top-left',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return <NoteForm type="create" note={note} setNote={setNote} submitting={isSubmitting} handleSubmit={handleSubmit} />;
};

export default CreateNote;

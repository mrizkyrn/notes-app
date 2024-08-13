'use client';

import React, { useState } from 'react';
import { HStack, Heading, Input, Textarea, FormControl, FormLabel, useToast, Container, Box } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { gql, useMutation } from '@apollo/client';
import { BackButton, CreateButton } from '@/components/Buttons';

import { CREATE_NOTE_MUTATION } from '@/graphql/mutations';

const CreateNote: React.FC = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const router = useRouter();

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
          title,
          body,
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

  return (
    <Container maxW="container.md" py={10} centerContent>
      <HStack spacing={3} mb={6} w="100%">
        <BackButton onClick={() => router.back()} />
        <Heading as="h1" size="lg" textAlign="center">
          Buat Catatan
        </Heading>
      </HStack>

      <Box w="100%" as="form" onSubmit={handleSubmit} borderWidth={1} p={6} bg="white" borderRadius="lg">
        <FormControl mb={4} isRequired>
          <FormLabel htmlFor="title">Judul</FormLabel>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Masukkan judul catatan"
          />
        </FormControl>

        <FormControl mb={6}>
          <FormLabel htmlFor="body">Isi Catatan</FormLabel>
          <Textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Masukkan isi catatan"
            minHeight="150px"
          />
        </FormControl>

        <CreateButton isSubmitting={isSubmitting} />
      </Box>
    </Container>
  );
};

export default CreateNote;

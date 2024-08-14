'use client';

import { useRouter } from 'next/navigation';
import { HStack, Heading, Input, Textarea, FormControl, FormLabel, useToast, Container, Box } from '@chakra-ui/react';
import { BackButton, CreateButton } from '@/components/Buttons';

interface NoteFormProps {
  type: 'create' | 'edit';
  note: { title: string; body: string };
  setNote: (note: { title: string; body: string }) => void;
  submitting: boolean;
  handleSubmit: (e: React.FormEvent) => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ type, note, setNote, submitting, handleSubmit }) => {
  const router = useRouter();
  return (
    <Container maxW="container.md" py={10} centerContent>
      <HStack spacing={3} mb={10} w="100%">
        <BackButton onClick={() => router.push('/')} />
        <Heading as="h1" size="lg" textAlign="center">
          {type === 'create' ? 'Buat Catatan' : 'Edit Catatan'}
        </Heading>
      </HStack>

      <Box w="100%" as="form" onSubmit={handleSubmit} borderWidth={1} p={6} bg="white" borderRadius="lg">
        <FormControl mb={4} isRequired>
          <FormLabel htmlFor="title">Judul</FormLabel>
          <Input
            id="title"
            type="text"
            value={note.title}
            onChange={(e) => setNote({ ...note, title: e.target.value })}
            placeholder="Masukkan judul catatan"
          />
        </FormControl>

        <FormControl mb={6}>
          <FormLabel htmlFor="body">Isi Catatan</FormLabel>
          <Textarea
            id="body"
            value={note.body}
            onChange={(e) => setNote({ ...note, body: e.target.value })}
            placeholder="Masukkan isi catatan"
            minHeight="150px"
          />
        </FormControl>

        <CreateButton isSubmitting={submitting} />
      </Box>
    </Container>
  );
};

export default NoteForm;

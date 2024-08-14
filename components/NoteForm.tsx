'use client';

import { Input, Textarea, FormControl, FormLabel, Box } from '@chakra-ui/react';
import { SubmitButton } from '@/components/Buttons';

interface NoteFormProps {
  type: 'create' | 'edit';
  note: { title: string; body: string };
  setNote: (note: { title: string; body: string }) => void;
  submitting: boolean;
  handleSubmit: (e: React.FormEvent) => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ type, note, setNote, submitting, handleSubmit }) => {
  return (
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

      <SubmitButton isSubmitting={submitting}>{type === 'create' ? 'Tambah' : 'Perbarui'}</SubmitButton>
    </Box>
  );
};

export default NoteForm;

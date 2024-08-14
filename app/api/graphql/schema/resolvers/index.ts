import { query } from '@/lib/db';
import { transformNotes } from '@/lib/utils';

interface NoteArgs {
  id: string;
  title?: string;
  body?: string;
}

interface Note {
  id: String;
  title: String;
  body: String;
  createdAt: String;
}

const resolvers = {
  Query: {
    notes: async (): Promise<Note[]> => {
      const result = await query('SELECT * FROM notes');
      return transformNotes(result);
    },
    note: async (_: unknown, args: NoteArgs): Promise<Note | null> => {
      const result = await query('SELECT * FROM notes WHERE id = $1', [args.id]);
      return transformNotes(result)[0] || null;
    },
  },
  Mutation: {
  createNote: async (_: unknown, args: NoteArgs): Promise<Note> => {
    const result = await query<Note>(
      'INSERT INTO notes (title, body) VALUES ($1, $2) RETURNING *',
      [args.title, args.body]
    );
    return result[0];
  },
  updateNote: async (_: unknown, args: NoteArgs): Promise<Note> => {
    const result = await query<Note>(
      'UPDATE notes SET title = $1, body = $2 WHERE id = $3 RETURNING *',
      [args.title, args.body, args.id]
    );
    return result[0];
  },
  deleteNote: async (_: unknown, args: NoteArgs): Promise<Note> => {
    const result = await query<Note>('DELETE FROM notes WHERE id = $1 RETURNING *', [args.id]);
    return result[0];
  },
  },
};

export default resolvers;

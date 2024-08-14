  import { PrismaClient, Note as NoteModel } from '@prisma/client';

  const prisma = new PrismaClient();

  interface NoteArgs {
    id: string;
    title?: string;
    body?: string;
  }

  const resolvers = {
    Query: {
      notes: async (): Promise<NoteModel[]> => {
        return await prisma.note.findMany();
      },
      note: async (_: unknown, args: NoteArgs): Promise<NoteModel | null> => {
        return await prisma.note.findUnique({
          where: { id: args.id },
        });
      },
    },
    Mutation: {
      createNote: async (_: unknown, args: NoteArgs): Promise<NoteModel> => {
        return await prisma.note.create({
          data: {
            title: args.title!,
            body: args.body!,
          },
        });
      },
      updateNote: async (_: unknown, args: NoteArgs): Promise<NoteModel> => {
        return await prisma.note.update({
          where: { id: args.id },
          data: {
            title: args.title || undefined,
            body: args.body || undefined,
          },
        });
      },
      deleteNote: async (_: unknown, args: NoteArgs): Promise<NoteModel> => {
        console.log('Delete note with id be:', args.id);
        return await prisma.note.delete({
          where: { id: args.id },
        });
      },
    },
  };

  export default resolvers;

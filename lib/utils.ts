import { Note } from '@/types';

export const formatDate = (timestamp: string): string => {
  const date = new Date(parseInt(timestamp, 10));
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  return date.toLocaleDateString('id-ID', options);
};

export const transformNotes = (rows: any[]): Note[] => {
  return rows.map(row => ({
    id: row.id,
    title: row.title,
    body: row.body,
    createdAt: row.created_at
  }));
};
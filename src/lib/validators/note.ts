import z from 'zod';
import type { toZod } from 'tozod';
import type { Note } from '$lib/database'

export const updateNoteValidator: toZod<Omit<Note, "userId">> = z.object({
  id: z.string().cuid(),
  title: z.string()
    .trim()
    .min(2, "Title must be at least 2 characters")
    .max(255, "Title cannot exceed 255 characters"),
  body: z.string().trim().min(1, "Body cannont be empty")
})

export const newNoteValidator = updateNoteValidator.omit({ id: true});
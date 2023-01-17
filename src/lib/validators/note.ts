import z from "zod"
import type { toZod } from "tozod"
import type { Note } from "$lib/database"

export const baseValidator: toZod<Omit<Note, "userId">> = z.object({
  id: z.string().cuid(),
  parentId: z.string().cuid().nullable(),
  description: z
    .string()
    .trim()
    .max(255, "Description cannot exceed 255 characters")
    .nullable(),
  title: z
    .string()
    .trim()
    .min(2, "Title must be at least 2 characters")
    .max(255, "Title cannot exceed 255 characters"),
  body: z.string().trim().min(1, "Body cannont be empty"),
})

export const newChildNoteValidator = baseValidator.omit({ id: true })
export const editNoteValidator = baseValidator.omit({ parentId: true })
export const newNoteValidator = newChildNoteValidator.omit({ parentId: true })

export const idValidator = z.object({
  id: z.string(),
})

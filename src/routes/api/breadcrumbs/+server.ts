import { prisma } from "$lib/database"
import type { Note } from "$lib/database"
import { error } from "@sveltejs/kit"
import type { RequestHandler } from "./$types"

export type BreadCrumb = {
  id: string
  title: string
}

export const GET = (async function (event) {
  const session = await event.locals.getSession()

  const user = session?.user

  if (!user) {
    throw error(401, "not logged in")
  }
  const id = event.url.searchParams.get("id") ?? null

  if (!id) {
    throw error(400, "bad request")
  }

  let noteId: string | null = id

  const breadcrumbs: BreadCrumb[] = []

  do {
    const note: Note | null = await prisma.note.findFirst({
      where: {
        id: noteId,
      },
    })

    if (!note) {
      throw error(400, "Invalid note Id")
    }

    const { id, title } = note

    noteId = note.parentId

    breadcrumbs.unshift({ id, title })
  } while (noteId !== null)

  return new Response(JSON.stringify({ breadcrumbs }))
}) satisfies RequestHandler

import { prisma } from "$lib/database"
import { error } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"
export const load: PageServerLoad = async function (event) {
  const session = await event.locals.getSession()

  const user = session?.user

  if (!user) {
    throw error(401, "not logged in")
  }

  const { id: userId } = user

  const notes = await prisma.note.findMany({
    where: {
      userId,
      parentId: null
    },
  })

  return {
    notes: notes.map((note) => {
      const { id, title, body } = note
      return { id, title, body }
    }),
  }
}

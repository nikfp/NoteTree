import { prisma } from "$lib/database"
import { error } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"
export const load: PageServerLoad = async function (event) {
  const session = await event.locals.getSession()

  const user = session?.user

  if (!user) {
    throw error(401, "not logged in")
  }
  const id = event.params.id

  const { id: userId } = user

  const note = await prisma.note.findFirst({
    where: {
      userId,
      id,
    },
  })

  if (!note) throw error(404, "Note not found")

  return {
    note,
  }
}

import { newNoteValidator } from "$lib/validators/note"
import type { PageServerLoad, Actions } from "./$types"
import { fail, redirect } from "@sveltejs/kit"
import { prisma } from "$lib/database"

export const load: PageServerLoad = async function (event) {
  const session = await event.locals.getSession()
  if (!session || !session.user) throw fail(401)

  const { parentId } = event.params

  const parentNote = await prisma.note.findUnique({
    where: {
      id: parentId,
    },
  })

  return {
    parent: { ...parentNote }
  }
}

export const actions: Actions = {
  default: async (event) => {
    const session = await event.locals.getSession()
    if (!session || !session.user) throw fail(401)

    const { parentId } = event.params

    const parent = await prisma.note.findUnique({
      where: {
        id: parentId,
      },
    })

    if (!parent || parent.userId !== session.user.id) throw fail(401)

    const info = Object.fromEntries(await event.request.formData())
    const data = await newNoteValidator.safeParseAsync(info)

    if (!data.success) {
      const errors = data.error.errors.map((error) => {
        return {
          field: error.path[0],
          message: error.message,
        }
      })
      return fail(400, { error: true, errors })
    }

    const { id: userId } = session.user

    const { id } = await prisma.note.create({
      data: {
        userId,
        parentId,
        ...data.data,
      },
    })

    throw redirect(303, `/note/${id}`)
  },
}

import { prisma } from "$lib/database"
import { newNoteValidator } from "$lib/validators/note"
import { error, fail, redirect, type Actions } from "@sveltejs/kit"
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


export const actions: Actions = {
  default: async (event) => {
    const session = await event.locals.getSession();
    if(!session || !session.user) throw fail(401)
    const info = Object.fromEntries(await event.request.formData());
    const data = await newNoteValidator.safeParseAsync(info);

    if (!data.success) {
      const errors = data.error.errors.map(error => {
        return {
          field: error.path[0],
          message: error.message
        }
      })
      return fail(400, { error: true, errors })
    }

    const {id} = event.params;
    
    await prisma.note.update({
      where: {
        id
      },
      data: {
        ...data.data
      }
    })

    throw redirect(303, `/note/${id}`)
  }
}

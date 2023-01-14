import { prisma } from "$lib/database"
import { error, fail, redirect } from "@sveltejs/kit"
import type { Actions, PageServerLoad } from "./$types"
import { idValidator } from "$lib/validators/note"

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
    include: {
      children: {
        select: {
          id: true,
        },
      },
    },
  })

  if (!note) throw error(404, "Note not found")

  return {
    note,
  }
}

export const actions: Actions = {
  default: async (event) => {
    const session = await event.locals.getSession()
    if (!session || !session.user) throw fail(401)
    const info = Object.fromEntries(await event.request.formData())
    const data = await idValidator.safeParseAsync(info)

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

    const note = await prisma.note.findUnique({
      where: {
        id: data.data.id,
      },
    })

    if (!note) {
      return fail(401, {
        error: true,
        errors: [{ field: "id", message: "Note for ID not found" }],
      })
    }

    if (note.userId !== userId) {
      return fail(401, {
        error: true,
        errors: [{ field: "id", message: "User ID and Note ID mismatch" }],
      })
    }

    const deleted = await prisma.note.delete({
      where: {
        id: data.data.id,
      },
    })

    if (!deleted) {
      return fail(401, {
        error: true,
        errors: [{ field: "id", message: "Delete operation failed" }],
      })
    }

    if (deleted.parentId) {
      throw redirect(303, `/note/${deleted.parentId}`)
    }

    throw redirect(303, "/")
  },
}

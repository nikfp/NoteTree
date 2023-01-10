import { newNoteValidator } from '$lib/validators/note';
import type { Actions } from './$types'
import { fail, redirect } from '@sveltejs/kit'
import { prisma } from '$lib/database';

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

    const {id: userId } = session.user;
    
    await prisma.note.create({
      data: {
        userId, 
        ...data.data

      }
    })

    throw redirect(303, "/")
  }
}

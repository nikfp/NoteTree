import { newNoteValidator } from '$lib/validators/note';
import type { Actions } from './$types'
import { fail, redirect } from '@sveltejs/kit'

export const actions: Actions = {
  default: async (event) => {
    const user = await event.locals.getSession();
    console.log(user);
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
    console.log(data);

    throw redirect(303, "/")
  }
}

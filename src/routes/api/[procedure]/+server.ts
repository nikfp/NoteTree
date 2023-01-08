import { redirect, type RequestHandler } from '@sveltejs/kit';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { router } from '$lib/trpc-server';

const handler: RequestHandler = async function({ request, locals }) {
  const session = await locals.getSession();

  if (!session) {
    throw redirect(307, "/")
  }

  const trpcPathBase = '/api';

  const httpResponse = await fetchRequestHandler({
    router,
    req: request,
    endpoint: trpcPathBase,
    createContext: async () => {
      return {
        req: request
      }
    }
  });

  return httpResponse
};

export { handler as GET, handler as POST };


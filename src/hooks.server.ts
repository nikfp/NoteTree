import { SvelteKitAuth } from "@auth/sveltekit"
import GitHub from "@auth/core/providers/github"
import { GITHUB_ID, GITHUB_SECRET } from "$env/static/private"
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '$lib/database'

export const handle = SvelteKitAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "database",
    generateSessionToken: () => {
      return crypto.randomUUID();
    }
  },
  callbacks: {
    session: async ({session, user}) => {
      if(session && user && session.user) {
        session.user.id = user.id;
      }
      return session;
    }
  },
  providers: [GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET })],
})

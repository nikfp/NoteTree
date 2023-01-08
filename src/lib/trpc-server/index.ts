import * as trpc from '@trpc/server'

export const t = trpc.initTRPC.create();

export const router = t.router({
  sayHello: t.procedure.query(() => "Hello from TRPC"),
})

export type Router = typeof router;

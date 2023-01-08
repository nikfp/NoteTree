import type { Router } from '../trpc-server/index'
import * as trpc from '@trpc/client'


const trpcClient = trpc.createTRPCProxyClient<Router>({
  links: [
    trpc.httpBatchLink({
      url: "http://localhost:5173/api"
    })
  ]
})

export default trpcClient

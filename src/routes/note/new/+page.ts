import trpcClient from '$lib/trpc-client';
import type {PageLoad} from './$types';


export const load = (() => {
  return {
    helloData: trpcClient.sayHello.query()
  }
}) satisfies PageLoad 

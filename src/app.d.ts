import type { Session as DefaultSession } from "@auth/core/types"

declare global {
  declare namespace App {
    interface Session {
      user?: {
        id: string
      } & DefaultSession["user"],
      expires?: DefaultSession["expires"]
    } 
  }
}

// declare module 'next-auth' {
//   interface Session {
//     user: {
//       id: string;
//     } & Session["user"]
//   }
// }

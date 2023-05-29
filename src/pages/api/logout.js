import mw from "@/api/mw"
import {setCookie} from "@/components/utils/cookies"

const handler = mw({
  POST: [
    async ({ res }) => {
      setCookie(res, "session", null, {
        maxAge: -1,
        path: "/",
        httpOnly: true
      })

      res.send({ result: true })
    }
  ]
})

export default handler

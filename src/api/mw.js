import config from "@/api/config.js"
import BaseModel from "@/api/db/models/BaseModel.js"
import deepmerge from "deepmerge"
import knex from "knex"
import cors from "cors"

const db = knex(config.db)
BaseModel.knex(db)

const corsMiddleware = cors({
  origin: (origin, callback) => {
    callback(null, true)
  },
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
})

const mw = (methodHandlers) => async (req, res) => {
  corsMiddleware(req, res, async (error) => {
    if (error) {
      res.status(500).send({ error: "CORS configuration error" })

      return
    }

    const methodHandler = methodHandlers[req.method]

    if (!methodHandler) {
      res.status(405).send({ error: "method not allowed" })

      return
    }

    const handlers = Array.isArray(methodHandler)
      ? methodHandler
      : [methodHandler]
    let handlerIndex = 0
    const locals = {}
    const ctx = {
      db,
      req,
      res,
      get locals() {
        return locals
      },
      set locals(newLocals) {
        Object.assign(locals, deepmerge(locals, newLocals))
      },
      next: async () => {
        const handler = handlers[handlerIndex]
        handlerIndex += 1

        await handler(ctx)
      },
    }

    await ctx.next()
  })
}

export default mw

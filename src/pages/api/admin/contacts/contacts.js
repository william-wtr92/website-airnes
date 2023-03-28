import ContactModel from "@/api/db/models/ContactModel"
import mw from "@/api/mw"
import {NotFoundError} from "@/api/errors"

const handler = mw({
  GET: [
    async ({
             res,
           }) => {
      const query = await ContactModel.query()

      if (query) {
        res.send({
          result: query,
        })
      } else {
        res.send({result: ""})

        throw new NotFoundError()
      }
    },
  ],
})

export default handler

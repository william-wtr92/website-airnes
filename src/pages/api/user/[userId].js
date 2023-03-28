import UserModel from "@/api/db/models/UserModel"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import { numberValidator } from "@/components/validation/validation"

const handler = mw({
  GET: [
    //rajouter auth
    validate({
      query: {
        userId: numberValidator.required(),
      },
    }),
    async ({
      locals: {
        query: { userId },
      },
      res,
    }) => {
      const id = userId

      const query = await UserModel.query()
        .findOne({ id })
        .select("email", "name")
        .withGraphFetched("alldata")

      if (query) {
        res.send({
          result: query,
        })
      } else {
        res.send({ result: null })
      }
    },
  ],
})

export default handler

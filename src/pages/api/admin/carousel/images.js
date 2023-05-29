import CarouselModel from "@/api/db/models/CarouselModel"
import mw from "@/api/mw"
import { NotFoundError } from "@/api/errors"

const handler = mw({
  GET: [
    async ({ res }) => {
      const carousel = await CarouselModel.query().orderBy("id", "asc")

      if (!carousel) {
        throw new NotFoundError()
      }

      res.send({
        result: carousel,
      })
    },
  ],
})

export default handler

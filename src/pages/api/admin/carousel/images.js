import CarouselModel from "@/api/db/models/CarouselModel"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import { queryPageValidator } from "@/components/validation/validation"
import config from "@/api/config"
import { NotFoundError } from "@/api/errors"

const handler = mw({
  GET: [
    validate({
      query: {
        page: queryPageValidator.optional(),
      },
    }),
    async ({
      locals: {
        query: { page },
      },
      res,
    }) => {
      let carousels
      let pagination

      if (page) {
        const limit = config.pagination.limit.default
        const offset = (page - 1) * limit

        carousels = await CarouselModel.query()
          .orderBy("id", "asc")
          .limit(limit)
          .offset(offset)
        const totalCount = await CarouselModel.query().count().first()

        pagination = {
          page,
          limit,
          totalItems: parseInt(totalCount.count, 10),
          totalPages: Math.ceil(totalCount.count / limit),
        }
      } else {
        carousels = await CarouselModel.query().orderBy("id", "asc")
      }

      if (carousels) {
        res.send({
          result: carousels,
          pagination: pagination,
        })
      } else {
        res.send({ result: "" })

        throw new NotFoundError()
      }
    },
  ],
})

export default handler

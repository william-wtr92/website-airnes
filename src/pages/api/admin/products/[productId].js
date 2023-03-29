import mw from "@/api/mw"
import validate from "@/api/middlewares/validate"
import {numberValidator} from "@/components/validation/validation"
import ProductModel from "@/api/db/models/CategoryModel"
import {NotFoundError} from "@/api/errors"

const handler = mw({
    GET: [
        validate({
            query: {
                productId: numberValidator.required(),
            },
        }),
        async ({
                   locals: {
                       query: {productId},
                   },
                   res,
               }) => {
            const id = productId

            const category = await ProductModel.query()
                .findOne({id})

            if (!category) {
                res.send({result: null})

                throw new NotFoundError()
            }

            res.send({
                result: category,
            })
        },
    ],
})

export default handler
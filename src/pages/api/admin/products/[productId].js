import mw from "@/api/mw"
import validate from "@/api/middlewares/validate"
import { numberValidator} from "@/components/validation/validation"
import { NotFoundError } from "@/api/errors"
import ProductModel from "@/api/db/models/ProductModel"

const handler = mw({
    GET: [
        validate({
            query: {
                productId: numberValidator.required(),
            },
        }),
        async ({
                   locals: {
                       query: { productId },
                   },
                   res,
               }) => {
            const id = productId

            const product = await ProductModel.query().findOne({ id })

            if (!product) {
                res.send({ result: null })

                throw new NotFoundError()
            }

            res.send({
                result: product,
            })
        },
    ],
})

export default handler

import ProductModel from "@/api/db/models/CategoryModel"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import {
    linkValidator, numberValidator, stringValidator,
} from "@/components/validation/validation"
import parseSession from "@/web/parseSession"
import UserModel from "@/api/db/models/UserModel"
import {NotFoundError} from "@/api/errors"

const handler = mw({
    POST: [
        validate({
            body: {
                image: linkValidator.required(),
                category: numberValidator.required(),
                name: stringValidator.required(),
                price: numberValidator.required(),
                promotion: numberValidator.required(),
                quantity: numberValidator.required(),
                description: stringValidator.required(),
                material: stringValidator.required()
            },
        }),
        async ({
                   locals: {
                       body: {image, name, description, category, price, promotion, quantity, material, jwt},
                   },
                   res,
               }) => {
            const session = parseSession(jwt.jwt)
            const id = session.user.id
            const user = await UserModel.query().findOne({id})

            if (user.roleid !== 1) {
                res.status(403).send(
                    {error: "You are not admin"}
                )

                return
            }

            await ProductModel.query().insertAndFetch({
                image,
                category,
                price,
                promotion,
                quantity,
                name,
                description,
                material,
            })
            res.send({result: true})
        },
    ],
    GET: [
        async ({
                   res,
               }) => {
            const query = await ProductModel.query()

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

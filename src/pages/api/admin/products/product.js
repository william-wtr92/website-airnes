import ProductModel from "@/api/db/models/ProductModel"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import {
    linkValidator, numberValidator, stringValidator,
} from "@/components/validation/validation"
import parseSession from "@/web/parseSession"
import UserModel from "@/api/db/models/UserModel"

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

            const categoryId = parseInt(category)
            const materialId = parseInt(material)

            if (user.roleid !== 1) {
                res.status(403).send(
                    {error: "You are not admin"}
                )

                return
            }

            await ProductModel.query().insertAndFetch({
                image,
                categoryId,
                price,
                promotion,
                quantity,
                name,
                description,
                materialId,
            })
            res.send({result: true})
        },
    ],
})

export default handler

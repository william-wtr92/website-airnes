import mw from "@/api/mw"
import { NotFoundError } from "@/api/errors"
import MaterialModel from "@/api/db/models/MaterialModel"
import CategoryModel from "@/api/db/models/CategoryModel"
import auth from "@/api/middlewares/auth"

const handler = mw({
    GET: [
        auth("admin"),
        async ({ res }) => {
            const [categories, materials] = await Promise.all([
                CategoryModel.query().orderBy("id"),
                MaterialModel.query().orderBy("id"),
            ])

            if (!categories && !materials) {
                throw new NotFoundError()
            }

            res.send({
                categories,
                materials,
            })
        },
    ],
})

export default handler
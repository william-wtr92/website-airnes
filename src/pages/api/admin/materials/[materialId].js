import mw from "@/api/mw"
import validate from "@/api/middlewares/validate"
import {
    numberValidator,
    stringValidator,
} from "@/components/validation/validation"
import { NotFoundError } from "@/api/errors"
import ProductModel from "@/api/db/models/ProductModel"
import { boolean } from "yup"
import auth from "@/api/middlewares/auth"
import MaterialModel from "@/api/db/models/MaterialModel"
import SelectedMaterialModel from "@/api/db/models/SelectedMaterialModel"

const handler = mw({
    GET: [
        auth("admin"),
        validate({
            query: {
                materialId: numberValidator.required(),
                showProducts: boolean(),
            },
        }),
        async ({
                   locals: {
                       query: { materialId, showProducts },
                   },
                   res,
               }) => {
            const id = materialId

            const material = await MaterialModel.query().findOne({ id })

            if (!material) {
                throw new NotFoundError()
            }

            if (showProducts) {
                const products = await ProductModel.query().where({ materialId: id })

                res.send({
                    result: {
                        ...material,
                        products,
                    },
                })
            }

            res.send({
                result: material,
            })
        },
    ],
    PATCH: [
        auth("admin"),
        validate({
            query: {
                materialId: numberValidator.required(),
            },
            body: {
                name: stringValidator,
                description: stringValidator,
            },
        }),
        async ({
                   locals: {
                       query: { materialId },
                       body: { name, description },
                   },
                   res,
               }) => {
            const id = materialId

            const noMaterial = await MaterialModel.query().findOne({
                name: "No material",
            })

            const noMaterialId = parseInt(noMaterial.id, 10)

            if (id === noMaterialId) {
                res.status(400).send({ error: "Can't delete this material" })

                return
            }

            const material = await MaterialModel.query().findOne({ id })

            await MaterialModel.query().updateAndFetchById(id, {
                ...(material.name !== name ? { name } : {}),
                ...(material.description !== description ? { description } : {}),
            })

            res.send({ result: true })
        },
    ],
    DELETE: [
        auth("admin"),
        validate({
            query: {
                materialId: numberValidator.required(),
            },
        }),
        async ({
                   locals: {
                       query: { materialId },
                   },
                   res,
               }) => {
            const id = materialId

            const noMaterial = await MaterialModel.query().findOne({
                name: "No material",
            })

            const noMaterialId = parseInt(noMaterial.id, 10)

            if (id === noMaterialId) {
                res.status(400).send({ error: "Can't delete this material" })

                return
            }

            await ProductModel.query()
                .update({ materialId: noMaterialId })
                .where({ materialId: id })

            await SelectedMaterialModel.query()
                .where({ material_id: id })
                .del()

            await MaterialModel.query().findOne({ id }).del()

            res.send({ result: true })
        },
    ],
})

export default handler

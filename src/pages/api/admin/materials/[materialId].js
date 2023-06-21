import mw from "@/api/mw"
import validate from "@/api/middlewares/validate"
import {
    numberValidator,
    stringValidator,
} from "@/components/validation/validation"
import {InvalidArgumentError, NotFoundError} from "@/api/errors"
import ProductModel from "@/api/db/models/ProductModel"
import { boolean } from "yup"
import auth from "@/api/middlewares/auth"
import MaterialModel from "@/api/db/models/MaterialModel"

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
            try {
                const id = materialId

                const material = await MaterialModel.query().findOne({ id })

                await MaterialModel.query().updateAndFetchById(id, {
                    ...(material.name !== name ? { name } : {}),
                    ...(material.description !== description ? { description } : {}),
                })

                res.send({ result: true })
            } catch {
                throw new InvalidArgumentError
            }
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
            try {
                const id = materialId

                await MaterialModel.query().findOne({ id }).del()

                res.send({ result: true })
            } catch {
                throw new InvalidArgumentError
            }
        },
    ],
})

export default handler

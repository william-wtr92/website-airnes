import mw from "@/api/mw"
import validate from "@/api/middlewares/validate"
import { numberValidator } from "@/components/validation/validation"
import auth from "@/api/middlewares/auth"
import { NotFoundError } from "@/api/errors"
import SelectedMaterialModel from "@/api/db/models/SelectedMaterialModel"
import MaterialModel from "@/api/db/models/MaterialModel"

const handler = mw({
  GET: [
    async ({ res }) => {
      const materials = await SelectedMaterialModel.query()
        .withGraphJoined("material")
        .orderBy("order")

      if (!materials) {
        throw new NotFoundError()
      }

      res.send({ result: materials })
    },
  ],
  POST: [
    auth("admin"),
    validate({
      materialId: numberValidator.required(),
    }),
    async ({
      locals: {
        body: { materialId },
      },
      res,
    }) => {
      const material = await MaterialModel.query().findById(materialId)

      if (!material) {
        return res.status(400).send({ error: "Material not found" })
      }

      const existingSelectedMaterial = await SelectedMaterialModel.query()
        .where("material_id", materialId)
        .first()

      if (existingSelectedMaterial) {
        return res.status(400).send({
          error: "Material already add",
        })
      }

      const maxOrder = await SelectedMaterialModel.query().max(
        "order as maxOrder"
      )

      const newOrder = (maxOrder[0].maxOrder || 0) + 1

      const newSelectedMaterial = await SelectedMaterialModel.query().insert({
        order: newOrder,
        material_id: materialId,
      })

      res.status(201).send({ result: newSelectedMaterial })
    },
  ],
})

export default handler

import BaseModel from "@/api/db/models/BaseModel"
import ProductModel from "@/api/db/models/ProductModel"

class MaterialModel extends BaseModel {
    static tableName = "material"

    static relationMappings() {
        return {
            products: {
                relation: BaseModel.HasManyRelation,
                modelClass: ProductModel,
                join: {
                    from: "material.id",
                    to: "product.materialId",
                },
            },
        }
    }

    static get modifiers() {
        return {
            sanitize(builder) {
                builder.select("id", "name")
            },
        }
    }
}

export default MaterialModel

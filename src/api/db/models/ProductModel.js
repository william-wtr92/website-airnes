import BaseModel from "@/api/db/models/BaseModel"
import CategoryModel from "@/api/db/models/CategoryModel"
import MaterialModel from "@/api/db/models/MaterialModel"

class ProductModel extends BaseModel {
  static tableName = "product"

  static relationMappings() {
    return {
      category: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: CategoryModel,
        join: {
          from: "product.category_id",
          to: "category.id",
        },
      },
      material: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: MaterialModel,
        join: {
          from: "product.material_id",
          to: "material.id",
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

export default ProductModel

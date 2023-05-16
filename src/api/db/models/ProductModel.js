import BaseModel from "@/api/db/models/BaseModel"
import CategoryModel from "@/api/db/models/CategoryModel"

class ProductModel extends BaseModel {
  static tableName = "product"

  static relationMappings() {
    return {
      category: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: CategoryModel,
        join: {
          from: "product.category_id",
          to: "category.id"
        }
      }
    }
  }
}

export default ProductModel
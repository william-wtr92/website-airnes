import BaseModel from "@/api/db/models/BaseModel.js"
import ProductModel from "./ProductModel"

class SelectedProductModel extends BaseModel {
  static tableName = "selected_product"

  static relationMappings() {
    return {
      user: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: ProductModel,
        join: {
          from: "selected_product.product_id",
          to: "product.id",
        },
      },
    }
  }
}

export default SelectedProductModel

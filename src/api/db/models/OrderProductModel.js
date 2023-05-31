import BaseModel from "@/api/db/models/BaseModel"
import ProductModel from "./ProductModel"

class OrderProductModel extends BaseModel {
  static tableName = "order_product"

  static relationMappings = {
    product: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: ProductModel,
      join: {
        from: "order_product.product_id",
        to: "product.id",
      },
    },
  }
}

export default OrderProductModel

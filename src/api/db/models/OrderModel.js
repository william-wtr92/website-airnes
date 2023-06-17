import BaseModel from "@/api/db/models/BaseModel"
import AddressModel from "./AddressModel"
import OrderProductModel from "@/api/db/models/OrderProductModel"

class OrderModel extends BaseModel {
  static tableName = "order"

  static relationMappings() {
    return {
      addressData: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: AddressModel,
        join: {
          from: "order.address_id",
          to: "address.id",
        },
      },
      products: {
        relation: BaseModel.HasManyRelation,
        modelClass: OrderProductModel,
        join: {
          from: "order.id",
          to: "order_product.order_id",
        }
      }
    }
  }
}

export default OrderModel

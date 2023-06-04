import BaseModel from "@/api/db/models/BaseModel"
import AddressModel from "./AddressModel"

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
    }
  }
}

export default OrderModel

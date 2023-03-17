import BaseModel from "@/api/db/models/BaseModel.js"
import UserModel from "./UserModel"

class AddressModel extends BaseModel {
  static tableName = "address"

  static relationMappings() {
    return {
      user: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: "address.userid",
          to: "user.id",
        },
      },
    }
  }
}

export default AddressModel

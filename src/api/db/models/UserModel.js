import BaseModel from "@/api/db/models/BaseModel.js"
import hashPassword from "../hashPassword"
import AddressModel from "./AddressModel"

class UserModel extends BaseModel {
  static tableName = "user"

  static relationMappings() {
    return {
      alldata: {
        relation: BaseModel.HasManyRelation,
        modelClass: AddressModel,
        join: {
          from: "user.id",
          to: "address.userid",
          modify: (query) => query.select("id"),
        },
      },
    }
  }

  checkPassword = async (password) => {
    const [passwordHash] = await hashPassword(password, this.passwordSalt)

    return passwordHash === this.passwordHash
  }
}

export default UserModel

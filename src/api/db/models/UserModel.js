import BaseModel from "@/api/db/models/BaseModel.js"
import hashPassword from "../hashPassword"
import AddressModel from "./AddressModel"
import RoleModel from "./RoleModel"

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
      roledata: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: RoleModel,
        filter: (query) => query.select("right"),
        join: {
          from: "user.roleid",
          to: "role.id",
        },
      },
    }
  }

  static get modifiers() {
    return {
      sanitize(builder) {
        builder.select("id", "mail", "name")
      },
    }
  }

  checkPassword = async (password) => {
    const [passwordHash] = await hashPassword(password, this.passwordSalt)

    return passwordHash === this.passwordHash
  }
}

export default UserModel

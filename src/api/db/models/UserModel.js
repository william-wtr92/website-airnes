import BaseModel from "@/api/db/models/BaseModel.js"
import hashPassword from "../hashPassword"

class UserModel extends BaseModel {
  static tableName = "user"

  checkPassword = async (password) => {
    const [passwordHash] = await hashPassword(password, this.passwordSalt)

    return passwordHash === this.passwordHash
  }
}

export default UserModel

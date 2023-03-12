import BaseModel from "@/api/db/models/BaseModel.js"

class UserModel extends BaseModel {
  static tableName = "user"
}

export default UserModel

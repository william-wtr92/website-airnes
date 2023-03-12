import BaseModel from "@/api/db/models/BaseModel"

class ContactModel extends BaseModel {
  static tableName = "contact"
}

export default ContactModel
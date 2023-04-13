import BaseModel from "@/api/db/models/BaseModel"

class ProductModel extends BaseModel {
    static tableName = "product"
}

export default ProductModel
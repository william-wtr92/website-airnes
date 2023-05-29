import BaseModel from "@/api/db/models/BaseModel"
import ProductModel from "@/api/db/models/ProductModel"

class CategoryModel extends BaseModel {
  static tableName = "category"

  static relationMappings() {
    return {
      products: {
        relation: BaseModel.HasManyRelation,
        modelClass: ProductModel,
        join: {
          from: "category.id",
          to: "product.categoryId",
        },
      },
    }
  }

  static get modifiers() {
    return {
      sanitize(builder) {
        builder.select("id", "name")
      },
    }
  }
}

export default CategoryModel

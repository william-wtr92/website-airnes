import BaseModel from "@/api/db/models/BaseModel.js"
import CategoryModel from "./CategoryModel"

class SelectedCategoryModel extends BaseModel {
  static tableName = "selected_category"

  static relationMappings() {
    return {
      category: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: CategoryModel,
        join: {
          from: "selected_category.category_id",
          to: "category.id",
        },
      },
    }
  }
}

export default SelectedCategoryModel

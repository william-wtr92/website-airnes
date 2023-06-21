import BaseModel from "@/api/db/models/BaseModel.js"
import MaterialModel from "@/api/db/models/MaterialModel"

class SelectedCategoryModel extends BaseModel {
    static tableName = "selected_material"

    static relationMappings() {
        return {
            material: {
                relation: BaseModel.BelongsToOneRelation,
                modelClass: MaterialModel,
                join: {
                    from: "selected_material.material_id",
                    to: "material.id",
                },
            },
        }
    }
}

export default SelectedCategoryModel

import {categoryInitialValues, categoryValidationSchema} from "@/components/validation/admin/category"
import {useRouter} from "next/router"
import CategoryForm from "@/components/app/admin/CategoryForm"

const CreateCategory = () => {
    const router = useRouter()

    const handlePost = () => {
        router.push("/admin/categories/all")
    }

    return (
        <CategoryForm
            initialValues={categoryInitialValues}
            validationSchema={categoryValidationSchema}
            onSubmit={handlePost}/>
    )
}

export default CreateCategory
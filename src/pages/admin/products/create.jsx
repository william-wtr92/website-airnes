import {productInitialValues, productValidationSchema} from "@/components/validation/admin/product"
import {useRouter} from "next/router"
import ProductForm from "@/components/app/admin/ProductForm"
import {useCallback, useState} from "react"
import useAppContext from "@/web/hooks/useAppContext"
import axios from "axios"
import routes from "@/web/routes"
export const getServerSideProps = async () => {
    const {data} = await axios.get(
        `http://localhost:3000/api${routes.api.getCategories()}`
    )

    return {
        props: {
            categories: data.result,
        },
    }
}
const CreateProduct = (props) => {
    const {categories} = props


    const [error, setError] = useState(null)

    const router = useRouter()

    const {
        actions: { addProduct },
    } = useAppContext()

    const handlePost = useCallback(
        async (values) => {
            setError(null)

            const [err] = await addProduct(values)

            if (err) {
                setError(err)

                return
            }

            router.push("/admin/products/create")
        }, [addProduct, router]
    )

    return (
        <ProductForm
            initialValues={productInitialValues}
            validationSchema={productValidationSchema}
            onSubmit={handlePost}
            categories={categories}
            error={error}
        />
    )
}

export default CreateProduct
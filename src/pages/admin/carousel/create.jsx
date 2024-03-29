import {
  carouselInitialValues,
  carouselValidationSchema
} from "@/components/validation/admin/carousel"
import {useRouter} from "next/router"
import CarouselForm from "@/components/app/admin/CarouselForm"
import {useCallback, useState} from "react"
import useAppContext from "@/web/hooks/useAppContext"
import {getAuthorization} from "@/web/helper/getAuthorization"

export const getServerSideProps = async (context) => {
  const redirect = getAuthorization("admin", context.req)

  if (redirect) {
    return redirect
  }

  return { props: {} }
}

const CreateCarousel = () => {
  const [error, setError] = useState(null)

  const router = useRouter()

  const {
    actions: { addCarousel }
  } = useAppContext()

  const handlePost = useCallback(
    async (values) => {
      setError(null)

      const [err] = await addCarousel(values)

      if (err) {
        setError(err)

        return
      }

      router.push("/admin/homepage")
    },
    [addCarousel, router]
  )

  return (
    <>
      {error && <p>{error}</p>}
      <CarouselForm
        initialValues={carouselInitialValues}
        validationSchema={carouselValidationSchema}
        onSubmit={handlePost}
      />
    </>
  )
}

export default CreateCarousel

import FooterMenu from "@/components/layouts/FooterMenu"
import Button from "@/components/app/ui/Button"
import FormField from "@/components/utils/FormField"
import {
  contactInitialValues,
  contactValidationSchema,
} from "@/components/validation/validationyup"
import { Form, Formik } from "formik"
import { useRouter } from "next/router"
import { useCallback, useState } from "react"
import useAppContext from "@/web/hooks/useAppContext"


const Contact = () => {
  const {
    actions: { contact },
  } = useAppContext()

  const [error, setError] = useState("")

  const router = useRouter()

  const handlePost = useCallback(
      async (values) => {
        const [error] = await contact(values)

        if (error) {
          setError(error)

          return
        }

        router.push("/")
      },
      [contact, router]
  )

  return (
    <>
      <Formik
        onSubmit={handlePost}
        initialValues={contactInitialValues}
        validationSchema={contactValidationSchema}
        error={error}
      >
        <div className="flex justify-center mt-20 lg:mt-20 ">
          <div className=" w-2/3 lg:w-1/3 p-6 rounded-lg">
            <h1 className="text-center mb-16 text-3xl font-bold hover:text-[#615043] hover:cursor-pointer">
              Nous contacter
            </h1>
            <Form className="flex flex-col">
              <FormField
                type="email"
                name="mail"
                placeholder="Entrez votre e-mail"
                label="E-mail*"
                className=" mb-2"
              />
              <FormField
                type="text"
                name="topic"
                label="Sujet*"
                className=" mb-2"
              />
              <FormField
                type="text"
                name="content"
                placeholder="Entrez votre message"
                rows="4"
                label="Message*"
                className=" mb-8 "
              />
              <Button type="submit">ENVOYER</Button>
            </Form>
          </div>
        </div>
      </Formik>

      <FooterMenu position="absolute" />
    </>
  )
}

export default Contact

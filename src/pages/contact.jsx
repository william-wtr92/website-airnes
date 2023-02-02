import FooterMenu from "@/components/home/FooterMenu"
import Button from "@/components/utils/Button"
import FormField from "@/components/utils/FormField"
import {
  contactInitialValues,
  contactValidationSchema,
} from "@/components/validation/validationyup"
import { Form, Formik } from "formik"
import { useRouter } from "next/router"
import { useCallback } from "react"

const Contact = () => {
  const router = useRouter()

  const handlpost = useCallback(() => {
    router.push("/")
  }, [router])

  return (
    <>
      <Formik
        onSubmit={handlpost}
        initialValues={contactInitialValues}
        validationSchema={contactValidationSchema}
      >
        <div className="flex justify-center mt-20 lg:mt-32 ">
          <div className=" w-2/3 lg:w-1/3 shadow-2xl shadow-[#615043] p-6 rounded-lg">
            <h1 className="text-center mb-16 text-3xl font-bold">
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
                name="sujet"
                label="Sujet*"
                className=" mb-2"
              />
              <FormField
                type="text"
                name="textarea"
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

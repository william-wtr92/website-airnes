import { Form, Formik } from "formik"
import FormField from "@/components/utils/FormField"
import Button from "@/components/app/ui/Button"
import { useRouter } from "next/router"
import { useCallback, useState } from "react"
import { addressValidationSchema } from "@/components/validation/validationyup"
import axios from "axios"
import routes from "@/web/routes"
import useAppContext from "@/web/hooks/useAppContext"
import { val } from "objection"

export const getServerSideProps = async (context) => {
  const { query } = context

  const { data } = await axios.get(
    `http://localhost:3000/api${routes.api.user.address.addressData(
      query.userId,
      query.addressId
    )}`
  )

  if (!data.result) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  return {
    props: {
      data: data,
      userId: query.userId,
      addressId: query.addressId,
    },
  }
}

const EditAddress = (props) => {
  const { data, userId, addressId } = props
  const {
    actions: { patchAddress },
  } = useAppContext()

  const [error, setError] = useState(null)

  const addressInitialVAlue = {
    name: data.result.name,
    lastName: data.result.lastName,
    addressName: data.result.addressName,
    address: data.result.address,
    complete: data.result.complete,
    city: data.result.city,
    postalCode: data.result.postal_code,
  }

  const router = useRouter()

  const handleModify = useCallback(
    async (values) => {
      setError(null)
      console.log(values, userId, addressId)
      const [err] = await patchAddress(values, userId, addressId)

      if (err) {
        setError(err)

        return
      }

      router.push("/user/[userId]/accountsettings")
    },
    [patchAddress, router, userId, addressId]
  )

  return (
    <>
      <Formik
        onSubmit={handleModify}
        initialValues={addressInitialVAlue}
        validationSchema={addressValidationSchema}
        error={error}
      >
        <Form>
          <div className="flex flex-col my-10 items-center ">
            <div className="w-4/5 lg:w-2/5">
              <h1 className="font-bold text-xl my-8 text-center">
                Modification de l'adresse
              </h1>
              <div className="flex flex-col lg:flex-row mb-4  gap-4 lg:gap-12">
                <FormField
                  name="name"
                  placeholder="Michel"
                  label="Prénom"
                  className="lg:w-2/5"
                />
                <FormField
                  name="lastName"
                  placeholder="Michel"
                  label="Nom"
                  className="lg:w-2/5"
                />
              </div>
              <FormField
                name="addressName"
                placeholder="Domicile"
                label="Nom de l'adresse"
                className="w-3/5 mb-4"
              />
              <div className="flex flex-col lg:flex-row mb-4 gap-4 lg:gap-12">
                <FormField
                  name="address"
                  placeholder="01 rue de ..."
                  label="Adresse"
                  className="lg:w-2/5"
                />
                <FormField
                  name="complete"
                  placeholder="bâtiment, rue..."
                  label="Complément d'adresse"
                  className="lg:w-2/5"
                />
              </div>
              <div className="flex flex-col lg:flex-row mb-4 lg:mb-12 gap-4 lg:gap-12">
                <FormField
                  name="postalCode"
                  placeholder="00000"
                  label="Code Postal"
                  className="lg:w-2/5"
                />
                <FormField
                  name="city"
                  placeholder="Paris"
                  label="Ville"
                  className="lg:w-2/5"
                />
              </div>
            </div>
            <Button className="lg:w-1/5">ENREGISTRER</Button>
          </div>
        </Form>
      </Formik>
    </>
  )
}

export default EditAddress

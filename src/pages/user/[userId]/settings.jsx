import Button from "@/components/app/ui/Button"
import FormField from "@/components/utils/FormField"
import { Form, Formik } from "formik"
import { useCallback, useState } from "react"
import {
  ChevronDownIcon,
  ChevronRightIcon,
  TrashIcon,
  PencilIcon,
  PlusIcon,
} from "@heroicons/react/24/solid"
import { NavLink } from "@/components/utils/NavLink"
import classNames from "classnames"
import { accountSettingsValidationSchema } from "@/components/validation/validationyup"
import axios from "axios"
import routes from "@/web/routes"
import useAppContext from "@/web/hooks/useAppContext"

export const getServerSideProps = async (context) => {
  const { query } = context

  const { data } = await axios.get(
    `http://localhost:3000/api${routes.api.user.userData(query.userId)}`
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
      uId: query.userId,
    },
  }
}

const Settings = (props) => {
  const { data, uId } = props
  const {
    actions: { patchUser },
  } = useAppContext()
  const [viewAddressL, setViewAddressL] = useState(false)
  const [error, setError] = useState(null)

  const accountSettingsInitialValues = {
    name: data.result.name,
    email: data.result.email,
  }
  const handleAddL = () => {
    setViewAddressL(!viewAddressL)
  }

  const handleModify = useCallback(
    async (values) => {
      setError(null)
      const [err] = await patchUser(values)

      if (err) {
        setError(err)

        return
      }
    },
    [patchUser]
  )

  return (
    <>
      <div className="flex justify-center mt-8 ">
        <div className=" w-4/5 lg:w-3/5 ">
          <h1 className="text-center  text-3xl font-bold ">Mon Compte</h1>
          <div className="flex flex-col lg:flex-row gap-2 lg:gap-16 mt-4 lg:mt-20">
            <h2 className="text-2xl font-bold">Mes Informations</h2>
            <Formik
              onSubmit={handleModify}
              initialValues={accountSettingsInitialValues}
              validationSchema={accountSettingsValidationSchema}
              error={error}
            >
              <Form className="flex flex-col lg:w-3/5">
                <FormField
                  type="text"
                  name="name"
                  label="Nom complet*"
                  className=" mb-2"
                />
                <FormField
                  type="email"
                  name="email"
                  placeholder="Entrez votre e-mail"
                  label="E-mail*"
                  className=" mb-2"
                />
                <div className="">
                  <NavLink href="#"> Changer de mdp</NavLink>
                </div>
                <Button type="submit" className="w-2/3 ml-8 lg:ml-20 ">
                  MODIFIER
                </Button>
              </Form>
            </Formik>
          </div>
          <div className="flex flex-col lg:flex-row gap-2 lg:gap-16 mt-4 lg:mt-12">
            <h2 className="text-2xl font-bold">Mes adresses</h2>
            <div className="w-4/5">
              <div>
                <span className="flex justify-between">
                  <span onClick={handleAddL} className="flex cursor-pointer">
                    {viewAddressL ? (
                      <ChevronDownIcon className="w-6" />
                    ) : (
                      <ChevronRightIcon className="w-6" />
                    )}
                    Adresse de livraison
                  </span>
                  <span
                    className={classNames(
                      "mr-40",
                      viewAddressL ? "block" : "hidden"
                    )}
                  >
                    <NavLink href="/user/add">
                      <PlusIcon className="w-6 " />
                    </NavLink>
                  </span>
                </span>

                {data.result.alldata.map((data) => (
                  <div
                    key={data.id}
                    className={classNames(
                      "w-4/5 p-1 ml-8 my-1 border border-black rounded-md flex group/item ",
                      viewAddressL ? "block" : "hidden"
                    )}
                  >
                    <div className="flex flex-col ">
                      <span className="font-bold">{data.addressName}:</span>
                      <span className="font-semibold">
                        {data.postal_code}, {data.city}
                      </span>
                      <span>{data.address}</span>
                      <span>Complément d'adresse: {data.complete}</span>
                    </div>
                    <div className="flex flex-col gap-2 ml-auto group/edit invisible  group-hover/item:visible">
                      <NavLink href="#">
                        <TrashIcon className="w-4" />
                      </NavLink>
                      <NavLink href={`/user/${uId}/address/${data.id}/edit`}>
                        <PencilIcon className="w-4" />
                      </NavLink>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Settings

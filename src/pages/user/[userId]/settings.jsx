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
import Comfirm from "@/components/app/ui/Comfirm"
import { useRouter } from "next/router"

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
      userId: query.userId,
    },
  }
}

const Settings = (props) => {
  const { data, userId } = props
  const {
    actions: { patchUser, deleteAddress, deleteUser },
  } = useAppContext()
  const [viewAddressL, setViewAddressL] = useState(false)
  const [comfirmeDelUser, setComfirmeDelUser] = useState(false)
  const [comfirmeDelAddress, setComfirmeDelAddress] = useState(false)

  const [error, setError] = useState(null)
  const router = useRouter()

  const accountSettingsInitialValues = {
    name: data.result.name,
    mail: data.result.mail,
  }
  const handleAddL = () => {
    setViewAddressL(!viewAddressL)
  }

  const handleModify = useCallback(
    async (values) => {
      setError(null)
      const [err] = await patchUser(values, userId)

      if (err) {
        setError(err)

        return
      }
    },
    [patchUser, userId]
  )
  const handledeleteAddress = useCallback(
    async (addressId) => {
      setError(null)
      const [err] = await deleteAddress(userId, addressId)

      if (err) {
        setError(err)

        return
      }

      window.location.reload()
    },
    [deleteAddress, userId]
  )
  const handledeleteUser = useCallback(async () => {
    setError(null)
    const [err] = await deleteUser(userId)

    if (err) {
      setError(err)

      return
    }

    localStorage.clear()
    router.push("/")
  }, [deleteUser, userId, router])

  const handleComfirmAddress = useCallback(async () => {
    setComfirmeDelAddress(true)
  }, [setComfirmeDelAddress])

  const handleComfirmUser = useCallback(async () => {
    setComfirmeDelUser(true)
  }, [setComfirmeDelUser])

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
                  name="mail"
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
                      "w-4/5 p-1 ml-8 my-1  flex group/item ",
                      viewAddressL ? "block" : "hidden"
                    )}
                  >
                    <div className="flex flex-col ">
                      <span className="font-bold">{data.addressName}:</span>
                      <span>{data.address}</span>
                      <span>Complément d'adresse: {data.complete}</span>
                      <span>
                        {data.postal_code}, {data.city}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2 ml-auto group/edit invisible  group-hover/item:visible">
                      <NavLink href={`/user/${userId}/address/${data.id}/edit`}>
                        <PencilIcon className="w-4" />
                      </NavLink>
                      <button
                        key={data.id}
                        className="text-red-600 "
                        onClick={() => handleComfirmAddress()}
                      >
                        <TrashIcon className="w-4" />
                      </button>
                    </div>
                    <Comfirm
                      className={classNames(
                        comfirmeDelAddress ? "block" : "hidden"
                      )}
                      affichage={setComfirmeDelAddress}
                      action={handledeleteAddress}
                      textValue="l'adresse'"
                      params={data.id}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-row-reverse">
            <Button
              variant="suppr"
              className="mt-16"
              onClick={() => handleComfirmUser()}
            >
              Supprimer le compte
            </Button>
            <Comfirm
              className={classNames(comfirmeDelUser ? "block" : "hidden")}
              affichage={setComfirmeDelUser}
              action={handledeleteUser}
              textValue="l'utilisateur connecté"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Settings

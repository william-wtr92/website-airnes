import Button from "@/components/utils/Button"
import FormField from "@/components/utils/FormField"
import { Form, Formik } from "formik"
import { useCallback, useState } from "react"
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/solid"
import { NavLink } from "@/components/utils/NavLink"
import classNames from "classnames"
import { useRouter } from "next/router"
import { accountSettingsValidationSchema } from "@/components/validation/validationyup"

const stateAdd = [
  {
    city: "Paris",
    postal_Code: 99932,
    street: "Rue Totu",
    building_type: "House",
  },
  {
    city: "London",
    postal_Code: 12345,
    street: "Avenue Tofu",
    building_type: "House",
  },
]
const statePay = [
  {
    bank: "MasterCard",
    num: "000 0000 9632",
    name: "Jhon Totu",
    date: "01/29",
  },
]
const AccountSettings = () => {
  const [viewAddressL, setViewAddressL] = useState(false)
  const [viewAddressF, setViewAddressF] = useState(false)

  const handleAddL = () => {
    setViewAddressL((viewAddressL) => !viewAddressL)
  }
  const handleAddF = () => {
    setViewAddressF((viewAddressF) => !viewAddressF)
  }
  const router = useRouter()
  const handlpost = useCallback(() => {
    router.push("/")
  }, [router])

  const initialValues = "" // A recupere avec un req

  return (
    <>
      <div className="flex justify-center mt-8 ">
        <div className=" w-4/5 lg:w-3/5 ">
          <h1 className="text-center  text-3xl font-bold ">Mon Compte</h1>
          <div className="flex flex-col lg:flex-row gap-2 lg:gap-16 mt-4 lg:mt-20">
            <h2 className="text-2xl font-bold">Mes Informations</h2>
            <Formik
              onSubmit={handlpost}
              initialValues={initialValues}
              validationSchema={accountSettingsValidationSchema}
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
            <div>
              <div>
                <span onClick={handleAddL} className="flex cursor-pointer">
                  {viewAddressL ? (
                    <ChevronDownIcon className="w-6" />
                  ) : (
                    <ChevronRightIcon className="w-6" />
                  )}
                  Adresse de livraison
                </span>
                {stateAdd.map((data, i) => (
                  <div
                    key={i}
                    className={classNames(
                      "flex flex-col p-1 ml-8 my-1 border border-black rounded-md",
                      viewAddressL ? "block" : "hidden"
                    )}
                  >
                    <span className="font-semibold">
                      {data.postal_Code}, {data.city}
                    </span>
                    <span>{data.street}</span>
                    <span>type: {data.building_type}</span>
                  </div>
                ))}
              </div>
              <div>
                <span onClick={handleAddF} className="flex cursor-pointer ">
                  {viewAddressF ? (
                    <ChevronDownIcon className="w-6" />
                  ) : (
                    <ChevronRightIcon className="w-6" />
                  )}
                  Adresse de facturation
                </span>
                {stateAdd.map((data, i) => (
                  <div
                    key={i}
                    className={classNames(
                      "flex flex-col p-1 ml-8 my-1 border border-black rounded-md",
                      viewAddressF ? "block" : "hidden"
                    )}
                  >
                    <span className="font-semibold">
                      {data.postal_Code}, {data.city}
                    </span>
                    <span>{data.street}</span>
                    <span>type: {data.building_type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-2 lg:gap-16 mt-4 lg:mt-20">
            <h2 className="text-2xl font-bold">Mes Paiements</h2>
            <div>
              {statePay.map((data, i) => (
                <div key={i} className="flex flex-col">
                  <span className="font-semibold">{data.bank}</span>
                  <span>{data.name}</span>
                  <span>{data.num}</span>
                  <span>{data.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AccountSettings
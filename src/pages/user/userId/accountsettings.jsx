import Button from "@/components/utils/Button"
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
import { useRouter } from "next/router"
import {
  accountSettingsValidationSchema,
  accountSettingsInitialValues,
} from "@/components/validation/validationyup"

const stateAdd = [
  {
    city: "Paris",
    postalCode: 99932,
    street: "Rue Totu",
    buildingType: "House",
  },
  {
    city: "London",
    postalCode: 12345,
    street: "Avenue Tofu",
    buildingType: "House",
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
    setViewAddressL(!viewAddressL)
  }
  const handleAddF = () => {
    setViewAddressF(!viewAddressF)
  }
  const router = useRouter()
  const handlePost = useCallback(() => {
    router.push("/")
  }, [router])

  return (
    <>
      <div className="flex justify-center mt-8 ">
        <div className=" w-4/5 lg:w-3/5 ">
          <h1 className="text-center  text-3xl font-bold ">Mon Compte</h1>
          <div className="flex flex-col lg:flex-row gap-2 lg:gap-16 mt-4 lg:mt-20">
            <h2 className="text-2xl font-bold">Mes Informations</h2>
            <Formik
              onSubmit={handlePost}
              initialValues={accountSettingsInitialValues}
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
                    <NavLink href="/user/userId/address/add">
                      <PlusIcon className="w-6 " />
                    </NavLink>
                  </span>
                </span>

                {stateAdd.map((data, i) => (
                  <div
                    key={i}
                    className={classNames(
                      "w-4/5 p-1 ml-8 my-1 border border-black rounded-md flex group/item ",
                      viewAddressL ? "block" : "hidden"
                    )}
                  >
                    <div className="flex flex-col ">
                      <span className="font-semibold">
                        {data.postalCode}, {data.city}
                      </span>
                      <span>{data.street}</span>
                      <span>Complément d'adresse: {data.buildingType}</span>
                    </div>
                    <div className="flex flex-col gap-2 ml-auto group/edit invisible  group-hover/item:visible">
                      <NavLink href="#">
                        <TrashIcon className="w-4" />
                      </NavLink>
                      <NavLink href="/user/userId/address/addressid/edit">
                        <PencilIcon className="w-4" />
                      </NavLink>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <span className="flex justify-between">
                  <span onClick={handleAddF} className="flex cursor-pointer">
                    {viewAddressF ? (
                      <ChevronDownIcon className="w-6" />
                    ) : (
                      <ChevronRightIcon className="w-6" />
                    )}
                    Adresse de facturation
                  </span>
                  <span
                    className={classNames(
                      "mr-40",
                      viewAddressF ? "block" : "hidden"
                    )}
                  >
                    <NavLink href="/user/userId/payment/add">
                      <PlusIcon className="w-6" />
                    </NavLink>
                  </span>
                </span>
                {stateAdd.map((data, i) => (
                  <div
                    key={i}
                    className={classNames(
                      "w-4/5 p-1 ml-8 my-1 border border-black rounded-md flex group/item",
                      viewAddressF ? "block" : "hidden"
                    )}
                  >
                    <div className="flex flex-col ">
                      <span className="font-semibold">
                        {data.postalCode}, {data.city}
                      </span>
                      <span>{data.street}</span>
                      <span>Complément d'adresse: {data.buildingType}</span>
                    </div>
                    <div className="flex flex-col ml-auto group/edit invisible  group-hover/item:visible">
                      <NavLink href="#">
                        <TrashIcon className="w-4" />
                      </NavLink>
                      <NavLink href="/user/userId/address/addressid/edit">
                        <PencilIcon className="w-4" />
                      </NavLink>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-2 lg:gap-16 mt-4 lg:mt-20">
            <h2 className="text-2xl font-bold">Mes Paiements</h2>
            <div className="flex flex-col gap-3">
              <NavLink href="/user/userId/payment/add">
                <PlusIcon className="w-6" />
              </NavLink>
              <div>
                {statePay.map((data, i) => (
                  <div key={i} className="flex group/item ml-4 lg:ml-0">
                    <div className="flex flex-col">
                      <span className="font-semibold">{data.bank}</span>
                      <span>{data.name}</span>
                      <span>{data.num}</span>
                      <span>{data.date}</span>
                    </div>
                    <div className="flex flex-col gap-2 group/edit invisible  group-hover/item:visible">
                      <NavLink href="#">
                        <TrashIcon className="w-4" />
                      </NavLink>
                      <NavLink href="/user/userId/payment/paymentid/edit">
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

export default AccountSettings

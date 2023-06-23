import * as yup from "yup"
import { Form, Formik } from "formik"
import FormField from "@/components/utils/FormField"
import Button from "@/components/app/ui/Button"
import React, { useCallback, useEffect, useState } from "react"
import { getAuthorization } from "@/web/helper/getAuthorization"
import getApi from "@/web/getAPI"
import getAddressServices from "@/web/services/cart/getAddress"
import Popup from "@/components/utils/Popup"
import classNames from "classnames"
import AddAddressForm from "@/components/app/content/AddAddress"
import { useRouter } from "next/router"
import useAppContext from "@/web/hooks/useAppContext"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"

export const getServerSideProps = async (context) => {
  const { req, query, locale } = context

  const redirect = getAuthorization("user", req, query)

  if (redirect) {
    return redirect
  }

  const api = getApi(context)

  const getAddress = getAddressServices({ api })
  const [err, data] = await getAddress(query.userId)

  if (err) {
    return {
      redirect: {
        destination: "/",
      },
    }
  }

  return {
    props: {
      data: data.data,
      userId: query.userId,
      ...(await serverSideTranslations(locale, [
        "paycheck",
        "address_form",
        "navbar",
        "footer",
      ])),
    },
  }
}

const defaultValidationSchema = yup.object().shape({
  id: yup.string().required(),
  lastName: yup.string().required().label("Prénom"),
  name: yup.string().required().label("Nom"),
  address: yup.string().required().label("Adresse"),
  complete: yup.string().label("Complément d'adresse"),
  city: yup.string().required().label("Ville"),
})

const defaultInitialValues = {
  id: "",
  lastName: "",
  name: "",
  address: "",
  complete: "",
  postal_code: "",
  city: "",
}

const Checkout = (props) => {
  const [formValues, setFormValues] = useState(defaultInitialValues)

  const {
    data,
    userId,
    initialValues = formValues,
    validationSchema = defaultValidationSchema,
  } = props

  const [addressData, settAddressData] = useState(data)
  const [selectedId, setSelectedId] = useState(0)
  const [popupDisplay, setPopupDisplay] = useState(false)

  const {
    actions: { getAddress },
  } = useAppContext()

  const router = useRouter()

  const getCardId = (event) => {
    setSelectedId(event.target.options[event.target.selectedIndex].id)
  }

  useEffect(() => {
    const chosen = selectedId
      ? addressData.find(({ id }) => id == selectedId)
      : defaultInitialValues

    setFormValues((prevValues) => ({
      ...prevValues,
      id: chosen.id,
      lastName: chosen.lastName,
      name: chosen.name,
      address: chosen.address,
      complete: chosen.complete,
      postal_code: chosen.postal_code,
      city: chosen.city,
    }))
  }, [data, selectedId, addressData])

  const handleTrue = () => {
    setPopupDisplay(true)
  }
  const refreshData = useCallback(async () => {
    const [err, newData] = await getAddress(userId)

    if (err) {
      router.push("/user/cart")
    }

    settAddressData(newData.data)
  }, [settAddressData, userId, getAddress, router])

  const handleSelect = useCallback(
    async (values) => {
      router.push({
        pathname: "/payment/payment",
        query: { data: values.id },
      })
    },
    [router]
  )

  const { t } = useTranslation(["paycheck", "address_form"])

  return (
    <>
      <Formik
        enableReinitialize
        onSubmit={handleSelect}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <div>
          <Form>
            <div className="flex flex-col items-center mt-10 gap-y-5">
              <h1 className="font-bold text-xl">{t("delivery")}</h1>
              <div className="flex flex-col flex-wrap md:flex-row w-4/5 lg:w-1/2 gap-y-5">
                <div className="basis-full md:basis-4/5 flex">
                  <label htmlFor="addresses"></label>
                  <select
                    id="addresses"
                    onChange={getCardId}
                    className="bg-white border-2 border-gray-400 rounded-lg block w-full px-5 py-2"
                  >
                    <option defaultChecked>{t("choice")}</option>
                    {addressData.map((address) => (
                      <option
                        value={address.addressName}
                        id={address.id}
                        key={address.id}
                      >
                        {address.addressName}
                      </option>
                    ))}
                  </select>
                  <Button
                    type="button"
                    onClick={handleTrue}
                    className="md:ml-16 md:basis-1/12 h-fit "
                  >
                    +
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-5 w-full">
                  <FormField
                    name="name"
                    placeholder={t(`firstnamePlaceholder`, { ns: "address_form" })}
                    label={t(`firstnameLabel`, { ns: "address_form" })}
                    readOnly
                  />
                  <FormField
                    name="lastName"
                    placeholder={t(`lastnamePlaceholder`, { ns: "address_form" })}
                    label={t(`lastnameLabel`, { ns: "address_form" })}
                    readOnly
                  />
                  <FormField
                    name="address"
                    placeholder={t(`addressFullPlaceholder`, { ns: "address_form" })}
                    label={t(`addressFullLabel`, { ns: "address_form" })}
                    className="md:col-span-2"
                    readOnly
                  />
                  <FormField
                    name="complete"
                    placeholder={t(`addressComplementPlaceholder`, { ns: "address_form" })}
                    label={t(`addressComplementLabel`, { ns: "address_form" })}
                    readOnly
                  />
                  <FormField
                    name="postal_code"
                    placeholder={t(`postalPlaceholder`, { ns: "address_form" })}
                    label={t(`postalLabel`, { ns: "address_form" })}
                    className="md:col-start-1"
                    readOnly
                  />
                  <FormField
                    name="city"
                    placeholder={t(`cityPlaceholder`, { ns: "address_form" })}
                    label={t(`cityLabel`, { ns: "address_form" })}
                    readOnly
                  />
                </div>
              </div>
              <Button type="submit">{t("next")}</Button>
            </div>
          </Form>
        </div>
      </Formik>
      <Popup
        className={classNames(popupDisplay ? "block" : "hidden")}
        display={setPopupDisplay}
      >
        <div className="p-5">
          <AddAddressForm
            setDisplay={setPopupDisplay}
            refreshData={refreshData}
          />
        </div>

      </Popup>
    </>
  )
}

export default Checkout

import { useRouter } from "next/router"
import { useCallback, useState } from "react"
import useAppContext from "@/web/hooks/useAppContext"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import getApi from "@/web/getAPI"
import { getAuthorization } from "@/web/helper/getAuthorization"
import addressDataServices from "@/web/services/user/address/addressData"
import AddressForm from "@/components/app/user/AddressForm"

export const getServerSideProps = async (context) => {
  const { req, query, locale } = context

  const redirect = getAuthorization("user", req, query)

  if (redirect) {
    return redirect
  }

  const api = getApi(context)

  const addressData = addressDataServices({ api })
  const [err, data] = await addressData(query.userId, query.addressId)

  if (err) {
    return {
      redirect: {
        destination: "/"
      }
    }
  }

  const translations = await serverSideTranslations(locale, [
    "address_form",
    "navbar",
    "footer"
  ])

  if (!data.result) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    }
  }

  return {
    props: {
      data: data,
      userId: query.userId,
      addressId: query.addressId,
      ...translations
    }
  }
}

const EditAddress = (props) => {
  const { data, userId, addressId } = props

  const {
    actions: { patchAddress }
  } = useAppContext()

  const [error, setError] = useState(null)

  const addressInitialValues = {
    name: data.result.name,
    lastName: data.result.lastName,
    addressName: data.result.addressName,
    address: data.result.address,
    complete: data.result.complete,
    city: data.result.city,
    postal_code: data.result.postal_code
  }

  const router = useRouter()

  const handleModify = useCallback(
    async (values) => {
      setError(null)
      const [err] = await patchAddress(values, userId, addressId)

      if (err) {
        setError(err)

        return
      }

      router.push(`/user/${userId}/settings`)
    },
    [patchAddress, router, userId, addressId]
  )

  const { t } = useTranslation("address_form")

  return (
    <div className="flex flex-col gap-10 py-5">
      <h1 className="text-center text-2xl font-bold text-primary">
        {t("editText")}
      </h1>
      <AddressForm
        onSubmit={handleModify}
        initialValues={addressInitialValues}
        error={error}
      />
    </div>
  )
}

export default EditAddress

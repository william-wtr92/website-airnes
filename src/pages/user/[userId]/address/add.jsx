import { getAuthorization } from "@/web/helper/getAuthorization"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import AddressForm from "@/components/app/user/AddressForm"
import { addressInitialValues } from "@/components/validation/address"
import { useCallback, useState } from "react"
import useAppContext from "@/web/hooks/useAppContext"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"

export const getServerSideProps = async (context) => {
  const { req, query, locale } = context

  const redirect = getAuthorization("user", req, query)

  if (redirect) {
    return redirect
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "address_form",
        "navbar",
        "footer"
      ]))
    }
  }
}

const AddAddress = () => {
  const {
    actions: { addAddress },
    state: { session }
  } = useAppContext()

  const { t } = useTranslation(`address_form`)

  const router = useRouter()
  const [error, setError] = useState(null)

  const handleSelect = useCallback(
    async (values) => {
      setError(null)
      const [err] = await addAddress(values)

      if (err) {
        setError(err)

        return
      }

      router.push(`/user/${session.user.id}/settings`)
    },
    [addAddress, router, session]
  )

  return (
    <div className="flex flex-col gap-10 py-5">
      <h1 className="text-center text-2xl font-bold text-primary">
        {t(`addText`)}
      </h1>
      <AddressForm
        onSubmit={handleSelect}
        initialValues={addressInitialValues}
        error={error}
      />
    </div>
  )
}

export default AddAddress

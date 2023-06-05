import AddAddressForm from "@/components/app/content/AddAddress"
import { getAuthorization } from "@/web/helper/getAuthorization"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

export const getServerSideProps = async (context) => {
  const { req, query, locale } = context

  const redirect = getAuthorization("user", req, query)

  if (redirect) {
    return redirect
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "addaddress",
        "navbar",
        "footer",
      ])),
    },
  }
}

const AddAddress = () => {
  return (
    <>
      <AddAddressForm redirect="true" />
    </>
  )
}

export default AddAddress

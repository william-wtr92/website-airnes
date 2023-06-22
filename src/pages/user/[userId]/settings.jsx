import Button from "@/components/app/ui/Button"
import { useCallback, useState } from "react"
import {
  ChevronDownIcon,
  ChevronRightIcon,
  TrashIcon,
  PencilIcon,
  PlusIcon
} from "@heroicons/react/24/solid"
import { NavLink } from "@/components/utils/NavLink"
import classNames from "classnames"
import useAppContext from "@/web/hooks/useAppContext"
import Confirm from "@/components/app/ui/Confirm"
import { useRouter } from "next/router"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"
import getApi from "@/web/getAPI"
import { getAuthorization } from "@/web/helper/getAuthorization"
import userDataServices from "@/web/services/user/userData"
import UserForm from "@/components/app/user/UserForm"

export const getServerSideProps = async (context) => {
  const { req, query, locale } = context

  const redirect = getAuthorization("user", req, query)

  if (redirect) {
    return redirect
  }

  const api = getApi(context)

  const userData = userDataServices({ api })
  const [err, data] = await userData(query.userId)

  if (err) {
    return {
      redirect: {
        destination: "/"
      }
    }
  }

  return {
    props: {
      data: data,
      userId: query.userId,
      ...(await serverSideTranslations(locale, [
        "settingsAccount",
        "navbar",
        "footer"
      ]))
    }
  }
}

const Settings = (props) => {
  const { data, userId } = props

  const {
    actions: { patchUser, deleteAddress, deleteUser, logout }
  } = useAppContext()

  const [viewAddressL, setViewAddressL] = useState(false)
  const [confirmDelUser, setConfirmDelUser] = useState(false)
  const [confirmDelAddress, setConfirmDelAddress] = useState(false)

  const [error, setError] = useState(null)
  const router = useRouter()

  const accountSettingsInitialValues = {
    name: data.result.name,
    mail: data.result.mail
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
  const handleDeleteAddress = useCallback(
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
  const handleDeleteUser = useCallback(
    async () => {
      setError(null)
      const [err] = await deleteUser(userId)

      if (err) {
        setError(err)

        return
      }

      localStorage.clear()
      logout()
      router.push("/")
    }, [deleteUser, userId, router, logout])

  const handleConfirmAddress = useCallback(async () => {
    setConfirmDelAddress(true)
  }, [setConfirmDelAddress])

  const handleConfirmUser = useCallback(async () => {
    setConfirmDelUser(true)
  }, [setConfirmDelUser])

  const { t } = useTranslation("settingsAccount")

  return (
    <div className="flex justify-center my-5">
      <div className="w-4/5 lg:w-3/5 flex flex-col gap-10">
        <h1 className="text-center text-3xl font-bold uppercase">
          {t(`myAccount`)}
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
          <h2 className="text-xl font-bold">{t(`myInfo`)}</h2>
          <div className="lg:col-span-2">
            <UserForm
              onSubmit={handleModify}
              initialValues={accountSettingsInitialValues}
              error={error}
            >
            </UserForm>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3">
          <h2 className="text-xl font-bold whitespace-nowrap">
            {t(`address`)}
          </h2>
          <div className="lg:col-span-2">
            <div>
                <span className="flex justify-between">
                  <span onClick={handleAddL} className="flex cursor-pointer">
                    {viewAddressL ? <ChevronDownIcon className="w-6"/> : <ChevronRightIcon className="w-6"/>}
                    {t(`orderAddress`)}
                  </span>
                  <div
                    className={classNames(viewAddressL ? "block" : "hidden", "px-10")}
                  >
                    <NavLink href={`/user/${userId}/address/add`}>
                      <PlusIcon className="w-6"/>
                    </NavLink>
                  </div>
                </span>
              {data.result.allData.map((data) => (
                <div
                  key={data.id}
                  className={classNames(
                    "flex group/item m-3 bg-gray-100 rounded-lg px-8 py-4",
                    viewAddressL ? "block" : "hidden"
                  )}
                >
                  <div className="flex flex-col gap-2 w-full">
                    <span className="font-bold">{data.addressName}:</span>
                    <span>{data.address}</span>
                    <span>
                        {data.complete}
                      </span>
                    <span>
                        {data.postal_code}, {data.city}
                      </span>
                  </div>
                  <div className="flex flex-col gap-2 ml-auto group/edit lg:invisible group-hover/item:visible">
                    <NavLink href={`/user/${userId}/address/${data.id}/edit`}>
                      <PencilIcon className="w-5 h-5"/>
                    </NavLink>
                    <button
                      key={data.id}
                      className="text-red-600"
                      onClick={() => handleConfirmAddress()}
                    >
                      <TrashIcon className="w-5 h-5"/>
                    </button>
                  </div>
                  <Confirm
                    className={classNames(
                      confirmDelAddress ? "block" : "hidden"
                    )}
                    show={setConfirmDelAddress}
                    action={handleDeleteAddress}
                    textValue={t(`confirmAddress`)}
                    params={data.id}
                    display={setConfirmDelAddress}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            variant="danger"
            onClick={() => handleConfirmUser()}
          >
            {t(`dltAccount`)}
          </Button>
          <Confirm
            className={classNames(confirmDelUser ? "block" : "hidden")}
            display={setConfirmDelUser}
            action={handleDeleteUser}
            textValue={t(`confirmDeleteAccount`)}
          />
        </div>
      </div>
    </div>
  )
}

export default Settings

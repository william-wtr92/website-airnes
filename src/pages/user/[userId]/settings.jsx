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
import useAppContext from "@/web/hooks/useAppContext"
import Confirm from "@/components/app/ui/Confirm"
import { useRouter } from "next/router"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"
import getApi from "@/web/getAPI"
import { getAuthorization } from "@/web/helper/getAuthorization"
import userDataServices from "@/web/services/user/userData"

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
        destination: "/",
      },
    }
  }

  return {
    props: {
      data: data,
      userId: query.userId,
      ...(await serverSideTranslations(locale, [
        "settingsAccount",
        "navbar",
        "footer",
      ])),
    },
  }
}

const Settings = (props) => {
  const { data, userId } = props
  const {
    actions: { patchUser, deleteAddress, deleteUser, logout },
  } = useAppContext()
  const [viewAddressL, setViewAddressL] = useState(false)
  const [confirmDelUser, setConfirmDelUser] = useState(false)
  const [confirmDelAddress, setConfirmDelAddress] = useState(false)

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
  const handleDeleteUser = useCallback(async () => {
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
    <>
      <div className="flex justify-center mt-8 ">
        <div className=" w-4/5 lg:w-3/5 ">
          <h1 className="text-center  text-3xl font-bold ">{t(`myAccount`)}</h1>
          <div className="flex flex-col lg:flex-row gap-2 lg:gap-16 mt-4 lg:mt-20">
            <h2 className="text-2xl font-bold">{t(`myInfo`)}</h2>
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
                  placeholder={t(`placeholderName`)}
                  label={t(`labelName`)}
                  className=" mb-2"
                />
                <FormField
                  type="email"
                  name="mail"
                  placeholder={t(`placeholderEmail`)}
                  label={t(`labelEmail`)}
                  className=" mb-2"
                />
                <div className="">
                  <NavLink href="#">{t(`changePwd`)}</NavLink>
                </div>
                <Button type="submit" className="w-2/3 ml-8 lg:ml-20 ">
                  {t(`btnModify`)}
                </Button>
              </Form>
            </Formik>
          </div>
          <div className="flex flex-col lg:flex-row gap-2 lg:gap-16 mt-4 lg:mt-12">
            <h2 className="text-2xl font-bold whitespace-nowrap">
              {t(`address`)}
            </h2>
            <div className="w-4/5">
              <div>
                <span className="flex justify-between">
                  <span onClick={handleAddL} className="flex cursor-pointer">
                    {viewAddressL ? (
                      <ChevronDownIcon className="w-6" />
                    ) : (
                      <ChevronRightIcon className="w-6" />
                    )}
                    {t(`orderAddress`)}
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

                {data.result.allData.map((data) => (
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
                      <span>
                        {t(`addressCp`)} {data.complete}
                      </span>
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
                        onClick={() => handleConfirmAddress()}
                      >
                        <TrashIcon className="w-4" />
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
          <div className="flex flex-row-reverse">
            <Button
              variant="danger"
              className="mt-16"
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
    </>
  )
}

export default Settings

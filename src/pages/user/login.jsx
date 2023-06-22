import { redirectToHomeIfLoggedIn } from "@/web/helper/getServerSidePropsLog"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Image from "next/image"
import LoginForm from "@/components/app/content/LoginForm"
import { useTranslation } from "next-i18next"

export const getServerSideProps = async (context) => {
  const { locale } = context

  const redirectToHomeIfLoggedInResult = await redirectToHomeIfLoggedIn(context)

  if (redirectToHomeIfLoggedInResult) {
    return redirectToHomeIfLoggedInResult
  }

  const translations = await serverSideTranslations(locale, [
    "login",
    "navbar",
    "footer",
  ])

  return {
    props: {
      ...translations,
    },
  }
}

const Login = () => {
  const { t } = useTranslation("login")

  return (
    <>
      <div className="flex justify-center gap-6">
        <div className="hidden lg:block h-screen">
          <Image
            src="https://airnes.blob.core.windows.net/airnes/login3.jpg?sp=r&st=2023-05-28T10:08:49Z&se=2023-11-15T19:08:49Z&sv=2022-11-02&sr=b&sig=x%2Fk%2BxhFVq7v7z8Feh6f4c%2B9WpaFM9sSuU8z4UVONhww%3D"
            alt="meuble"
            width={1000}
            height={500}
            className="object-cover w-full h-full"
          />
        </div>
        <div>
          <div className="flex justify-center mt-14 lg:mt-[20%]">
            <h1 className="font-bold text-2xl hover:cursor-pointer hover:text-[#615043] lg:text-2xl">
              {t(`loginText`)}
            </h1>
          </div>
          <LoginForm />
        </div>
      </div>
    </>
  )
}

export default Login

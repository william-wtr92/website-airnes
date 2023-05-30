import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

export const getServerSideProps = async (context) => {
  const { locale } = context

  const translations = await serverSideTranslations(locale, [
    "cgu",
    "navbar",
    "footer",
  ])

  return {
    props: {
      ...translations,
    },
  }
}

const CguPage = () => {
  const { t } = useTranslation("cgu")

  return (
    <div>
      <h1 className="flex justify-center my-20 font-bold lg:text-2xl">
        {t(`main`)}
      </h1>

      <div className="mx-4 flex flex-col justify-center gap-5 lg:mx-20">
        <div>
          <h2 className="mb-6 font-bold">{t(`title1`)}</h2>
          <p>{t(`p1`)}</p>
        </div>

        <div>
          <h2 className="mb-6 font-bold">{t(`title2`)}</h2>
          <p>{t(`p2`)}</p>
        </div>

        <div>
          <h2 className="mb-6 font-bold">{t(`title3`)}</h2>
          <p>{t(`p3`)}</p>
        </div>

        <div>
          <h2 className="mb-6 font-bold">{t(`title4`)}</h2>
          <p>{t(`p4`)}</p>
        </div>

        <div>
          <h2 className="mb-6 font-bold">{t(`title5`)}</h2>
          <p>{t(`p5`)}</p>
        </div>

        <div>
          <h2 className="mb-6 font-bold">{t(`title6`)}</h2>
          <p>{t(`p6`)}</p>
        </div>

        <div>
          <h2 className="mb-6 font-bold">{t(`title7`)}</h2>
          <p>{t(`p7`)}</p>
        </div>

        <div>
          <h2 className="mb-6 font-bold">{t(`title8`)}</h2>
          <p>{t(`p8`)}</p>
        </div>

        <div>
          <h2 className="mb-6 font-bold">{t(`title9`)}</h2>
          <p>{t(`p9`)}</p>
        </div>

        <div>
          <h2 className="mb-6 font-bold">{t(`title10`)}</h2>
          <p>{t(`p10`)}</p>
        </div>

        <div>
          <h2 className="mb-6 font-bold">{t(`title11`)}</h2>
          <p>
            {t(`p11-1`)} <span className="font-bold">{t(`p11-mail`)}</span>{" "}
            {t(`p11-2`)}
          </p>
        </div>

        <div>
          <h2 className="mb-6 font-bold">{t(`title12`)}</h2>
          <p>{t(`p12`)}</p>
        </div>

        <div>
          <h2 className="mb-6 font-bold">{t(`title13`)}</h2>
          <p>{t(`p13`)}</p>
        </div>

        <div>
          <h2 className="mb-6 font-bold">{t(`title14`)}</h2>
          <p>{t(`p14`)}</p>
        </div>

        <div className="my-14">
          <p className="font-bold">{t(`end`)}</p>
        </div>
      </div>
    </div>
  )
}

export default CguPage

import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

export const getServerSideProps = async (context) => {
  const { locale } = context

  const translations = await serverSideTranslations(locale, [
    "legal",
    "navbar",
    "footer",
  ])

  return {
    props: {
      ...translations,
    },
  }
}

const LegalPage = () => {
  const { t } = useTranslation("legal")

  return (
    <div>
      <h1 className="flex justify-center my-20 font-bold lg:text-2xl">
        {t(`main`)}
      </h1>
      <div className="mx-4 flex flex-col justify-center gap-5 lg:mx-20">
        <div>
          <p>
            {t(`p1`)} <span className="font-bold">{t(`p1-1`)}</span>
          </p>
        </div>
        <div>
          <p>
            {t(`p2`)}{" "}
            <a className="font-bold" href="mailto:airnes@contact.com">
              {t(`p2-1`)}
            </a>
          </p>
          <p>
            {t(`p3`)} <span className="font-bold">{t(`p3-1`)}</span>
          </p>
        </div>
        <div>
          <h2 className="font-bold mb-4">{t(`title4`)}</h2>
          <p>{t(`p4`)}</p>
        </div>
        <div>
          <h2 className="font-bold mb-4">{t(`title5`)}</h2>
          <p>
            {t(`p5`)} <span className="font-bold mb-4">{t(`p5-1`)}</span>
          </p>
        </div>
        <div>
          <h2 className="font-bold mb-4">{t(`title6`)}</h2>
          <p>{t(`p6`)}</p>
        </div>
        <div className="mb-20">
          <h2 className="font-bold mb-4">{t(`title7`)}</h2>
          <p>{t(`p7`)}</p>
        </div>
      </div>
    </div>
  )
}

export default LegalPage

import { accountSettingsValidationSchema } from "@/components/validation/validationyup"
import { Form, Formik } from "formik"
import FormField from "@/components/utils/FormField"
import { NavLink } from "@/components/utils/NavLink"
import Button from "@/components/app/ui/Button"
import { useTranslation } from "next-i18next"

const UserForm = (props) => {
  const { onSubmit, initialValues, error, userId } = props

  const { t } = useTranslation("settingsAccount")

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={accountSettingsValidationSchema}
      error={error}
    >
      <Form className="flex flex-col gap-2 lg:w-3/5">
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
        <div className="my-4">
          <NavLink href={`/user/${userId}/change_password`}>
            <Button className="py-2">{t(`changePwd`)}</Button>
          </NavLink>
        </div>
        <Button type="submit">{t(`btnModify`)}</Button>
      </Form>
    </Formik>
  )
}

export default UserForm

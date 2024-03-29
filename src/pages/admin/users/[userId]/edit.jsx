import { useRouter } from "next/router"
import useAppContext from "@/web/hooks/useAppContext"
import { useCallback, useState } from "react"
import Return from "@/components/app/ui/Return"
import { Field, Form, Formik } from "formik"
import Button from "@/components/app/ui/Button"
import * as yup from "yup"
import getApi from "@/web/getAPI"
import { getAuthorization } from "@/web/helper/getAuthorization"
import UserDataServices from "@/web/services/admin/users/userData"
import AdminErrorMessage from "@/components/utils/AdminErrorMessage"
import FormField from "@/components/utils/FormField"

export const getServerSideProps = async (context) => {
  const redirect = getAuthorization("admin", context.req)

  if (redirect) {
    return redirect
  }

  const { userId } = context.params

  const api = getApi(context)

  const UserData = UserDataServices({ api })
  const [err, data] = await UserData(userId)

  if (err) {
    return {
      props: {
        errorMessage: err,
      },
    }
  }

  return {
    props: {
      userId,
      user: data.result,
      role: data.role,
    },
  }
}

export const userAdminValidationschema = yup.object().shape({
  roleId: yup.number(),
  name: yup.string().required(),
  mail: yup.string().email().required(),
})

const EditUser = (props) => {
  const { user, role, userId, errorMessage } = props

  const initialValues = user
  const [error, setError] = useState(null)

  const router = useRouter()

  const {
    actions: { patchRole },
  } = useAppContext()

  const defaultRole = role.find(({ id }) => id === initialValues.roleid)

  const filteredRole = role.filter((item) => item.id !== initialValues.roleid)

  const handlePost = useCallback(
    async (values) => {
      setError(null)

      const [err] = await patchRole({ userId, roleid: values.roleId, values })

      if (err) {
        setError(err)

        return
      }

      router.push("/admin/users/all")
    },
    [router, patchRole, userId]
  )

  return (
    <>
      {errorMessage ? (
        <AdminErrorMessage errorMessage={errorMessage} />
      ) : (
        <div className="p-10 flex flex-col gap-10 absolute top-10 left-0 z-0 lg:top-0 lg:left-64">
          <Return name="users" back={"/admin/users/all"} />
          <Formik
            initialValues={initialValues}
            validationSchema={userAdminValidationschema}
            onSubmit={handlePost}
            error={error}
          >
            <Form className="flex flex-col gap-5">
              <FormField
                type="text"
                name="mail"
                placeholder="Mail"
                label="Mail"
              />
              <FormField
                type="text"
                name="name"
                placeholder="Name"
                label="Name"
              />
              <span className="text-md font-semibold">Role</span>
              <Field
                as="select"
                name="roleId"
                className="flex border-2 rounded-md border-gray-400 py-1 cursor-pointer"
              >
                <option
                  value={initialValues.roleid}
                  id={initialValues.roleid}
                  key={initialValues.roleid}
                >
                  {defaultRole.right}
                </option>

                {filteredRole.map((role) => (
                  <option value={role.id} id={role.id} key={role.id}>
                    {role.right}
                  </option>
                ))}
              </Field>
              <Button type="submit" className="mt-10">
                Save
              </Button>
            </Form>
          </Formik>
        </div>
      )}
    </>
  )
}

export default EditUser

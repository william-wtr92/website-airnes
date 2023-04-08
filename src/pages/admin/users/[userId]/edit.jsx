import axios from "axios"
import routes from "@/web/routes"
import { useRouter } from "next/router"
import useAppContext from "@/web/hooks/useAppContext"
import { useCallback, useState } from "react"
import Return from "@/components/app/ui/Return"
import { Field, Form, Formik } from "formik"
import Button from "@/components/app/ui/Button"
import * as yup from "yup"

export const getServerSideProps = async (context) => {
  const { userId } = context.params

  const { data } = await axios.get(
    `http://localhost:3000${routes.api.userData(userId)}`
  )

  if (!data.result) {
    return {
      redirect: {
        destination: "/admin/users/all",
        permanent: false,
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
  roleId: yup.number().required(),
})

const EditCategory = (props) => {
  const { user, role, userId } = props

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

      const [err] = await patchRole({ userId, roleid: values.roleId })

      if (err) {
        setError(err)

        return
      }

      router.push("/admin/users/all")
    },
    [router, patchRole, userId]
  )

  return (
    <div className="p-10 flex flex-col gap-10 absolute top-10 left-0 z-0 lg:top-0 lg:left-64">
      <Return name="users" back={"/admin/users/all"} />
      <Formik
        initialValues={initialValues}
        validationSchema={userAdminValidationschema}
        onSubmit={handlePost}
        error={error}
      >
        <Form className="flex flex-col gap-5">
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
          <Button type="submit" className="mt-10 bg-white">
            Save
          </Button>
        </Form>
      </Formik>
    </div>
  )
}

export default EditCategory

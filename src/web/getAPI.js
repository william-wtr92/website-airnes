import createAPIClient from "@/web/createAPIClient"
import config from "@/api/config"

const getApi = (context) => createAPIClient({
  jwt: context.req.cookies.session,
  baseURL: config.baseURL,
})

export default getApi
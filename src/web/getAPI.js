import createAPIClient from "@/web/createAPIClient"
import config from "@/api/config"

const getApi = (context) => createAPIClient({
  jwt: context.req.headers.cookie,
  baseURL: config.baseURL,
})

export default getApi
import config from "@/web/config.js"
import axios from "axios"

const createAPIClient = () =>
  axios.create({
    baseURL: config.api.baseURL,
  })

export default createAPIClient

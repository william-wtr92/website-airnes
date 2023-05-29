import axios from "axios"

const createAPIClient = ({ jwt, baseURL }) =>
  axios.create({
    baseURL,
    headers: {
      Authorization: `${jwt}`,
    },
  })

export default createAPIClient

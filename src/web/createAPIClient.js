import axios from "axios"

const createAPIClient = ({ baseURL, jwt }) =>
  axios.create({
    baseURL,
    headers: {
      Authorization: `${jwt}`,
    },
  })

export default createAPIClient

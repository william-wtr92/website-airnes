import axios from "axios"

const createAPIClient = ({ baseURL, jwt }) =>
  axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })

export default createAPIClient

const parseSession = (jwt) =>
  jwt ? JSON.parse(atob(jwt.split(".")[1])).payload : null

export default parseSession

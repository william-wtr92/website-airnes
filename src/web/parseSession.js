const parseSession = (jwt) => JSON.parse(atob(jwt.split(".")[1])).payload

export default parseSession

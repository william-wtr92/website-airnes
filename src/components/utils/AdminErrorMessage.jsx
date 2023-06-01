const AdminErrorMessage = (props) => {
  const { errorMessage } = props

  return (
    <div className="p-5 m-5 bg-red-400 rounded">
      <p className="text-white">{errorMessage}</p>
    </div>
  )
}

export default AdminErrorMessage

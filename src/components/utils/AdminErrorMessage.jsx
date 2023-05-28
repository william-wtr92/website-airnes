const AdminErrorMessage = (props) => {
  const { errorMessage } = props

  return (
    <div className="absolute top-[5%] left-[30%]">
      <p className=" text-red-600">Message d'erreur :{errorMessage}</p>
    </div>
  )
}

export default AdminErrorMessage

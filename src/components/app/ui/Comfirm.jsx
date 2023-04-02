import classNames from "classnames"
import Button from "./Button"

const Comfirm = (props) => {
  const { className, affichage, action, params, textValue } = props

  const handleYes = () => {
    affichage(false)

    if (params) {
      action(params)
    } else {
      action()
    }
  }

  const handleFalse = () => {
    affichage(false)
  }

  return (
    <div
      className={classNames(
        "w-1/5 h-1/5  top-[40%] left-[40%] bg-white border border-black bord rounded-md absolute",
        className
      )}
    >
      <div className="p-2 h-full flex flex-col justify-around">
        <h1>Voulez-vous vraiment supprimer {textValue}?</h1>
        <div className="flex justify-around">
          <Button variant="reverse" className="w-2/5" onClick={handleFalse}>
            Non
          </Button>
          <Button className="w-2/5" onClick={handleYes}>
            Oui
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Comfirm

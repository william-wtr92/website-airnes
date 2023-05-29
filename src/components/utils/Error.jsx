import {useState} from "react"
import Button from "@/components/app/ui/Button"

const Error = (props) => {
  const { errorText } = props
  const [showError, setShowError] = useState(true)

  return showError && (
    <>
      <div className="p-5 m-5 bg-red-400 rounded flex justify-between items-center">
        <p className="text-white">{errorText}</p>
        <Button variant={"danger"}
          onClick={() => setShowError(false)}
        >
          OK
        </Button>
      </div>
    </>
  )
}

export default Error

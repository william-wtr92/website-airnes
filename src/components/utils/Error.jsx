import { useState } from "react"

const Error = ({ errorText }) => {
  const [showError, setShowError] = useState(true)

  return showError ? (
    <div className="flex items-center justify-center fixed border-2">
      <div className="bg-white p-4 rounded-lg h-30 w-80 ">
        <div className="text-red-500 text-center mb-4">{errorText}</div>
        <div className="flex justify-center">
          <button
            className="text-white bg-primary hover:cursor-pointer active:bg-[#615043] border border-black px-10 py-2 font-semibold rounded-lg uppercase"
            onClick={() => setShowError(false)}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  ) : null
}

export default Error

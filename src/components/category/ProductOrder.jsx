import Image from "next/image"
import {NavLink} from "@/components/utils/NavLink"

const ProductOrder = (props) => {
    const  { image, name, price, quantity} = props

    return(
        <div className="flex justify-start px-4 py-2 ">
            <div className="flex mt-2 lg:items-center lg:mt-0">
                <Image
                    src={image}
                    alt="meuble"
                    width={100}
                    height={1}
                    className="w-20 h-20 lg:h-36 lg:w-36 hover:cursor-pointer"
                />
            </div>

            <div className="w-32 lg:w-1/2 lg:ml-4">
                <NavLink href="/">
                    <p className="text-sm mt-2 ml-4 font-bold hover:text-[#b3825c] lg:mt-0 lg:ml-0 lg:text-xl">
                        {name}
                    </p>
                </NavLink>
                <p className="hidden text-md mt-11 lg:block ">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
            </div>
            <div className="flex flex-col relative left-[10%]">
                <p className="font-bold mb-5 p-2 lg:mb-8">{price}€</p>
                <input
                    defaultValue={quantity}
                    disabled={true}
                    type="number"
                    className="w-8 h-6 border-2 rounded-md pl-1 mb-2 lg:mb-4"
                />
            </div>
        </div>

    )
}

export default ProductOrder

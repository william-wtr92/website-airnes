import Image from "next/image"
import {NavLink} from "@/components/utils/NavLink"

const ProductOrder = (props) => {
    const  { image, name, price, quantity} = props

    return(
        <div className="flex justify-start px-4 py-2 w-full ">
            <div id={"Image"} className="flex mt-2 lg:mt-0">
                <Image
                    src={image}
                    alt="meuble"
                    width={100}
                    height={1}
                    className="w-20 h-20 lg:h-24 lg:w-28 hover:cursor-pointer"
                />
            </div>
            <div id={"Name et Message"} className="flex flex-col w-4/6 ml-4">
                <NavLink href="/">
                    <p className="text-sm mt-2 font-bold hover:text-[#b3825c] lg:mt-0 lg:ml-0 lg:text-xl">
                        {name}
                    </p>
                </NavLink>
                <p className="hidden text-md mt-2 lg:block ">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
            </div>

            <div id={"Price and number"} className="flex flex-col relative lg:left-5">
                <p className="text-sm lg:text-xl mt-2 lg:mt-0 font-bold mb-[50%]">{price}€</p>
                <div className=" border-2 rounded-md text-right px-2">{quantity}</div>
            </div>
        </div>
    )
}

export default ProductOrder

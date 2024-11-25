import { useAppContext } from "@/contexts/AppContext"
import { GrCart } from "react-icons/gr"
import { Link } from "react-router-dom"



type Props = {
    isDisabled?: boolean
    includeIcon?: boolean
    className?: string
}
export default function CheckoutButton({
    isDisabled = false,
    // includeIcon = false,
    className = "",
}: Props) {
    const { isLogged } = useAppContext();

    return isDisabled === true ? (
        <>
            <button
                type="button"
                className={`bg-gray-400 text-white cursor-not-allowed flex w-full items-center justify-center gap-x-4 text-center ${className}`}
            >
                {/* {includeIcon &&  */}
                <GrCart className={`stroke-gray-100 stroke-2`} />
                {/* } */}
                Checkout
            </button>
        </>
    ) : (
        <>
            {isLogged
                ? <Link
                    to="/checkout"
                    className={`bg-gray-800 text-white hover:bg-gray-500 group flex w-full items-center justify-center gap-x-4 text-center ${className}`}
                >
                    {/* {includeIcon && ( */}
                    <GrCart
                        className={`stroke-gray-100 stroke-2 group-focus-within:stroke-[#53CAB5]`}
                    />
                    {/* )} */}
                    Checkout
                </Link>
                : <Link
                    to="/account"
                    className={`bg-gray-800 text-white hover:bg-gray-500 group flex w-full items-center justify-center gap-x-4 text-center ${className}`}
                >
                    <GrCart
                        className={`stroke-gray-100 stroke-2 group-focus-within:stroke-[#53CAB5]`}
                    />
                    Sign-in to checkout!
                </Link>
            }

        </>
    )
}
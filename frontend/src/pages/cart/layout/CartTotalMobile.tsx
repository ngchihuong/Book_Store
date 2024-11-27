import CheckoutButton from "@/components/CheckoutButton";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function CartTotalMobile() {
    const CartProducts = useSelector((state: RootState) => state.cart.CartArr);

    const totalPrice = CartProducts.reduce((total, cart) => {
        return total + (cart.price * cart.stock);
    }, 0);
    return (
        <>
            <div className="mobile-bottom-wrapper fixed bottom-0 w-full font-sans text-xl shadow-md lg:hidden">
                <div className="px-4 md:px-8 flex justify-between pl-10 pr-20 bg-gray-100 py-2">
                    <span>Total Price: </span>
                    <span>${totalPrice}</span>
                </div>
                <CheckoutButton
                    isDisabled={CartProducts.length < 1}
                    className="!bg-opacity-100 py-4 font-medium"
                    includeIcon
                />
            </div>
        </>
    )
}
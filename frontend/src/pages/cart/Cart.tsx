import CartItemSection from "./layout/CartItemSection";
import CartTotalMobile from "./layout/CartTotalMobile";

export default function Cart() {
    return (
        <>
            <div className="">
                <CartItemSection />
            </div>
            <CartTotalMobile/>
        </>
    )
}
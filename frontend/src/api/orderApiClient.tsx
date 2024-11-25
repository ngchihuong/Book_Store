
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const insertOrder = async (orderFormData: any) => {
    const response = await fetch(`${API_BASE_URL}/api/orders/create`, {
        method: "POST",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderFormData)
    })
    if (!response.ok) {
        throw new Error("Failed to checkout!")
    }
    return response.json()
}
export const fetchOrdersPending = async () => {
    const response = await fetch(`${API_BASE_URL}/api/orders/order-pending`);
    if (!response.ok) {
        throw new Error("Failed fetch order!")
    }
    return response.json();
}
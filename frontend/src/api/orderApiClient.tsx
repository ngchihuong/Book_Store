
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
export const fetchOrdersTransiting = async () => {
    const response = await fetch(`${API_BASE_URL}/api/orders/order-transit`);
    if (!response.ok) {
        throw new Error("Failed fetch order!")
    }
    return response.json();
}
export const fetchOrdersDelivered = async () => {
    const response = await fetch(`${API_BASE_URL}/api/orders/order-delivered`);
    if (!response.ok) {
        throw new Error("Failed fetch order!")
    }
    return response.json();
}
export const fetchOrdersCanceled = async () => {
    const response = await fetch(`${API_BASE_URL}/api/orders/order-canceled`);
    if (!response.ok) {
        throw new Error("Failed fetch order!")
    }
    return response.json();
}
export const fetchOrderById = async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/api/orders/order/${id}`)
    if (!response.ok) {
        throw new Error("Failed fetch order!")
    }
    return response.json();
}
export const fetchAllOrders = async () => {
    const response = await fetch(`${API_BASE_URL}/api/orders/orders`)
    if (!response.ok) {
        throw new Error("Failed fetch order!")
    }
    return response.json();
}
export const updateStatusPendingToTransit = async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/api/orders/orderPendingToTransit/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
    });
    if (!response.ok) {
        throw new Error("Failed update status!")
    }
    return response.json();
}
export const updateStatusTransitToDelivered = async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/api/orders/orderTransitToDelivered/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
    });
    if (!response.ok) {
        throw new Error("Failed update status!")
    }
    return response.json();
}
export const updateStatusPendingToCanceled = async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/api/orders/orderPendingToCanceled/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
    });
    if (!response.ok) {
        throw new Error("Failed update status!")
    }
    return response.json();
}
export const deleteOrder = async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/api/orders/delete/${id}`, {
        method: "DELETE",
        credentials: "include"
    })
    if (!response.ok) {
        throw new Error("Failed delete order!")
    }
    return response.json();
}
export const fetchOrdersPendingForUser = async() => {
    const response = await fetch(`${API_BASE_URL}/api/orders/user-order-pending`, {
        credentials: "include"
    });
    if (!response.ok) {
        throw new Error("Failed fetch orders!")
    }
    return response.json();
}
export const fetchOrdersTransitingForUser = async() => {
    const response = await fetch(`${API_BASE_URL}/api/orders/user-order-intransit`, {
        credentials: "include"
    });
    if (!response.ok) {
        throw new Error("Failed fetch orders!")
    }
    return response.json();
}
export const fetchOrdersDeliveredForUser = async() => {
    const response = await fetch(`${API_BASE_URL}/api/orders/user-order-delivered`, {
        credentials: "include"
    });
    if (!response.ok) {
        throw new Error("Failed fetch orders!")
    }
    return response.json();
}
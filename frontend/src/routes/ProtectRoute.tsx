import { Navigate, Outlet } from "react-router-dom"

interface Props {
    allowedRoles: Array<"admin" | "users">
}
export default function ProtectRoute({ allowedRoles }: Props) {
    const role = localStorage.getItem("role") as "admin" | "users";
         return (
            <>
                {allowedRoles.includes(role) ? <Outlet /> : <Navigate to="/unauthorrzation" />}
            </>
        )
}
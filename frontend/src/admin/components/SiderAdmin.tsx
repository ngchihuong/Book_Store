import * as userApiClient from "@/api/userApiClient";
import { useAppContext } from "@/contexts/AppContext";
import { Layout, Menu } from "antd";
import { BsFillCartCheckFill } from "react-icons/bs";
import { FaBook } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { IoIdCardSharp } from "react-icons/io5";
import { MdDashboard, MdManageAccounts } from "react-icons/md";
import {  } from "react-icons/vsc";
import { useMutation, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";

export default function SiderAdmin() {
    const { Sider } = Layout;
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { showToast } = useAppContext();

    const mutation = useMutation(userApiClient.signOut, {
        onSuccess: async () => {
            await queryClient.invalidateQueries('validateToken');
            setTimeout(() => {
                navigate('/account')
            }, 500);
            showToast({ message: "Signed Out!", type: "SUCCESS" })
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR" })
        }
    })

    const handleLogout = () => {
        mutation.mutate();
    }
    return (
        <>
            <Sider className="w-[200px] h-auto min-h-screen">
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['']}
                    defaultOpenKeys={['dashboard']}
                    className="text-md"
                    items={[
                        {
                            key: 'dashboard',
                            icon: <MdDashboard style={{ fontSize: "20px" }} />,
                            label: <Link to='/admin'>Dashboard</Link>, //later examples edit to label: <Link to='...path...:v'>Hotels</Link>,
                        },
                        {
                            key: 'users',
                            icon: <MdManageAccounts style={{ fontSize: "20px" }} />,
                            label: <Link to='/list-users'>Accounts</Link>
                        },
                        {
                            key: 'authors',
                            icon: <IoIdCardSharp  style={{ fontSize: "20px" }} />,
                            label: <Link to='/list-authors'>Authors</Link>
                        },
                        {
                            key: 'hotel',
                            icon: <FaBook style={{ fontSize: "20px" }} />,
                            label: <Link to='/list-books'>Books</Link>
                        },
                        {
                            key: 'booking',
                            icon: <BsFillCartCheckFill style={{ fontSize: "20px" }} />,
                            label: <Link to='/list-orders'>Orders</Link>,
                        },
                        {
                            key: "logout",
                            icon: <IoMdLogOut style={{ fontSize: "20px" }} />,
                            label: "Log-out",
                            onClick: handleLogout,
                        }
                    ]}
                />
            </Sider>
        </>
    )
}
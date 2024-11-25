import { useAppContext } from "@/contexts/AppContext";
import { Dropdown, MenuProps, Space } from "antd";
import { FaRegUser } from "react-icons/fa";
import { PiCaretDownBold } from "react-icons/pi";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import * as userApiClient from "@/api/userApiClient";
import { useDispatch } from "react-redux";
import { clearCart } from "@/redux/slice/cartSlice";

export default function LogOutButton() {
    const dispatch = useDispatch();

    const queryClient = useQueryClient();
    const { showToast } = useAppContext();
    const navigate = useNavigate();

    const {data: currentUser} = useQuery("fetchCurrentUser", userApiClient.fetchCurrentUser)
    const mutation = useMutation(userApiClient.signOut, {
        onSuccess: async () => {
            await queryClient.invalidateQueries("validateToken");
            navigate("/")
            queryClient.clear();
            dispatch(clearCart())
            showToast({ message: "Sign-out Successful!", type: "SUCCESS" })
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR" })
        }
    })

    const handleClick = () => {
        mutation.mutate();
    }

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <div className="grid grid-cols-1 gap-x-4 w-auto">
                    <button onClick={handleClick}>
                        <div className="font-serif font-semibold">Sign-Out</div>
                    </button>
                </div>
            ),
        },
    ];
    return (
        <>
            <Space direction="vertical">
                <Space wrap>
                    <Dropdown menu={{ items }} placement="bottomCenter">
                        <button className="hidden md:flex md:flex-row items-center gap-x-2 bg-transparent border-none bg-gray-100 outline-none group">
                            <span className="group-hover:text-gray-500 text-xl font-bold">
                                <FaRegUser />
                            </span>
                            <span className="group-hover:text-gray-500 font-sans text-lg">
                                {currentUser?.firstName + " " + currentUser?.lastName}
                            </span>
                            <PiCaretDownBold className="text-md transition-transform ease-in-out duration-500 group-hover:rotate-180" />
                        </button>
                    </Dropdown>
                </Space>
            </Space>
        </>
    )
}
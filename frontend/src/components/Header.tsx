import useScroll from "@/contexts/useScroll";
import { Dropdown, MenuProps, Space } from "antd";
import React, { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { IoCloseSharp, IoMenuSharp } from "react-icons/io5";
import { PiCaretDownBold } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import SocialGroup from "./SocialGroup";
import LogOutButton from "./LogOutButton";
import CartDropdown from "./CartDropdown";
import { useAppContext } from "@/contexts/AppContext";
import { useMutation, useQuery, useQueryClient } from "react-query";
import * as cateApiClient from "@/api/categoryApiClient"
import * as userApiClient from "@/api/userApiClient"

import { useDispatch } from "react-redux";
import { clearCart } from "@/utils/cartSlice";
import { MdCancel, MdManageHistory } from "react-icons/md";

export default function Header() {
    const dispatch = useDispatch();

    const queryClient = useQueryClient();
    const [navClassList, setNavClassList] = useState<string[]>([]);
    const [openNav, setOpenNav] = useState(false)
    const [showCate, setShowCate] = useState<boolean>(false);
    const [showAcc, setShowAcc] = useState<boolean>(false);
    const [open, setOpen] = useState(false);
    const [key, setKey] = useState<string>("")

    const { isLogged, showToast } = useAppContext();
    const navigate = useNavigate();
    const scroll = useScroll()

    const { data: cateData } = useQuery(
        "fetchAllCategories", cateApiClient.fetchAllCategories
    )
    const { data: userData } = useQuery(
        "fetchCurrentUser", userApiClient.fetchCurrentUser
    )
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

    // Tạo các item của menu bằng cách map qua mảng bookCategories
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <div className="grid grid-cols-1 gap-x-4 w-auto">
                    {cateData?.map(category => (
                        <Link
                            key={category._id}
                            to={`/categories/${category._id}`}
                            className="hover:bg-gray-200 p-2 rounded"
                        >
                            <div className="font-serif font-semibold border-b">{category.name}</div>
                        </Link>
                    ))}
                </div>
            ),
        },
    ];

    const closeNav = () => {
        setOpenNav(false)
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!key.trim()) {
            return;
        }
        navigate(`/search?key=${encodeURIComponent(key)}`)
        setTimeout(() => {
            setKey("")
        }, 2000);
    }
    useEffect(() => {
        document.body.style.overflowY = openNav ? "hidden" : "scroll"
    }, [openNav])
    // add shadow to nav (with classList) on scroll
    useEffect(() => {
        const _classList = []

        if (scroll.y > 25) _classList.push("!shadow")

        setNavClassList(_classList)
    }, [scroll.y])
    return (
        <>
            <header className={`sticky top-0 z-20 bg-gray-100 ${navClassList.join(" ")}`}>
                <div className="relative m-auto flex max-w-6xl items-center justify-between py-4">
                    <div className="flex basic-1/3 justify-start md:hidden">
                        <button className="p-1"
                            onClick={() => setOpenNav(true)}
                            type="button"
                            title="menu"
                        >
                            <IoMenuSharp className="size-8 mx-4" />
                        </button>
                    </div>
                    <div className="flex flex-[1/3] justify-center md:justify-start">
                        <Link to='/'
                            className="hover:text-gray-500 font-serif text-2xl font-semibold md:text-3xl"
                        >
                            MoonBook
                        </Link>
                    </div>
                    <div className="flex justify-end flex-row md:gap-x-10 ">
                        <Space direction="vertical">
                            <Space wrap>
                                <Dropdown menu={{ items }} placement="bottomCenter">
                                    <button className="hidden md:flex md:flex-row items-center gap-x-2 bg-transparent border-none bg-gray-100 outline-none group">
                                        <span className="hover:text-gray-500 font-sans text-lg">
                                            Books
                                        </span>
                                        <PiCaretDownBold className="text-md transition-transform ease-in-out duration-500 group-hover:rotate-180" />
                                    </button>
                                </Dropdown>
                            </Space>
                        </Space>

                        <div className="">
                            <CartDropdown />
                        </div>
                        <div className="">
                            {isLogged === false
                                ?
                                <Link to={`/account`}>
                                    <div className="hidden md:flex md:flex-row justify-center items-center gap-x-2 group">
                                        <span className="group-hover:text-gray-500 text-xl font-bold">
                                            <FaRegUser />
                                        </span>
                                        <span className="group-hover:text-gray-500 font-sans text-lg">
                                            Account
                                        </span>
                                    </div>
                                </Link>
                                :
                                <>
                                    <LogOutButton />
                                </>
                            }
                        </div>
                        {isLogged && (
                            <>
                                <div className="">
                                    <Link to='/history'
                                        className="flex flex-row justify-center items-center gap-x-2 group">
                                        <span className="group-hover:text-gray-500 text-3xl md:text-2xl font-bold mx-5 md:mx-0">
                                            <MdManageHistory />
                                        </span>
                                        <span className="group-hover:text-gray-500 font-sans text-lg hidden md:flex">
                                            History
                                        </span>
                                    </Link>
                                </div>
                            </>
                        )}
                        <div className="">

                            {open === false
                                ? <>
                                    <button
                                        onClick={() => setOpen(!open)}
                                        className="flex flex-row justify-center items-center gap-x-2 group">
                                        <span className="group-hover:text-gray-500 text-3xl md:text-2xl font-bold mx-5 md:mx-0">
                                            <IoMdSearch />
                                        </span>
                                        <span className="group-hover:text-gray-500 font-sans text-lg hidden md:flex">
                                            Search
                                        </span>
                                    </button>
                                </>
                                : <>
                                    <form onSubmit={handleSubmit}
                                        className="flex justify-center items-start">
                                        <div className="border-2 flex items-center gap-x-1 py-1 rounded-lg">
                                            <div className="px-2">
                                                <input type="text"
                                                    value={key}
                                                    onChange={(event) => setKey(event.target.value)}
                                                    className="border-none pl-1 bg-gray-100 outline-none  rounded-md" />
                                            </div>
                                            <button className=" px-1">
                                                <IoMdSearch className="font-bold hover:text-green-600 text-3xl md:text-3xl h-full hover:bg-gray-200 rounded-md" />
                                            </button>
                                        </div>
                                        <button className="px-1 "
                                            onClick={() => {
                                                setOpen(!open)
                                                setKey("")
                                            }}><MdCancel /></button>
                                    </form>
                                </>
                            }


                        </div>


                    </div>
                </div>
            </header >

            {/* Mobile Nav */}
            < div className={`fixed top-0 left-0 z-30 h-screen bg-gray-700 transition-all delay-300 duration-500
                md:hidden ${openNav ? "opacity-50" : "hidden opacity-0"}
                `} onClick={closeNav} />
            <div className={`fixed top-0 z-30 flex h-screen max-h-screen w-10/12 flex-col items-center overflow-y-scroll
                    bg-gray-100 p-4 transition-transform duration-300 md:hidden ${openNav ? 'translate-x-0' : "-translate-x-full"} 
                    `}>
                <button className="self-end p-1"
                    type="button"
                    title="Close Menu"
                    onClick={closeNav}
                >
                    <IoCloseSharp className="scale-125" />
                </button>
                <div className="flex flex-col items-center gap-2">
                    <div className="font-serif text-2xl font-semibold">Moon Book</div>
                    <p className="text-center">
                        One of the best book stores <br />
                        in VietNam
                    </p>
                </div>
                <nav
                    className="mt-4 mb-6 self-stretch"
                >
                    <ul className="flex flex-col items-start gap-x-2 devide-y text-xl md:gap-x-4">
                        <li className={`flex w-full flex-col border-b`}>
                            <Link to='/'
                                className={`flex items-center gap-x-2 px-2 text-xl`}
                                onClick={closeNav}
                            >
                                <span>Home</span>
                            </Link>
                        </li>

                        <li className="list-item w-full py-2 border-b">
                            <button
                                aria-controls="category-content-mobile"
                                className="flex h-full w-full items-center justify-between px-2 text-xl"
                                onClick={() => setShowCate(!showCate)}
                            >
                                Book{" "}
                                <PiCaretDownBold
                                    aria-hidden
                                    className={`transition-transform duration-500 ease-in-out 
                                        ${showCate === true ? "rotate-180" : ""}`}
                                />
                            </button>
                            {showCate === true && (
                                <div id="category-content-mobile">
                                    <ul className="my-2 flex flex-col px-2 font-sans">
                                        {cateData?.map((item) => (
                                            <li>
                                                <Link to={`/categories/${item._id}`}
                                                    className="block p-2 font-serif underline decoration-dotted
                                             hover:bg-gray-100 hover:decoration-solid"
                                                    onClick={closeNav}
                                                >
                                                    {item.name}
                                                </Link>
                                            </li>
                                        ))}

                                    </ul>
                                </div>
                            )}

                        </li>

                        {/* {navLinks.map((nav) => (
                            <li
                                key={nav.name}
                                className={`flex w-full flex-col border-b ${nav.position === "main" ? "list-item" : "hidden"}`}
                                onClick={closeNav}
                            >
                                {isLogged
                                    ? <Link
                                        to="#"
                                        className={`flex items-center gap-x-2 py-1 px-2 text-xl`}
                                    >
                                        <span>{userData?.firstName + " " + userData?.lastName}</span> {nav.icon}
                                    </Link>
                                    : <Link
                                        to={nav.href}
                                        className={`flex items-center gap-x-2 py-1 px-2 text-xl`}
                                    >
                                        <span>{nav.name}</span> {nav.icon}
                                    </Link>
                                }

                            </li>
                        ))} */}
                        <li className="flex w-full flex-col border-b">
                            <Link
                                to="/about-us"
                                className={`flex items-center gap-x-2 py-1 px-2 text-xl`}
                                onClick={closeNav}
                            >
                                <span>About Us</span>
                            </Link>
                        </li>
                        <li className="flex-w-full flex-col border-b">
                            <Link
                                to="/contact"
                                className={`flex items-center gap-x-2 py-1 px-2 text-xl`}
                                onClick={closeNav}
                            >
                                <span>Contact Us</span>
                            </Link>
                        </li>

                        <li className="list-item w-full py-2 border-b">
                            <button
                                aria-controls="category-content-mobile"
                                className="flex h-full w-full items-center justify-between px-2 text-xl"
                                onClick={() => setShowAcc(!showAcc)}
                            >
                                <span className="flex items-center md:hidden">
                                    {isLogged ? userData?.firstName + " " + userData?.lastName : "Account"}{" "}<FaRegUser />
                                </span>
                                <PiCaretDownBold
                                    aria-hidden
                                    className={`transition-transform duration-500 ease-in-out 
                                        ${showAcc === true ? "rotate-180" : ""}`}
                                />
                            </button>
                            {showAcc === true && (
                                <div id="category-content-mobile">
                                    <ul className="my-2 flex flex-col px-2 font-sans">
                                        <li>
                                            {isLogged
                                                ?
                                                <button
                                                    className="block p-2 font-serif underline decoration-dotted
                                             hover:bg-gray-100 hover:decoration-solid"
                                                    onClick={() => {
                                                        closeNav()
                                                        handleClick()
                                                    }}
                                                >
                                                    Sign-out
                                                </button>
                                                :
                                                <Link
                                                    to="/account"
                                                    className={`block p-2 font-serif underline decoration-dotted
                                             hover:bg-gray-100 hover:decoration-solid`}
                                                    onClick={closeNav}
                                                >
                                                    <span>Sign-in</span>
                                                </Link>
                                            }

                                        </li>
                                    </ul>
                                </div>
                            )}
                        </li>
                    </ul>
                </nav>
                <SocialGroup placeBottom />
            </div>

        </>
    )
}
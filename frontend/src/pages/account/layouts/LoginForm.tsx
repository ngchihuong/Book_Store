import { useAppContext } from "@/contexts/AppContext"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { IoWarningOutline } from "react-icons/io5"
import { PiWarningCircle } from "react-icons/pi"
import { useMutation, useQueryClient } from "react-query"
import { Link, useLocation, useNavigate } from "react-router-dom"
import * as userApiClient from "@/api/userApiClient";

export type SignInFormData = {
    email: string;
    password: string;
}
export default function LoginForm() {
    const [errorMsg, setErrorMsg] = useState<string | null>(null)

    const queryClient = useQueryClient();
    const { showToast } = useAppContext();
    const navigate = useNavigate();
    const location = useLocation();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<SignInFormData>();
    const mutation = useMutation(userApiClient.signIn, {
        onSuccess: async () => {
            showToast({ message: "Sign-in Successful!", type: "SUCCESS" })
            await queryClient.invalidateQueries("validateToken");
            const role = localStorage.getItem('role') as "admin" | "users";
            if (role === "admin") {
                navigate("/admin")
            } else if (role === "users") {
                navigate("/")
            }
            queryClient.clear();
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR" })
        }
    })
    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data)
    })

    return (
        <>
            <section className="flex-1 pb-8 md:pb-0 md:pr-10 xl:pr-20">
                <h2 className="text-xl font-bold">Login</h2>
                <form className="mt-4" onSubmit={onSubmit}>
                    <div className="mb-4">
                        <label className="font-sans font-medium">
                            Email Address
                            <input type="email"
                                placeholder="johndoe@gmail.com"
                                className="my-1 block w-full rounded border-2 border-gray-300 bg-gray-100 
                                py-1 px-2 font-normal outline-[#53cab5]"
                                {...register("email", { required: "This field is required!" })}
                            />
                            {errors.email &&
                                (
                                    <span className="error mt-2 text-red-700 flex flex-row gap-x-1">
                                        <>
                                            <IoWarningOutline className=" text-2xl align-text-bottom" />
                                            {errors.email.message}
                                        </>
                                    </span>
                                )
                            }
                        </label>
                    </div>

                    <div className="mb-4">
                        <label className="font-sans font-medium">
                            Password
                            <input type="password"
                                placeholder="johndoe@gmail.com"
                                className="my-1 block w-full rounded border-2 border-gray-300 bg-gray-100 
                                py-1 px-2 font-normal outline-[#53cab5]"
                                {...register("password", {
                                    required: "This field is required!",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters!"
                                    }
                                })}
                            />
                            {errors.password &&
                                (
                                    <span className="error mt-2 text-red-700 flex flex-row gap-x-1">
                                        <>
                                            <IoWarningOutline className=" text-2xl align-text-bottom" />
                                            {errors.password.message}
                                        </>
                                    </span>
                                )
                            }
                        </label>
                    </div>

                    <div className="mb-4">
                        <Link
                            to=""
                            className="font-sans font-semibold text-sm opacity-75 hover:opacity-100"
                        >
                            Forgot your password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="bg-gray-800 text-white rounded py-2 px-8 font-sans font-medium md:py-1 md:px-5"
                    >
                        Login
                    </button>
                </form>
            </section>
        </>
    )
}
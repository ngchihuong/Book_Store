import { useAppContext } from "@/contexts/AppContext";
import { useForm } from "react-hook-form";
import { IoWarningOutline } from "react-icons/io5";
import { PiWarningCircle } from "react-icons/pi";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import * as userApiClient from "@/api/userApiClient"

export type RegisterFormData = {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
}
export default function RegisterForm() {
    const errorMsg = ''
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { showToast } = useAppContext();

    const {
        register,
        watch,
        handleSubmit,
        formState: { errors }
    } = useForm<RegisterFormData>();
    const mutation = useMutation(userApiClient.register, {
        onSuccess: async () => {
            showToast({ message: "Registration Success!", type: "SUCCESS" })
            await queryClient.invalidateQueries("validateToken");
            navigate("/")
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
            <section className="flex-1 pt-8 md:pt-0 md:pl-10 xl:pl-20">
                <h2 className="text-xl font-bold">Register</h2>
               
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
                            First Name
                            <input type="text"
                                placeholder="your first name"
                                className="my-1 block w-full rounded border-2 border-gray-300 bg-gray-100 
                                py-1 px-2 font-normal outline-[#53cab5]"
                                {...register("firstName", { required: "This field is required!" })}
                            />
                            {errors.firstName &&
                                (
                                    <span className="error mt-2 text-red-700 flex flex-row gap-x-1">
                                        <>
                                            <IoWarningOutline className=" text-2xl align-text-bottom" />
                                            {errors.firstName.message}
                                        </>
                                    </span>
                                )
                            }
                        </label>
                    </div>
                    <div className="mb-4">
                        <label className="font-sans font-medium">
                            Last Name
                            <input type="text"
                                placeholder="your last name"
                                className="my-1 block w-full rounded border-2 border-gray-300 bg-gray-100 
                                py-1 px-2 font-normal outline-[#53cab5]"
                                {...register("lastName", { required: "This field is required!" })}
                            />
                            {errors.lastName &&
                                (
                                    <span className="error mt-2 text-red-700 flex flex-row gap-x-1">
                                        <>
                                            <IoWarningOutline className=" text-2xl align-text-bottom" />
                                            {errors.lastName.message}
                                        </>
                                    </span>
                                )
                            }
                        </label>
                    </div>
                    <div className="mb-4">
                        <label className="font-sans font-medium">
                            Phone Number
                            <input type="number"
                                placeholder="Your phone number"
                                className="my-1 block w-full rounded border-2 border-gray-300 bg-gray-100 
                                py-1 px-2 font-normal outline-[#53cab5]"
                                {...register("phoneNumber", { required: "This field is required!" })}
                            />
                            {errors.phoneNumber &&
                                (
                                    <span className="error mt-2 text-red-700 flex flex-row gap-x-1">
                                        <>
                                            <IoWarningOutline className=" text-2xl align-text-bottom" />
                                            {errors.phoneNumber.message}
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
                        <label className="font-sans font-medium">
                            Confirm Password
                            <input type="password"
                                placeholder="johndoe@gmail.com"
                                className="my-1 block w-full rounded border-2 border-gray-300 bg-gray-100 
                                py-1 px-2 font-normal outline-[#53cab5]"
                                {...register("confirmPassword", {
                                    validate: (value) => {
                                        if (!value) {
                                            return "This field is required!"
                                        } else if (watch("password") !== value) {
                                            return "Your password do not match!"
                                        }
                                    }
                                })}
                            />
                            {errors.confirmPassword &&
                                (
                                    <span className="error mt-2 text-red-700 flex flex-row gap-x-1">
                                        <>
                                            <IoWarningOutline className=" text-2xl align-text-bottom" />
                                            {errors.confirmPassword.message}
                                        </>
                                    </span>
                                )
                            }
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="bg-gray-800 text-white mt-4 rounded py-2 px-8 font-sans font-medium md:py-1 md:px-5"
                    >
                        Register
                    </button>
                </form>
            </section>
        </>
    )
}
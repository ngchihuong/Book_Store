import LoginForm from "./layouts/LoginForm";
import RegisterForm from "./layouts/RegisterForm";

export default function Account() {
    return (
        <>
            <main className="mx-auto max-w-6xl px-4 py-6 md:px-8 w-screen">
                <h1 className="font-serif text-2xl font-semibold text-center underline capitalize">My Account</h1>
                <div className="my-8 flex flex-col divide-y-2 px-2 mt-10
                 divide-gray-100 md:flex-row md:divide-y-0 md:divide-x-2">
                    <LoginForm/>
                    <RegisterForm/>
                </div>
            </main>
        </>
    )
}
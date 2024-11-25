import { useState } from "react";
import { useQuery } from "react-query";
import * as userApiClient from "@/api/userApiClient"
import { AiOutlineLoading3Quarters } from "react-icons/ai";


export default function ListUsers() {
    const [searchValue, setSearchValue] = useState<string>("");

    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10; // Number of hotels per page

    const { data: userData } = useQuery(
        "fetchAllAccounts",
        userApiClient.fetchAllAccounts
    );

    const { data: searchResults } = useQuery(
        ["searchUserByName", searchValue],
        () => userApiClient.searchUserByName(searchValue),
        {
            enabled: !!searchValue
        }
    )
    if (!userData) {
        return (
            <div className="flex justify-center items-center animate-spin duration-50 text-4xl h-48 text-gray-800">
                <AiOutlineLoading3Quarters />
            </div>
        )
    }

    // Calculate total pages
    const totalPages = Math.ceil(userData.length / usersPerPage);

    // Get the current hotels to display
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = userData.slice(indexOfFirstUser, indexOfLastUser);

    return (
        <>
            <div className="space-y-5">
                <div className="grid grid-cols-2 justify-between">
                    <h1 className="text-3xl font-bold">List Users</h1>

                    <div className="w-full">
                        <div className="flex items-center gap-4 mb-4">
                            <input
                                type="text"
                                className="border-2 px-4 py-2 rounded-md w-full"
                                placeholder="User Name..."
                                value={searchValue}
                                onChange={(event) => setSearchValue(event.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    User ID
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    First Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Last Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Phone Number
                                </th>
                                {/* <th scope="col" className="px-6 py-3">
                                    Role
                                </th>
                                <th scope="col" className="px-6 py-3">

                                </th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {(searchResults || currentUsers).map((user: {
                                _id: any,
                                email: any,
                                firstName: any,
                                lastName: any,
                                phoneNumber: any,
                                role: any
                            }) => (
                                <>
                                    {user.role !== "admin" &&
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {user._id}
                                            </th>
                                            <td className="px-6 py-4">
                                                {user.email}
                                            </td>
                                            <td className="px-6 py-4">
                                                {user.firstName}
                                            </td>
                                            <td className="px-6 py-4">
                                                {user.lastName}
                                            </td>
                                            <td className="px-6 py-4">
                                                {user.phoneNumber}
                                            </td>
                                            {/* <td className="px-6 py-4">
                                                {selectedUserId === user._id ?
                                          (
                                              <div className="w-10 h-5 border rounded-md">
                                                  <select
                                                      value={selectedValue}
                                                      onChange={(event) => setSelectedValue(event.target.value)}
                                                      className=""
                                                  >
                                                      <option value="admin">Admin</option>
                                                      <option value="employee">Employee</option>
                                                      <option value="users">Users</option>
                                                  </select>
                                              </div>
                                          )
                                          :
                                          (
                                              <span className="p-1 uppercase">
                                                  {user.role}
                                              </span>
                                          )
                                      }
                                            </td>

                                            <td className="">
                                                <button
                                                    className="min-w-10 h-7 p-1 bg-blue-600 text-white text-sm font-semibold 
                                              hover:bg-blue-500 hover:text-gray-200 mx-1 rounded-lg ml-8"
                                                onClick={() => {
                                                    if (selectedUserId === user._id) {
                                                        handleChangeRole(user._id)
                                                    } else {
                                                        setSelectedUserId(user._id)
                                                        setSelectedValue(user.role)
                                                    }
                                                }}
                                                disabled={updateLoading}
                                                >
                                                    {selectedUserId === user._id ? `${updateLoading ? "Saving" : "Save"}` : "Edit"}
                                                </button>
                                            </td> */}

                                        </tr>
                                    }
                                </>
                            ))}
                        </tbody>
                    </table>
                </div>


                {/* Pagination Controls */}
                <div className="flex justify-center mt-4">
                    <div className="m-4">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="bg-gray-300 p-2 rounded disabled:opacity-50">
                            Previous
                        </button>
                        <span className="mx-2">Page {currentPage} of {totalPages}</span>
                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="bg-gray-300 p-2 rounded disabled:opacity-50">
                            Next
                        </button>
                    </div>
                </div>
            </div >
        </>
    )
}
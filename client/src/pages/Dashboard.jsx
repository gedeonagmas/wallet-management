import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Logout, Person } from "@mui/icons-material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Outlet, useNavigate } from "react-router-dom";
import logo from "./../assets/logo.png";
import { useReadQuery, useUserLogoutMutation } from "../features/api/apiSlice";
import Response from "../components/Response";
import axios from "axios";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("wallet_user"));
  const fetchBy = user?.role === "user" ? `user=${user?._id}` : "";

  const {
    data: wallet,
    isFetching: walletIsFetching,
    isError: walletIsError,
  } = useReadQuery({
    url: `/user/wallet?${fetchBy}&populate=user`,
    tag: ["wallet"],
  });
  const navigate = useNavigate();
  const [logout, logoutResponse] = useUserLogoutMutation();
  const [pending, setPending] = useState(false);

  const logoutHandler = () => {
    logout({});
  };

  // let token = localStorage.getItem("token")?.replace(/"/g, "");
  // const logoutHandlers = () => {
  //   try {
  //     setPending(true);
  //     axios
  //       .post(
  //         "http://localhost:8000/api/logout",
  //         {},
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //             "Content-Type": "application/json",
  //             Accept: "application/json",
  //           },
  //           withCredentials: true, // Add this if using Sanctum
  //         }
  //       )
  //       .then((response) => {
  //         localStorage.removeItem("token");
  //         localStorage.removeItem("wallet_user");
  //         navigate("/login");
  //       })
  //       .catch((err) => {
  //         toast.custom(<Toast message={err.message} status="error" />);
  //         console.log(err);
  //       })
  //       .finally(() => {
  //         setPending(false);
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const sidebarHandler = (type) => {
    const id = document.getElementById("logo-sidebar");
    // console.log(id, "ids");
    id?.classList?.value.includes("hidden") && type === "auto"
      ? id?.classList?.remove("hidden")
      : id?.classList?.add("hidden");
  };

  return (
    <div>
      <nav class="fixed top-0 z-50 w-full bg-white bg-dark border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <Response
          response={logoutResponse}
          setPending={setPending}
          redirects="/"
          type="logout"
        />
        <div class="px-3 py-3 lg:px-5 lg:pl-3">
          <div class="flex items-center justify-between">
            <div class="flex flex-col font-light w-full justify-between items-center">
              <div className="text-sm hidden xl:flex flex-col   absolute  items-center left-2  text-gray-600 ">
                <p className="text-lg ">Welcome to Your Wallet</p>
                <a
                  href="/"
                  className="flex items-center cursor-pointer gap-2 hover:text-gray-800"
                >
                  <svg
                    class="w-6 h-6 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 12h14M5 12l4-4m-4 4 4 4"
                    />
                  </svg>
                  <p className="">back to home</p>
                </a>
              </div>
              <div class="flex items-center w-full justify-end ms-3">
                <div
                  onClick={() => sidebarHandler("auto")}
                  className="lg:hidden cursor-pointer absolute left-2 self-start"
                >
                  <svg
                    class="w-8 h-8 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-width="2"
                      d="M5 7h14M5 12h14M5 17h10"
                    />
                  </svg>
                </div>

                <div className="flex relative gap-3 text-xs lg:gap-6 lg:mr-10 self-end items-center">
                  <a
                    href="/"
                    className="items-center cursor-pointer flex flex-col justify-center "
                  >
                    <svg
                      class="w-6 h-6"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <p className="text-xs font-semibold">home</p>
                  </a>

                  <a href={`/dashboard/topup`} className="cursor-pointer">
                    <div className="items-center flex flex-col justify-center">
                      <button
                        type="button"
                        class="relative flex flex-col items-center text-sm font-medium text-center"
                      >
                        <svg
                          class="w-6 h-6 "
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11.5c.07 0 .14-.007.207-.021.095.014.193.021.293.021h2a2 2 0 0 0 2-2V7a1 1 0 0 0-1-1h-1a1 1 0 1 0 0 2v11h-2V5a2 2 0 0 0-2-2H5Zm7 4a1 1 0 0 1 1-1h.5a1 1 0 1 1 0 2H13a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h.5a1 1 0 1 1 0 2H13a1 1 0 0 1-1-1Zm-6 4a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1ZM7 6a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H7Zm1 3V8h1v1H8Z"
                            clip-rule="evenodd"
                          />
                        </svg>

                        <p className="text-xs font-semibold">Topup</p>
                      </button>
                    </div>
                  </a>
                </div>
                <div className="flex ml-3 gap-2 -mt-2 lg:mt-0 items-center">
                  <button
                    onClick={() => {
                      const id = document.getElementById("dropdown-user");
                      id?.classList?.value?.includes("hidden")
                        ? id?.classList.remove("hidden")
                        : id?.classList.add("hidden");
                    }}
                    type="button"
                    class="flex text-sm rounded-full lg:w-[160px] border-2 border-gray-300 border-dark focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  >
                    <div className="flex w-full gap-2 items-center">
                      {user?.image?.length > 1 ? (
                        <img
                          class="w-10 h-10 rounded-full"
                          src={user?.image}
                          alt="photo"
                        />
                      ) : (
                        <div className="w-12 h-12 p-1 text-lg font-bold rounded-full flex items-center justify-center bg-main text-white text-center">
                          {user?.email?.substring(0, 1)}
                        </div>
                      )}

                      <p className="hidden lg:block text-sm font-bold">
                        {user?.name?.split(" ")[0]}
                      </p>
                      <div className="p-1">
                        <svg
                          class="w-6 h-6"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m8 10 4 4 4-4"
                          />
                        </svg>
                      </div>
                    </div>
                  </button>
                </div>
                <div
                  class="z-50 absolute shadow-lg border top-14 right-3 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded dark:bg-gray-700 dark:divide-gray-600"
                  id="dropdown-user"
                >
                  <div class="px-4 py-3" role="none">
                    <p
                      class="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                      role="none"
                    >
                      {user?.email}
                    </p>
                  </div>
                  <ul class="py-1" role="none">
                    <li>
                      <a
                        href={`/dashboard/change-password`}
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Security
                      </a>
                    </li>
                    <li>
                      <p
                        onClick={logoutHandler}
                        class="block px-4 py-2 cursor-pointer text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Log out
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        class="fixed hidden lg:block top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform  bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div class="h-full px-3 pb-4 overflow-y-auto bg-white bg-dark dark:bg-gray-800">
          <ul class="space-y-2 font-medium">
            <a href="/" class="flex flex-col ms-2 md:me-24">
              <img src={logo} className="w-full h-14" alt="" />
            </a>
            <li onClick={() => sidebarHandler("off")}>
              <a
                href={`/dashboard`}
                class="flex mt-4 items-center p-2 text-gray-500 hover:text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <DashboardIcon className="" />
                <span class="ms-3">Overview</span>
              </a>
            </li>

            <li>
              <a
                href={`/dashboard/status`}
                class="flex items-center p-2 text-gray-500 hover:text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  class="w-6 h-6"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11.5c.07 0 .14-.007.207-.021.095.014.193.021.293.021h2a2 2 0 0 0 2-2V7a1 1 0 0 0-1-1h-1a1 1 0 1 0 0 2v11h-2V5a2 2 0 0 0-2-2H5Zm7 4a1 1 0 0 1 1-1h.5a1 1 0 1 1 0 2H13a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h.5a1 1 0 1 1 0 2H13a1 1 0 0 1-1-1Zm-6 4a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1ZM7 6a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H7Zm1 3V8h1v1H8Z"
                    clip-rule="evenodd"
                  />
                </svg>

                <span class="flex-1 ms-3 whitespace-nowrap">Status</span>
              </a>
            </li>

            <li>
              <a
                href={`/dashboard/topup`}
                class="flex items-center p-2 text-gray-500 hover:text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  class="w-6 h-6"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11.5c.07 0 .14-.007.207-.021.095.014.193.021.293.021h2a2 2 0 0 0 2-2V7a1 1 0 0 0-1-1h-1a1 1 0 1 0 0 2v11h-2V5a2 2 0 0 0-2-2H5Zm7 4a1 1 0 0 1 1-1h.5a1 1 0 1 1 0 2H13a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h.5a1 1 0 1 1 0 2H13a1 1 0 0 1-1-1Zm-6 4a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1ZM7 6a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H7Zm1 3V8h1v1H8Z"
                    clip-rule="evenodd"
                  />
                </svg>

                <span class="flex-1 ms-3 whitespace-nowrap">Top up</span>
              </a>
            </li>

            <li>
              <a
                href={`/dashboard/withdraw`}
                class="flex items-center p-2 text-gray-500 hover:text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  class="w-6 h-6"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11.5c.07 0 .14-.007.207-.021.095.014.193.021.293.021h2a2 2 0 0 0 2-2V7a1 1 0 0 0-1-1h-1a1 1 0 1 0 0 2v11h-2V5a2 2 0 0 0-2-2H5Zm7 4a1 1 0 0 1 1-1h.5a1 1 0 1 1 0 2H13a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h.5a1 1 0 1 1 0 2H13a1 1 0 0 1-1-1Zm-6 4a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1ZM7 6a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H7Zm1 3V8h1v1H8Z"
                    clip-rule="evenodd"
                  />
                </svg>

                <span class="flex-1 ms-3 whitespace-nowrap">Withdraw</span>
              </a>
            </li>

            <li>
              <a
                href={`/dashboard/profile`}
                class="flex items-center p-2 text-gray-500 hover:text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <Person />

                <span class="flex-1 ms-3 whitespace-nowrap">Profile</span>
              </a>
            </li>

            <li
              onClick={logoutHandler}
              className="text-gray-500  hover:text-gray-900"
            >
              <p
                href="#"
                class="flex cursor-pointer items-center  rounded-lg dark:text-white p-2 hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <Logout className="" />
                <span class="flex-1 ms-3 whitespace-nowrap">Logout</span>
              </p>
            </li>
          </ul>
        </div>
      </aside>

      <div
        onClick={() => sidebarHandler("off")}
        class="pl-4 pt-4 mt-20  bg-dark bg-whites lg:ml-64"
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;

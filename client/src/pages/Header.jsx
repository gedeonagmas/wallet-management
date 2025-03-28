import { DarkThemeToggle } from "flowbite-react";
import { useState } from "react";
import Response from "../components/Response";
import logo from "./../assets/logo.png";

import { useUserLogoutMutation } from "../features/api/apiSlice";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("wallet_user"));

  const [logout, logoutResponse] = useUserLogoutMutation();
  const [pending, setPending] = useState(false);

  const logoutHandler = () => {
    logout({});
  };

  return (
    <div className="fixed w-full z-50 bg-white bg-dark">
      <Response
        response={logoutResponse}
        setPending={setPending}
        redirectTo="/"
        type="logout"
      />
      <div className="flex lg:hidden fixed top-0 left-0 z-50 flex-col items-center w-full h-auto py-10 ">
        <div className="flex bg-white bg-dark -mt-12 justify-between items-center px-2 h-full w-full">
          <a href="/" class="flex flex-col mt-2 ms-2 md:me-24">
            <img src={logo} className="w-full h-14" alt="" />
          </a>
          {user ? (
            <div className="flex items-center gap-3">
              <p className="px-2 hidden lg:block py-1 rounded-xl bg-main">
                {user?.name}
              </p>
              <a href={`/dashboard`} className="cursor-pointer">
                Dashboard
              </a>

              <a href={`/dashboard/status`} className="cursor-pointer">
                <div className="items-center flex flex-col justify-center">
                  <button
                    type="button"
                    class="relative inline-flex items-center text-sm font-medium text-center"
                  >
                    <svg
                      class="w-6 h-6 text-gray-800 dark:text-white"
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
                    status
                  </button>
                </div>
              </a>
            </div>
          ) : (
            <div className="flex relative gap-4">
              <div className="">
                <a
                  href="/login"
                  className={`cursor-pointer px-3 h-[70px] absolute -top-5 hover:text-gray-400 pt-5 -left-[70px] flex `}
                >
                  Login
                </a>
              </div>
              <p className="text-gray-600">|</p>
              <div className="relative">
                <a href="/signup" className="cursor-pointer">
                  Register
                </a>
              </div>
            </div>
          )}

          <svg
            onClick={() => {
              const id = document.getElementById("header-mobile");
              id?.classList?.remove("hidden");
              id?.classList?.add("flex");
            }}
            class="w-10 h-10 text-gray-800 dark:text-white"
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

        <div
          id="header-mobile"
          className="h-[100vh] hidden w-full bg-white bg-dark fixed top-0 left-0 z-50 items-center justify-center flex-col"
        >
          <svg
            onClick={() => {
              const id = document.getElementById("header-mobile");
              id?.classList?.add("hidden");
              id?.classList?.remove("flex");
            }}
            class="w-6 h-6 text-gray-800 dark:text-white absolute top-4 right-4 cursor-pointer"
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
              d="M6 18 17.94 6M18 18 6.06 6"
            />
          </svg>

          <ul className="py-5 h-[100vh] overflow-y-scroll w-full">
            <li className="mt-10" role="presentation">
              <a
                href="/"
                className="inline-block hover:text-[rgb(252,45,45)]  w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-300  focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 gap-3"
              >
                Home
              </a>
            </li>
            <li className="" role="presentation">
              <a
                href={user?.role ? `/dashboard/status` : "/login"}
                className="inline-block hover:text-[rgb(252,45,45)]  w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-300  focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 gap-3"
              >
                status
              </a>
            </li>

            <div className="flex items-center hover:text-[rgb(252,45,45)]  w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-300  focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 gap-3">
              <DarkThemeToggle /> <p>Light mode</p>
            </div>
            <li className="" role="presentation">
              <p
                onClick={logoutHandler}
                className="inline-block hover:text-[rgb(252,45,45)]  w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-300  focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 gap-3"
              >
                Logout
              </p>
            </li>
          </ul>
        </div>
      </div>

      <div className="hidden lg:block">
        <div className="w-full flex flex-col lg:flex-row "></div>

        <div className="w-full text-sm text-white py-[5px] lg:px-[18%] bg-[rgb(5,4,4)] flex gap-4 justify-between items-center">
          <div className="flex w-full items-center gap-2 justify-end">
            {user ? (
              <div className="flex items-center gap-5">
                <p className="px-2 py-1 rounded-xl bg-main">{user?.name}</p>
                <a href={`/dashboard`} className="cursor-pointer">
                  Dashboard
                </a>
                <a href={`/dashboard/status`} className="cursor-pointer">
                  <div className="items-center flex flex-col justify-center">
                    <button
                      type="button"
                      class="relative inline-flex items-center text-sm font-medium text-center"
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
                      status
                    </button>
                  </div>
                </a>
                <p onClick={logoutHandler} className="cursor-pointer">
                  Logout
                </p>
              </div>
            ) : (
              <div className="flex gap-4">
                <div className="relative">
                  <a
                    href="/login"
                    className={`cursor-pointer px-3 h-12 absolute -top-3 pt-3 -left-[70px] flex `}
                  >
                    Login
                  </a>
                </div>
                <p className="text-gray-600">|</p>
                <div className="relative">
                  <a href="/signup" className="cursor-pointer">
                    Register
                  </a>
                </div>
              </div>
            )}
            <div className="top-2 right-2 z-50">
              <DarkThemeToggle />
            </div>
          </div>
        </div>

        {/* tabs desktop header nav */}

        <div className="border-b relative shadow-2xl  py-2 md:py-1 border-gray-200 dark:border-gray-700">
          <ul
            className="flex relative z-40  gap-1 flex-wrap items-center justify-center -mb-px text-sm font-medium text-center"
            id="default-tab"
            data-tabs-toggle="#default-tab-content"
            role="tablist"
          >
            <li className="me-2">
              <div className="flex items-center justify-center gap-6">
                {/*  */}
                <div className="flex absolute z-20 shadow-sm -top-[50px] left-[8%] h-auto w-[200px] gap-3 items-center justify-center">
                  <a href="/" class="flex flex-col ms-2 md:me-24">
                    <img src={logo} className="w-20 h-10" alt="" />
                  </a>
                </div>
              </div>
            </li>
            <li className="me-2 ml-[20%] xl:ml-12" role="presentation">
              <a
                href="/"
                className="inline-block hover:text-[rgb(252,45,45)] p-2 rounded-t-lg"
              >
                Home
              </a>
            </li>
            <li className="me-2 ml-2" role="presentation">
              <a
                href={user?.role ? `/dashboard/status` : "/login"}
                className="inline-block hover:text-[rgb(252,45,45)] p-2 rounded-t-lg"
              >
                status
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;

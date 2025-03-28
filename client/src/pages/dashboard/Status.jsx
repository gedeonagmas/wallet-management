import React, { useEffect, useState } from "react";
import { useCreateMutation, useReadQuery } from "../../features/api/apiSlice";
import { Link } from "react-router-dom";
import Loading from "../../components/loading/Loading";

const Status = () => {
  const user = JSON.parse(localStorage.getItem("wallet_user"));

  const { data, isFetching } = useReadQuery({
    url: `/wallet/balance/${user?.id}`,
    tag: ["wallet"],
  });

  return (
    <div>
      <div class="from-white to-red-200 bg-gradient-to-tl dark:bg-gray-700 dark:text-white text-gray-700 rounded-sm shadow-lg px-5 py-6 mx-3 w-full md:w-[90%] md:px-main">
        <p className="text-lg font-bold mb-3">Balance</p>{" "}
        <p class="text-lg mb-2">Your Current Balance</p>
        {data ? (
          <div class="flex w-full my-4 flex-col">
            <div class="text-2xl font-bold text-red-500 mb-2">
              Balance: {data?.balance || 0} Birr
            </div>
            <Link
              to="/dashboard/topup"
              class="font bold hover:text-red-500 mb-2"
            >
              {data?.status}
            </Link>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default Status;

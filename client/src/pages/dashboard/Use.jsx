import React, { useEffect, useState } from "react";
import LoadingButton from "../../components/loading/LoadingButton";
import { useCreateMutation } from "../../features/api/apiSlice";
import Response from "../../components/Response";

const Use = () => {
  const user = JSON.parse(localStorage.getItem("wallet_user"));

  const [createData, createResponse] = useCreateMutation();
  const [createPending, setCreatePending] = useState(false);

  const [amount, setAmount] = useState(0);

  const createHandler = () => {
    createData({
      user_id: user?.id,
      amount: amount,
      url: "/wallet/use",
      tag: ["wallet"],
    });
  };

  useEffect(() => {
    if (createResponse?.status === "fulfilled") {
      window.location.reload();
    }
  }, [createResponse]);

  return (
    <div>
      <Response
        response={createResponse}
        setPending={setCreatePending}
        redirectTo={`/dashboard/status`}
      />

      <div class="from-white to-red-200 bg-gradient-to-tl dark:bg-gray-700 dark:text-white text-gray-700 rounded-sm shadow-lg px-5 py-6 mx-3 w-full md:w-[90%] md:px-main">
        <p className="text-lg font-bold mb-3">Withdraw</p>{" "}
        <p class="text-xs mb-2">withdraw Amount.</p>
        <div class="flex w-full my-4 flex-col">
          <div class="text-sm mb-2">amount</div>

          <input
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            min={0}
            placeholder="0"
            className="w-full bg-dark h-12 p-2.5 px-2 rounded-lg border"
          />
        </div>
        <div className="h-10">
          <LoadingButton
            pending={createPending}
            onClick={createHandler}
            title="Withdraw"
            color="bg-main"
            width="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Use;

import React from "react";
import { useReadQuery } from "../../features/api/apiSlice";

const Overview = () => {
  const user = JSON.parse(localStorage.getItem("wallet_user"));
  const fetchBy = user?.role === "user" ? `user=${user?._id}` : "";

  const { data } = useReadQuery({
    url: `/user/wallet?${fetchBy}&populate=user`,
    tag: ["wallet"],
  });

  const { data: users } = useReadQuery({
    url: `/user/users`,
    tag: ["users"],
  });

  console.log(user, "uuuuuuu");
  return (
    <div className="min-h-[82vh] pb-10 pr-10">
      <p className="text-lg font-bold">
        Well Come <span className="text-main">{user?.name}</span>
      </p>
      <div className="border flex items-center justify-center gap-4 p-5 w-64 mt-4 shadow rounded-lg">
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
            d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
            clip-rule="evenodd"
          />
        </svg>
        {new Date().toDateString()}
      </div>

      <p className="mt-5 font-bold mb-2 text-main text-xl">
        Full Stack Developer.
      </p>
      <p>
        I am a Full Stack Software Developer with a diverse skill set that
        enables me to build dynamic and responsive web applications. Proficient
        in Laravel, php, MongoDB, Express JS, React JS, Node JS, and React
        Native, I am well-equipped to create efficient and scalable full-stack
        solutions.
      </p>

      <p>
        I have hands-on experience in developing RESTful APIs, managing
        databases, and implementing intricate front-end designs, as well as
        mobile application development.
      </p>
    </div>
  );
};

export default Overview;

import React, { useEffect, useState } from "react";
import LoadingButton from "../../components/loading/LoadingButton";
import Response from "../../components/Response";
import { useUpdateMutation } from "../../features/api/apiSlice";

const UsersProfile = () => {
  const user = JSON.parse(localStorage.getItem("wallet_user"));
  const [updateData, updateResponse] = useUpdateMutation();
  const [pending, setPending] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (user) {
      const data = user;
      setName(data?.name ? data.name : name);
      setPhone(data?.phone ? data.phone : phone);
      setCity(data?.city ? data.city : city);
      setEmail(data?.email ? data?.email : email);
      setImage(data?.image ? data.image : image);
    }
  }, []);

  const updateHandler = () => {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("city", city);
    formData.append("email", email);
    formData.append("image", "");
    formData.append("url", `/profile`);
    formData.append("tag", ["users"]);

    updateData(formData);
  };

  return (
    <div className="w-full px-main relative p-5 flex pb-10 flex-col rounded-lg gap-2 items-start justify-center">
      <Response
        response={updateResponse}
        setPending={setPending}
        type="update"
      />
      <p className="text-lg font-semibold">Your profile information</p>

      <div className="hidden mb-5">
        <label class="block text-sm font-medium">Profile Picture</label>
        <div
          style={{
            backgroundImage: `url(${user?.image})`,
            backgroundSize: "160px 160px",
          }}
          class={`mt-4  flex justify-center rounded-full w-40 items-center h-40 p-2 border-2 border-gray-300 border-dashed`}
        >
          <div class="space-y-1 p-1 rounded-xl text-white bg-gray-400/50 text-center">
            <svg
              class="mx-auto h-12 w-12"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <div class="flex text-sm">
              <label
                for="file-upload1"
                class="relative cursor-pointer p-1  rounded-md  font-medium  hover:text-red-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
              >
                <span class="">Upload a profile</span>
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  id="file-upload1"
                  name="file-upload1"
                  type="file"
                  class="sr-only"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="grid w-full mt-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2">
        <div className="mb-5">
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            id="name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name"
            required
          />
        </div>

        <div className="mb-5">
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="text"
            id="name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="email"
            required
          />
        </div>

        <div className="mb-5">
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Phone
          </label>
          <input
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            type="text"
            id="phone"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="phone"
            required
          />
        </div>

        <div className="mb-5">
          <label
            for="city"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            City
          </label>
          <input
            onChange={(e) => setCity(e.target.value)}
            value={city}
            type="text"
            id="city"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="City"
            required
          />
        </div>
      </div>
      <div className="mt-6">
        <LoadingButton
          pending={pending}
          onClick={updateHandler}
          title="Update Profile"
          color="bg-main"
          width="w-52"
        />
      </div>
    </div>
  );
};

export default UsersProfile;

import React from "react";
import { useLoaderData } from "react-router-dom";
function Github() {
  const data = useLoaderData()

  return (
    <div className="text-center mx-80 my-10 bg-gray-500 text-white p-10 text-3xl">
      GitHub Followers:{data.followers}
      <img src={data.avatar_url} alt="Github Picture" width={300} />
    </div>
  );
}

export default Github;

export const gitHubInfoLoader = async () => {
  const response = await fetch("https://api.github.com/users/vashu4832");
  return response.json();
};

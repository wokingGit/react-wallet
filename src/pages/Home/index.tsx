import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    console.log("Home Page");

    fetch("/webapi/getlist", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    })
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(data => {
        console.log(data); // 处理获取的数据
      });
  });
  return (
    <div>
      <h2 className="text-red-500">Home Page!!!</h2>
    </div>
  );
};

export default Home;

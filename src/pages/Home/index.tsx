import { useEffect } from "react";
import Worker from "worker-loader!@components/hello/worker";

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

  useEffect(() => {
    const worker = new Worker();

    worker.onmessage = event => {
      console.log("Result from worker:", event.data);
    };

    worker.postMessage(5);
    worker.postMessage(10);

    // 清理 Worker 实例
    return () => {
      worker.terminate();
    };
  }, []);

  return (
    <div>
      <h2 className="text-red-500">Home Page!!!</h2>
      <div>第二</div>
    </div>
  );
};

export default Home;

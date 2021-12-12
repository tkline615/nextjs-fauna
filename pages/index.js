import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  async function getData() {
    const res = await fetch("/api/getCustomers");
    const newData = await res.json();
    setData(newData);
  }
  useEffect(() => {
    getData();
  }, []);
  return <div></div>;
}

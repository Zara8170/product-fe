import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { addProduct } from "../redux/productSlice";
import Header from "./Header";

export default function Layout() {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   fetch("http://localhost:8080/product-list")
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw new Error("초기 상품정보 수신 오류");
  //       }
  //       return res.json();
  //     })
  //     .then((data) => {
  //       data.map((t) => dispatch(addProduct(t)));
  //     })
  //     .catch((error) => {
  //       console.log("Error fetching product:", error);
  //     });
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/product-list");
        if (!response.ok) {
          throw new Error("초기 상품정보 수신 오류");
        }
        const result = await response.json();
        result.map((t) => dispatch(addProduct(t)));
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <header>
        <Header />
      </header>
      <div className="flex flex-wrap gap-5 ml-4">
        <Outlet />
      </div>
    </>
  );
}

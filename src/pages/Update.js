import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateProduct } from "../redux/productSlice";

export default function Update() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const nav = useNavigate();
  const product = useSelector((state) =>
    state.product.products.find((p) => p.id === parseInt(id))
  );

  const [inputTitle, setInputTitle] = useState("");
  const [inputPrice, setInputPrice] = useState("");

  useEffect(() => {
    if (product) {
      setInputTitle(product.title);
      setInputPrice(product.price);
    }
  }, []);

  const onClickUpdate = async (e) => {
    e.preventDefault();
    const prod = {
      id: parseInt(id),
      title: inputTitle,
      price: inputPrice,
      imgsrc: "http://via.placeholder.com/150x150/ffff00",
    };

    // fetch("http://localhost:8080/product", {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(prod),
    // })
    //   .then((res) => {
    //     if (!res.ok) {
    //       throw new Error("수정중 오류 발생");
    //     }
    //     return res.json();
    //   })
    //   .then((data) => {
    //     dispatch(updateProduct(data));
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    try {
      const response = await fetch("http://localhost:8080/product", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(prod),
      });
      const result = await response.json();
      dispatch(updateProduct(result));
    } catch (error) {
      console.log(error);
    }

    nav("/list");
  };

  return (
    <div>
      <form onSubmit={onClickUpdate}>
        <label htmlFor="title">상품이름 : </label>
        <input
          className="border rounded-md border-black mr-3 p-2"
          type="text"
          name="title"
          value={inputTitle}
          onChange={(e) => setInputTitle(e.target.value)}
        />
        <label htmlFor="price">상품가격 : </label>
        <input
          className="border rounded-md border-black mr-3 p-2"
          type="text"
          name="price"
          value={inputPrice}
          onChange={(e) => setInputPrice(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 rounded-md text-white p-2">
          저장
        </button>
      </form>
    </div>
  );
}

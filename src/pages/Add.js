import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../redux/productSlice";

export default function Add() {
  const [inputTitle, setInputTitle] = useState("");
  const [inputPrice, setInputPrice] = useState("");
  const titleRef = useRef(null);
  const priceRef = useRef(null);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const onSubmitAdd = async (e) => {
    e.preventDefault();
    if (!inputTitle) {
      titleRef.current.focus();
      alert("제목을 입력하세요.");
      return;
    }
    if (!inputPrice) {
      priceRef.current.focus();
      alert("가격을 입력하세요.");
      return;
    }

    const numericPrice = parseInt(inputPrice, 10);
    if (isNaN(numericPrice)) {
      alert("가격은 숫자만 입력 가능합니다.");
      return;
    }

    // fetch("http://localhost:8080/product", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ title: inputTitle, price: numericPrice }),
    // })
    //   .then((res) => {
    //     if (!res.ok) {
    //       throw new Error("세상품 등록 오류 발생");
    //     }
    //     return res.json();
    //   })
    //   .then((data) => {
    //     dispatch(addProduct(data));
    //   })
    //   .catch((error) => console.log(error));
    nav("/list");

    try {
      const response = await fetch("http://localhost:8080/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: inputTitle, price: numericPrice }),
      });
      if (!response.ok) {
        throw new Error("세상품 등록 오류 발생");
      }
      const result = await response.json();
      dispatch(addProduct(result));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmitAdd}>
        <label htmlFor="title">상품이름 : </label>
        <input
          className="border rounded-md border-black mr-3 p-2"
          type="text"
          name="title"
          value={inputTitle}
          onChange={(e) => setInputTitle(e.target.value)}
          ref={titleRef}
        />
        <label htmlFor="price">상품가격 : </label>
        <input
          className="border rounded-md border-black mr-3 p-2"
          type="number"
          name="price"
          value={inputPrice}
          onChange={(e) => setInputPrice(e.target.value)}
          ref={priceRef}
        />
        <button type="submit" className="bg-blue-500 rounded-md text-white p-2">
          저장
        </button>
      </form>
    </div>
  );
}

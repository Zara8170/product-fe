import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct } from "../redux/productSlice";

export default function Home() {
  const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch();

  const handleDelete = async (e) => {
    // fetch("http://localhost:8080/product/" + e.target.id, {
    //   method: "DELETE",
    // })
    //   .then((res) => {
    //     if (!res.ok) {
    //       throw new Error("삭제중 오류 발생");
    //     }
    //     return res.json(); // or res.text()도 가능
    //   })
    //   .then((data) => {
    //     if (Number(data) === -1) {
    //       throw new Error("없는 아이디 상품입니다.");
    //     }
    //     dispatch(deleteProduct(Number(data))); // 아이디가 문자열로 오기 때문에 변형해줘야됨
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    try {
      const response = await fetch(
        "http://localhost:8080/product/" + e.target.id,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("삭제중 오류 발생");
      }
      const result = await response.json();

      if (Number(result) === -1) {
        throw new Error("없는 아이디 상품입니다.");
      }
      dispatch(deleteProduct(result));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {products.map((product) => (
        <div key={product.id} className="w-fit mb-3">
          <Link to={`/list/detail/${product.id}`}>
            <img src={product.imgsrc} />
          </Link>
          <div className="flex content-center my-3 gap-2">
            <h2 className=" w-fit">{product.title} :</h2>{" "}
            <p>{product.price.toLocaleString()} 원</p>
          </div>
          <Link to={`/list/update/${product.id}`}>🖋️</Link>&nbsp;&nbsp;
          <button id={product.id} onClick={handleDelete}>
            🗑️
          </button>
        </div>
      ))}
    </>
  );
}

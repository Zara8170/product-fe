import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="w-full bg-gray-400 text-white p-3 mb-5">
      <h1 className="text-3xl pb-2">상품 관리</h1>
      <Link to="/list" className="hover:underline">
        상품리스트
      </Link>
      &nbsp;&nbsp;&nbsp;
      <Link to="/list/add" className="hover:underline">
        상품추가
      </Link>
    </div>
  );
}

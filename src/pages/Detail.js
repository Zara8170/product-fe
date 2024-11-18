import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

export default function Detail() {
  const { id } = useParams();
  const product = useSelector((state) =>
    state.product.products.find((p) => p.id === parseInt(id))
  );
  return (
    <div>
      <img src={product.imgsrc} />
      <h2>{product.title}</h2>
      <h2>{product.price.toLocaleString()}</h2>
      <Link to={`/list/update/${product.id}`}>🖋️</Link>&nbsp;&nbsp;
    </div>
  );
}

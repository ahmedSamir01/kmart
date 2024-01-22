/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FetchData from "server/FetchData";
import Order from "components/order";
import { useCartItem } from "hooks/useCart";

function Product() {
  const { id } = useParams();
  const Navigate = useNavigate();

  const { isLoading, data, isError, error } = useCartItem(id);

  if (isLoading) {
    return <h2>loading...</h2>;
  }
  if (isError) {
    return <h2>{error?.message}</h2>;
  }

  return (
    <section className="my-4 cart-details">
      <div className="container-fluid px-4">
        <button
          className="btn btn-primary mb-3"
          onClick={() => Navigate("/products")}
        >
          back
        </button>
        <div className="row">
          <div className="col-12">
            <h2 className="mb-4">{data.title}</h2>
            <p>{data.description}</p>
          </div>
          <div className="col-md-6">
            {data.image && (
              <img
                className="img-fluid mt-4 w-100"
                src={data.image}
                alt="item"
              />
            )}
          </div>
          <div className="col-md-6 align-items-center d-flex ps-5">
            <Order data={data} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Product;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "rtk/slices/productsSlice";
import Card from "components/card";

function Products() {
  const productsList = useSelector((store) => store.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="mt-5">
      <div className="container-fluid">
        <div className="row w-100 g-0">
          {productsList?.length ? (
            productsList.map((item) => (
              <div className="cart-item col-md-4 col px-4 mb-5" key={item.id}>
                <Card {...item} />
              </div>
            ))
          ) : (
            <p>No data to show</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Products;

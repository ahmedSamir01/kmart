import Card from "components/Card";
import { useState } from "react";
import { useEffect } from "react";
import FetchData from "server/FetchData";

function Products() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    FetchData("/products")
      .then((e) => {
        setItems(e);
      })
      .catch(alert);
  }, []);

  return (
    <section className="mt-5">
      <div className="container-fluid">
        <div className="row w-100 g-0">
          {items?.length ? (
            items.map((item) => (
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

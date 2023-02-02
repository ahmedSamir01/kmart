import Card from "components/Card";
import { useState, useEffect } from "react";
import FetchData from "server/FetchData";

function Cart() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    FetchData("/shopping-items", { method: "GET" }, (e) => setItems(e));
  }, []);

  return (
    <section className="mt-5">
      <div className="container-fluid">
        <div className="row w-100 g-0">
          {items?.length ? (
            items.map((item) => (
              <div className="cart-item col-md-4 col px-4 mb-5" key={item.id}>
                <Card {...item} readOnly={false} isAdmin={false} />
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

export default Cart;

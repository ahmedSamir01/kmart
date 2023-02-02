import { useEffect, useState } from "react";
import Card from "components/Card";
import FetchData from "server/FetchData";
import SweetAlert from "components/SweetAlert";

export default function Content() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    FetchData("/cart", { method: "GET" }, (e) => setItems(e));
  }, []);

  const deleteTaks = (id) => {
    FetchData(`/cart/${id}`, { method: "DELETE" }, () =>
      SweetAlert(() => setItems(items.filter((item) => item.id !== id)))
    );
  };

  return (
    <section>
      <div className="row w-100">
        {items?.length ? (
          items.map((item) => (
            <div className="col-md-4 col px-4 mb-5" key={item.id}>
              <Card
                {...item}
                readOnly={false}
                isAdmin={true}
                handleDelete={deleteTaks}
              />
            </div>
          ))
        ) : (
          <p>No data to show</p>
        )}
      </div>
    </section>
  );
}

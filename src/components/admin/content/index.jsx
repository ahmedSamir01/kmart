import { useEffect, useState } from "react";
import Card from "components/card";
import FetchData from "server/FetchData";
import SweetAlert from "components/sweetAlert";

export default function Content() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    FetchData("/cart", { method: "GET" })
      .then((e) => setItems(e))
      .catch((err) => console.error(err));
  }, []);

  const deleteTaks = (id) => {
    FetchData(`/cart/${id}`, { method: "DELETE" })
      .then(() => {
        SweetAlert(() => setItems(items.filter((item) => item.id !== id)));
      })
      .catch((err) => console.error(err));
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

import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";

function Cart() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // FetchData("/products", { method: "GET" }, (e) => setItems(e));
  }, []);

  return (
    <section className="mt-5">
      <div className="container-fluid">
        <div className="row w-100 g-0">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>title</th>
                <th>image</th>
                <th>price</th>
                <th>quantity</th>
                <th>actions</th>
              </tr>
            </thead>
            <tbody>
              {items?.length ? (
                items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.image}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>actions</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>no data to show</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </section>
  );
}

export default Cart;

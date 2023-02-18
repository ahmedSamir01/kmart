import { useContext, useEffect } from "react";
import { Table, Image, Button } from "react-bootstrap";
import { stateContext } from "context/CartContext";

function Cart() {
  const { cartList, handleClear, handleRemove } = useContext(stateContext);

  const totalPrice = cartList.reduce(
    (accumulator, currentValue) =>
      (accumulator += currentValue.price * currentValue.quantity),
    0
  );

  return (
    <section className="mt-5">
      <div className="container-fluid">
        <Button className="mb-3 me-3" onClick={handleClear} variant="primary">
          Clear
        </Button>
        <span className="total">Total: {totalPrice}$</span>
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
              {cartList?.length ? (
                cartList.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td className="text-center">
                      <Image
                        style={{ width: "50px", height: "50px" }}
                        fluid
                        rounded
                        thumbnail
                        src={item.image}
                      />
                    </td>
                    <td>{item.price}$</td>
                    <td>{item.quantity}</td>
                    <td>
                      <Button
                        onClick={() => handleRemove(item.id)}
                        size="sm"
                        variant="outline-danger"
                      >
                        delete
                      </Button>
                    </td>
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

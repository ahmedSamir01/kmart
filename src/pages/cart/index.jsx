import Card from "components/card";
import useFetch from "hooks/useFetch";

function Cart() {
  const [fetchedItems] = useFetch("/shopping-items");

  return (
    <section className="mt-5">
      <div className="container-fluid">
        <div className="row w-100 g-0">
          {fetchedItems?.length ? (
            fetchedItems.map((item) => (
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

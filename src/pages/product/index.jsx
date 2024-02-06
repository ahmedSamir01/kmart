import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useShopItem } from "hooks/useShop";
import UpdateCart from "components/updateCart/UpdateCart";

function Product() {
  const { id } = useParams();
  const { state } = useLocation();
  const pageNumber = state?.pageNumber;
  const Navigate = useNavigate();

  const { isLoading, data, isError, error } = useShopItem({ id, pageNumber });

  if (isLoading) {
    return <h2>loading...</h2>;
  }
  if (isError) {
    return <h2>{error?.message}</h2>;
  }

  return (
    <section className="my-4 cart-details">
      <div className="container-fluid px-4">
        <button className="btn btn-primary mb-3" onClick={() => Navigate(-1)}>
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
          {data ? <UpdateCart shopItem={data} /> : null}
        </div>
      </div>
    </section>
  );
}

export default Product;

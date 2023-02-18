import { useRecoilState } from "recoil";
import cartState from "atoms/cartSlice";

function Card(props) {
  const { image, title, description } = props;
  const [cartList, setCartList] = useRecoilState(cartState);

  function handleAdd(item) {
    const foundedProduct = cartList.find((e) => e.id === item.id);
    if (foundedProduct) {
      const newList = cartList.map((e) => {
        if (e.id === item.id) {
          return { ...foundedProduct, quantity: foundedProduct.quantity + 1 };
        } else {
          return e;
        }
      });
      setCartList(newList);
    } else {
      setCartList((list) => list.concat({ ...item, quantity: 1 }));
    }
  }

  return (
    <div className="card p-3 pb-0">
      <img src={image} className="card-img-top" alt={title} />
      <div className="card-body mt-2 border-top d-flex flex-column">
        <h4 className="card-title strong">{title}</h4>
        <p className="card-text max-text mt-2">{description}</p>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => handleAdd(props)}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default Card;

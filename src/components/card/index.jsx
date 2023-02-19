import { useDispatch } from "react-redux";
import { addProduct } from "store/actions/cartActions";

function Card(props) {
  const { image, title, description } = props;
  const dispatch = useDispatch();

  return (
    <div className="card p-3 pb-0">
      <img src={image} className="card-img-top" alt={title} />
      <div className="card-body mt-2 border-top d-flex flex-column">
        <h4 className="card-title strong">{title}</h4>
        <p className="card-text max-text mt-2">{description}</p>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => dispatch(addProduct(props))}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default Card;

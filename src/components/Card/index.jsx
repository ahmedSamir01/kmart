import { useContext } from "react";
import { stateContext } from "context/CartContext";

function Card(props) {
  const { image, title, id, description } = props;
  const { handleAdd } = useContext(stateContext);

  function handleAdd() {
    // code here
  }

  return (
    <div className="card p-3 pb-0">
      <img src={image} className="card-img-top" alt={title} />
      <div className="card-body mt-2 border-top d-flex flex-column">
        <h4 className="card-title strong">{title}</h4>
        <p className="card-text max-text">{description}</p>
        <button type="button" className="btn btn-primary" onClick={handleAdd}>
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default Card;

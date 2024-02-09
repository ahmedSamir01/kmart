import { Link, useNavigate } from "react-router-dom";
import Order from "components/order";
import Spinner from "shared/Spinner";
import { useState } from "react";

function Card(props) {
  const Navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    image,
    title,
    id,
    description,
    isAdmin,
    handleDelete,
    readOnly,
    count,
    pageNumber = 1,
  } = props;

  const cardBody = () => {
    if (isAdmin) {
      return (
        <div className="card-controls mt-auto">
          <button
            className="btn px-2 py-1 border me-2"
            onClick={() => handleDelete(id, setIsLoading)}
            disabled={isLoading}
          >
            <i className="fa fa-trash text-danger" />
          </button>
          <button
            className="btn px-2 py-1 border me-3"
            onClick={() => Navigate(`control/${id}`)}
          >
            <i className="fa fa-edit text-success" />
          </button>
          {isLoading ? <Spinner size="sm" /> : null}
        </div>
      );
    } else if (!readOnly) {
      return (
        <div className="card-controls mt-auto">
          <Order
            itemData={{
              image: image,
              title: title,
              id: id,
              description: description,
              count: count,
            }}
          />
        </div>
      );
    }
  };

  return (
    <div className="card p-3 pb-0">
      <img src={image} className="card-img-top" alt={title} />
      <div className="card-body mt-2 border-top d-flex flex-column">
        {readOnly ? (
          <Link className="card-title" to={`${id}`} state={{ pageNumber }}>
            {title}
          </Link>
        ) : (
          <p className="card-title h4">{title}</p>
        )}

        <p className="card-text max-text">{description}</p>
        {cardBody()}
      </div>
    </div>
  );
}

export default Card;

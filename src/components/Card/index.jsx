import { Link, useNavigate } from "react-router-dom";
import Order from "components/Order";

function Card(props) {
  const Navigate = useNavigate();

  const {
    image,
    title,
    id,
    description,
    isAdmin,
    handleDelete,
    readOnly,
    count,
  } = props;

  const cardBody = () => {
    if (isAdmin) {
      return (
        <div className="card-controls mt-auto">
          <button
            className="btn px-2 py-1 border me-2"
            onClick={() => handleDelete(id)}
          >
            <i className="fa fa-trash text-danger" />
          </button>
          <button
            className="btn px-2 py-1 border"
            onClick={() => Navigate(`control/${id}`)}
          >
            <i className="fa fa-edit text-success" />
          </button>
        </div>
      );
    } else if (!readOnly) {
      return (
        <div className="card-controls mt-auto">
          <Order
            data={{
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
          <Link className="card-title" to={`${id}`}>
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

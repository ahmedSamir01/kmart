import { useEffect } from "react";
import { useState } from "react";

function Order({ data }) {
  const [isloading, setIsloading] = useState(false);
  const count = 0;

  useEffect(() => {
    // data.count && setCount(data.count);
  }, []);

  const handleAdd = () => {
    // code here
  };

  const handleRemove = () => {
    // code here
  };

  return (
    <>
      <button
        disabled={isloading}
        className="btn px-2 py-1 border me-2 bg-success"
        onClick={handleAdd}
      >
        <i className="fa fa-plus text-white" />
      </button>
      <button
        disabled={isloading}
        className="btn px-2 py-1 border me-3 bg-danger"
        onClick={handleRemove}
      >
        <i className="fa fa-minus text-white" />
      </button>
      <span>{count}</span>
      {isloading && (
        <div className="spinner-border ms-2 spinner-border-sm" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
    </>
  );
}

export default Order;

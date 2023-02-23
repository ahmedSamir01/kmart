import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SweetAlert from "components/sweetAlert";
import FetchData from "server/FetchData";

export default function ContentControl({ editable }) {
  let { id } = useParams();

  const [IsDirty, setisDirty] = useState(false);
  const [data, setData] = useState({
    title: "",
    description: "",
    image: "",
  });

  // Check if the component is for edit or create!
  useEffect(() => {
    if (editable) {
      FetchData(`/cart/${id}`, { method: "GET" })
        .then((e) => setData(e))
        .catch((err) => console.error(err));
    } else {
      setData({ title: "", description: "", image: "" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editable]);

  // Callback fn, triggered after successful submitting
  function fetchDataCallback() {
    SweetAlert(() => {
      !editable && setData({ title: "", description: "", image: "" });
      setisDirty(false);
    });
  }
  // Triggered when submitting (create / edit)
  const fetchData = (formData) => {
    const options = {
      method: editable ? "PUT" : "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    };
    FetchData(editable ? `/cart/${id}` : "/cart", options)
      .then(fetchDataCallback)
      .catch((err) => console.error(err));
  };

  // When submit the form
  function handleSubmit(e) {
    e.preventDefault();
    IsDirty && fetchData(data);
  }

  // When change form inputs
  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
    setisDirty(true);
  }

  const inputsNames = ["title", "description", "image"];

  return (
    <form onSubmit={handleSubmit}>
      {inputsNames?.map((name, i) => (
        <InputBody
          name={name}
          key={i}
          data={data}
          handleChange={handleChange}
        />
      ))}
      <div className="mt-5 text-center">
        <input type="submit" className="btn btn-success" value="Save" />
      </div>
    </form>
  );
}

const InputBody = ({ name, data, handleChange }) => (
  <div className="mb-3">
    <label htmlFor={name} className="form-label">
      {name}
    </label>
    <input
      required
      type="text"
      name={name}
      value={data[name]}
      onChange={handleChange}
      className="form-control"
      id={name}
    />
  </div>
);

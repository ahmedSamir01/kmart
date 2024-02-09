import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import SweetAlert from "components/sweetAlert";
import FetchData from "server/FetchData";
import { useShopItem } from "hooks/useShop";

export default function ContentControl({ editable }) {
  let { id } = useParams();
  const { state } = useLocation();
  const pageNumber = state?.pageNumber;

  const { data: productsList, refetch } = useShopItem({
    id,
    pageNumber,
    enabled: false,
  });

  // const [IsDirty, setisDirty] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
  });

  // Check if the component is for edit or create!
  useEffect(() => {
    (async function fetchData() {
      if (editable) {
        if (productsList) {
          setFormData(productsList);
        } else {
          await refetch();
        }
      } else {
        setFormData({ title: "", description: "", image: "" });
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editable, productsList]);

  // Callback fn, triggered after successful submitting
  // function fetchDataCallback() {
  //   SweetAlert(() => {
  //     !editable && setFormData({ title: "", description: "", image: "" });
  //     setisDirty(false);
  //   });
  // }
  // Triggered when submitting (create / edit)
  // const fetchData = (formData) => {
  //   const options = {
  //     method: editable ? "PUT" : "POST",
  //     body: JSON.stringify(formData),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   };
  //   FetchData(editable ? `/cart/${id}` : "/cart", options)
  //     .then(fetchDataCallback)
  //     .catch((err) => console.error(err));
  // };

  // When submit the form
  function handleSubmit(e) {
    // e.preventDefault();
    // IsDirty && fetchData(data);
  }

  // When change form inputs
  function handleChange(e) {
    // setFormData({ ...data, [e.target.name]: e.target.value });
    // setisDirty(true);
  }

  const inputsNames = ["title", "description", "image"];

  return (
    <form onSubmit={handleSubmit}>
      {inputsNames?.map((name, i) => (
        <InputBody
          name={name}
          key={i}
          data={formData}
          handleChange={handleChange}
        />
      ))}
      <div className="mt-5 text-center">
        <input type="submit" className="btn btn-success" value="Save" />
      </div>
    </form>
  );
}

const InputBody = ({ name, data, handleChange }) => {
  console.log({ name, data, handleChange });
  return (
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
};

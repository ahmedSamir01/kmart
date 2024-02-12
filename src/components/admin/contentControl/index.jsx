import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useMutateShopList, useShopItem } from "hooks/useShop";
import SweetAlert from "components/sweetAlert";
import Spinner from "shared/Spinner";
import BackButton from "components/backButton";

export default function ContentControl({ editable }) {
  let { id } = useParams();
  const { state } = useLocation();
  const pageNumber = state?.pageNumber;

  const { data: productsList, refetch } = useShopItem({
    id,
    pageNumber,
    enabled: false,
  });

  const { mutate: UpdatShopList, isLoading } = useMutateShopList(pageNumber);

  const [IsDirty, setisDirty] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
  });

  const getFormData = async () => {
    if (editable) {
      if (productsList) {
        setFormData(productsList);
      } else {
        await refetch();
      }
    } else {
      setFormData({ title: "", description: "", image: "" });
    }
  };

  // Check if the component is for edit or create!
  useEffect(() => {
    getFormData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editable, productsList]);

  // Callback fn, triggered after successful submitting
  function fetchDataCallback() {
    SweetAlert(() => {
      !editable && setFormData({ title: "", description: "", image: "" });
      setisDirty(false);
    });
  }

  // Triggered when submitting (create / edit)
  const fetchData = () => {
    UpdatShopList({
      options: {
        method: editable ? "PUT" : "POST",
        body: formData,
      },
      onSuccess: fetchDataCallback,
      onError: (err) => console.error(err),
    });
  };

  // When submit the form
  function handleSubmit(e) {
    e.preventDefault();
    IsDirty && fetchData();
  }

  // When change form inputs
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setisDirty(true);
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
      <div className="d-flex mt-5 justify-content-center">
        <button
          type="submit"
          className="btn btn-success update-shop-list-btn me-3"
          disabled={isLoading}
        >
          {isLoading ? <Spinner size="sm" /> : "Save"}
        </button>
        <BackButton url={editable ? `/dashboard?page=${pageNumber}` : null} />
      </div>
    </form>
  );
}

const InputBody = ({ name, data, handleChange }) => {
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

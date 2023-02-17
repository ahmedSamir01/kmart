import { useNavigate } from "react-router-dom";

export default function Navigator({ path }) {
  const Navigate = useNavigate();
  console.log(path);
  return (
    <button className="btn btn-primary mb-3" onClick={() => Navigate(path)}>
      back
    </button>
  );
}

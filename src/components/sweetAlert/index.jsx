import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const SweetAlert = (callBackFn) => {
  const MySwal = withReactContent(Swal);

  MySwal.fire({
    title: <p className="m-0">done successflly</p>,
    position: "top",
  }).then(() => {
    callBackFn();
  });
};

export default SweetAlert;

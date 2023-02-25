import SweetAlert from "components/sweetAlert";
import FetchData from "server/FetchData";
import useFetch from "hooks/useFetch";
import Card from "components/card";

export default function Content() {
  const [fetchedItems, setFetchedItems] = useFetch("/cart");

  const deleteTaks = (id) => {
    FetchData(`/cart/${id}`, { method: "DELETE" })
      .then(() => {
        SweetAlert(() =>
          setFetchedItems(fetchedItems.filter((item) => item.id !== id))
        );
      })
      .catch((err) => console.error(err));
  };

  return (
    <section>
      <div className="row w-100">
        {fetchedItems?.length ? (
          fetchedItems.map((item) => (
            <div className="col-md-4 col px-4 mb-5" key={item.id}>
              <Card
                {...item}
                readOnly={false}
                isAdmin={true}
                handleDelete={deleteTaks}
              />
            </div>
          ))
        ) : (
          <p>No data to show</p>
        )}
      </div>
    </section>
  );
}

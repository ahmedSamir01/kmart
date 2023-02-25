import { useState, useEffect } from "react";
import FetchData from "server/FetchData";

export default function useFetch(url) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    FetchData(url)
      .then((e) => setItems(e))
      .catch((err) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [items, setItems];
}

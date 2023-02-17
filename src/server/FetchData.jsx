const FetchData = async (endpoint, settings) => {
  let response = await fetch(`https://fakestoreapi.com${endpoint}`);

  if (response.status === 200) {
    let json = await response.json();
    return json;
  }

  throw new Error(response.status);
};

export default FetchData;

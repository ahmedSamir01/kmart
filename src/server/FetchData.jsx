const FetchData = async (endpoint, settings) => {
  const response = await fetch(`http://localhost:5000${endpoint}`, settings);

  if (response.ok) {
    let json = await response.json();
    return json;
  }

  throw new Error(response.status);
};

export default FetchData;

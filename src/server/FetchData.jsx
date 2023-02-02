const FetchData = async (endpoint, settings, handleFetch, execption) => {
  const response = await fetch(`http://localhost:5000${endpoint}`, settings);

  if (response.ok) {
    let data = await response.json();
    handleFetch && handleFetch(data);
  } else {
    execption && execption();
  }
};

export default FetchData;

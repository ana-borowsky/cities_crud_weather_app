export const fetchAllCities = async () => {
  try {
    const response = await axios.get("http://localhost:8800/cities");
    setAllCities(response.data);

    if (isInitialLoad) {
      const lastSearch = localStorage.getItem("lastCitySearch");
      if (lastSearch) {
        const cityNames = lastSearch.split(",").map((name) => name.trim());
        const filtered = response.data.filter((city) =>
          cityNames.includes(city.name)
        );
        setDisplayedCities(filtered);

        if (filtered.length === 0 && cityNames.length > 0) {
          addToast(`No cities found for: "${lastSearch}"`, "error");
        }
      } else {
        setDisplayedCities(response.data);
      }
      setIsInitialLoad(false);
    }
  } catch (error) {
    console.error("Error fetching cities:", error);
    addToast("Error loading cities.", "error");
  }
};

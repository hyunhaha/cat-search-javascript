const APIEndPoint = 'https://api.thecatapi.com/v1';
const request = async url => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return data
    } else {
      const errorData = await response.json();
      return errorData
    }
  } catch (error) {
    throw {
      message: error.message,
      status: error.status
    };
  }
};
const api = {
  fetchCats: async keyword => {
    try {
      const breeds = await request(`${APIEndPoint}/breeds/search?q=${keyword}`);
      const requests = breeds.map(async breed => {
        return await request(`${APIEndPoint}/images/search?limit=20&breed_ids=${breed.id}`);
      });
      const responses = await Promise.all(requests);
      const result = Array.prototype.concat.apply([], responses)
      return {
        isError: false,
        data: result

      }
    } catch (error) {
      return {
        isError: true,
        data: error
      }
    }
  },
}
export { api }
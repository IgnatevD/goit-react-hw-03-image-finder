function fetchPixabay(nextName, page) {
  const API = "22732940-a59bc7fc166a5b76f0ac36f93";

  return fetch(`https://pixabay.com/api/?q=${nextName}&page=${page}&key=${API}&image_type=photo&orientation=horizontal&per_page=12
          `).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(
      new Error(`Нет изображений с таким именем ${nextName}`)
    );
  });
}
const pixAPI = { fetchPixabay };

export default pixAPI;

function fetchCountries(country) {
  return fetch(
    `https://pixabay.com/api/?key=21858532-01f8fabf05f69063186fd3644&q=yellow+flowers&image_type=photo`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

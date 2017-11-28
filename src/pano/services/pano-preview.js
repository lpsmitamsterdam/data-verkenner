const apiUrl = `https://${process.env.NODE_ENV !== 'production' ? 'acc.' : ''}api.data.amsterdam.nl/`;

export default function fetchPano(location) {
  const searchParams = {
    lat: location.latitude,
    lon: location.longitude,
    width: 438,
    radius: 180
  };

  const queryString = Object.keys(searchParams)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(searchParams[key])}`)
    .join('&');

  return fetch(`${apiUrl}panorama/thumbnail/?${queryString}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else if (response.status === 404) {
        return {};
      }
      throw new Error('Error requesting a panoramic view');
    })
    .then((response) => ({
      id: response.pano_id,
      url: response.url
    }));
}

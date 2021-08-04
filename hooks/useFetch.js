export default function useFetch() {
  const get = (url) => {
    return fetch(url).then((r) => r.json());
  };

  const post = (url, obj) => {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    }).then((r) => r.json());
  };

  return { get, post };
}

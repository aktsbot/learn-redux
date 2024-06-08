export let favs = [
  {
    id: 1717828286087,
    text: "The watchmen",
  },
];

export const updateFav = ({ id, text }) => {
  const fav = favs.find((f) => f.id == id);
  if (!fav) {
    return false;
  }
  fav.text = text;
  return true;
};

export const deleteFav = ({ id }) => {
  const fav = favs.find((f) => f.id == id);
  if (!fav) {
    return false;
  }
  favs = favs.filter((f) => f.id != id);
  return true;
};

export const getAllFavs = () => favs;

export const addFav = ({ text }) => {
  const fav = {
    id: new Date().getTime(),
    text: text.trim(),
  };

  favs.push(fav);

  return true;
};

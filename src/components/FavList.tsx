import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { TRootState, TAppDispatch } from "../state/store";
import { fetchFavs } from "../state/fav/favSlice";

const FavList = () => {
  const { favs, isLoading, error } = useSelector(
    (state: TRootState) => state.fav
  );
  const dispatch = useDispatch<TAppDispatch>();

  useEffect(() => {
    dispatch(fetchFavs());
  }, [dispatch]);

  return (
    <div>
      <h2>Fav list</h2>
      {isLoading && <p>Loading ...</p>}
      {error && <p>Error: {error}</p>}

      {favs.map((f) => (
        <div key={f.id}>
          <p>{f.text}</p>
        </div>
      ))}
    </div>
  );
};

export default FavList;

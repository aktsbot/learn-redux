import { useState } from "react";
import { useDispatch } from "react-redux";

import { addFav } from "../state/fav/favSlice";
import { TAppDispatch } from "../state/store";

const FavForm = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch<TAppDispatch>();

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    const payload = {
      text,
    };
    console.log(`Sending ${JSON.stringify(payload)}`);
    dispatch(addFav(payload));
    setText("");
  }

  return (
    <div>
      <h2>Add fav</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="favText">Text</label>
        <input
          type="text"
          id="favText"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <input type="submit" value="add" />
      </form>
    </div>
  );
};

export default FavForm;

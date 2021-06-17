import Item from "./Item";
import { useHistory } from "react-router-dom";

const MyItems = () => {
  const history = useHistory();
  return (
    <>
      {/* add a way to delete item */}
      <Item />
      <Item />
      <Item />
      {/*  */}
      <button
        onClick={() => {
          history.push("/additem");
        }}
      >
        {" "}
        Add an Item{" "}
      </button>
    </>
  );
};

export default MyItems;

import Item from "./Item";

const Welcome = () => {
  return (
    <div className="container">
      <div className="row">
        <form>
          <div className="row">
            <div className="input-field col s6">
              <i className="material-icons prefix">search</i>
              <input type="text" id="search_input" className="validate" />
              <label htmlFor="search_input">What are you looking for?</label>
            </div>
          </div>
        </form>
      </div>
      <div>
        <h4 className="center-align">Electronics</h4>
        <Item />
        <Item />
        <Item />
        <Item />
      </div>
      <div>
        <h4 className="center-align">Tools / DIY</h4>
        <Item />
        <Item />
        <Item />
        <Item />
      </div>
    </div>
  );
};

export default Welcome;

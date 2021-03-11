import React from 'react';
import { observer } from 'mobx-react';

// eslint-disable-next-line react-hooks/rules-of-hooks
const SelectList = ({ store1, handleSubmit }) => {
  return (
    <div>
      store:{store1.getStoreDetails}
      <form className="form-element" onSubmit={handleSubmit}>
        <label htmlFor="shows">Choose one or more shows:</label>
        <select
          multiple={true}
          id="shows"
          className="select-element"
          value={store1.getChosenOption}
          onChange={(e) => store1.createChosenOption(e.target.value)}
        >
          {store1.optionToShow.map((item) => (
            <option className="show-list-item" key={item.id} value={item.channel_id}>
              {item.title}
            </option>
          ))}
        </select>
        <input className="input-button" type="submit" value="Search" />
      </form>
    </div>
  );
};

export default observer(SelectList);

/*
const Select = ({ selectOptions, handleSelect, handleSubmit, chosenOption }) => {
  return (
    <form onSubmit={handleSubmit} className="form-element">
      <label htmlFor="shows">Choose one or more shows:</label>

      <select multiple={true} id="shows" className="select-element">
        {selectOptions.map((item) => (
          <option
            className="show-list-item"
            key={item.id}
            value={item.title}
            onClick={() => handleSelect(item.channel_id)}
          >
            {item.title}
          </option>
        ))}
      </select>

      <label>
        {chosenOption && (
          <label htmlFor="shows">
            <p className="para">Total number of shows chosen are : {chosenOption.length}</p>
          </label>
        )}
      </label>
      <input className="input-button" type="submit" value="Search" />
    </form>
  );
};


<form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite flavor:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
      */

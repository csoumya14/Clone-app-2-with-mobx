import React from 'react';
import { observer } from 'mobx-react-lite';
import './SelectList.css';

// eslint-disable-next-line react-hooks/rules-of-hooks
const SelectList = ({ store1, handleSubmit, handleChange, chosenOption }) => {
  return (
    <div>
      <form className="form-element" onSubmit={handleSubmit}>
        <label htmlFor="shows">Choose one or more shows:</label>
        <select
          multiple={true}
          id="shows"
          className="select-element"
          value={chosenOption}
          onChange={event => {
            handleChange(event.target.value);
          }}
        >
          {store1.optionsToShow.map(item => (
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

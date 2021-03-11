import { computed, action, observable, autorun, makeAutoObservable } from 'mobx';
//import { observer } from 'mobx-react';
//import { createContext } from 'react';

class SelectStore {
  optionToShow = [
    {
      id: 1,
      title: 'Late Night with Seth Myers',
      url: 'https://www.youtube.com/channel/UCVTyTA7-g9nopHeHbeuvpRA',
      channel_id: 'UCVTyTA7-g9nopHeHbeuvpRA',
    },
    {
      id: 2,
      title: 'The Daily Show with Trevor Noah',
      url: 'https://www.youtube.com/channel/UCwWhs_6x42TyRM4Wstoq8HA',
      channel_id: 'UCwWhs_6x42TyRM4Wstoq8HA',
    },
    {
      id: 3,
      title: 'The Late Show with Stephen Colbert',
      url: 'https://www.youtube.com/channel/UCMtFAi84ehTSYSE9XoHefig',
      channel_id: 'UCMtFAi84ehTSYSE9XoHefig',
    },
  ];

  chosenOption = observable([]);
  isLoading = true;

  constructor() {
    makeAutoObservable(this, {
      optionToShow: observable,
      //chosenOption: observable,
      createChosenOption: action,
      totalOption: computed,
      storeDetails: computed,
      getChosenOption: computed,
    });
  }

  createChosenOption(option) {
    if (!this.chosenOption.includes(option)) this.chosenOption.push(option);
  }

  get totalOption() {
    return this.chosenOption.length;
  }
  disposer = autorun(() => console.log(this.storeDetails));

  get getChosenOption() {
    return this.chosenOption;
  }
  get storeDetails() {
    return `We have ${this.chosenOption}  total options, so far!!!`;
  }
}

export default SelectStore;
/*
observer(SelectStore, {
  optionToShow: observable,
  //chosenOption: observable,
  createChosenOption: action,
  totalOption: computed,
  storeDetails: computed,
  getChosenOption: computed,
});
*/

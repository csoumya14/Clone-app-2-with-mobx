import { getDataFromApi } from '../services/FetchData';
import {
  computed,
  observable,
  action,
  runInAction,
  makeAutoObservable,
  reaction,
  autorun,
} from 'mobx';
//import { observer } from 'mobx-react';
import { toJS } from 'mobx';

export default class VideoDetailStores {
  videoDetails = observable([]);

  hiddenVideoDetails = observable([]);
  convertArray = [];

  disposer = autorun(() => console.log(this.storeDetails));

  disposer2 = reaction(
    () => JSON.stringify(this.hiddenVideoDetails),
    json => {
      localStorage.setItem('hideVideoStore', json);
    },
  );

  get storeDetails() {
    return `We have ${this.hiddenVideoDetails}`;
  }

  constructor(RootStore) {
    this.rootStore = RootStore;

    makeAutoObservable(this, {
      videoDetails: observable,
      hiddenVideoDetails: observable,
      convertArray: observable,
      ids: observable,
      createConvertedArray: action,
      getChosenOption: action,
      dependentVariable: computed,
      storeDetails: computed,
      initForms: action,
      findMaxResult: action,
      hideClip: action,
      addHideClip: action,
    });
  }

  get dependentVariable() {
    return this.rootStore.selectStore.chosenOption;
  }

  findMaxResult() {
    let maxResult = 0;
    if (this.rootStore.selectStore.chosenOption.length === 1) {
      maxResult = 1;
    } else if (this.rootStore.selectStore.chosenOption.length === 2) {
      maxResult = 1;
    } else {
      maxResult = 1;
    }
    return maxResult;
  }

  createConvertedArray() {
    for (let i = 0; i < this.videoDetails.length; i++) {
      for (let j = 0; j < this.videoDetails[i].length; j++) {
        this.convertArray.push(this.videoDetails[i][j]);
      }
    }
  }
  async initForms() {
    console.log('start');
    const hiddenvideoIdsForChosenShow = this.hiddenVideoDetails.filter(obj => {
      return this.rootStore.selectStore.chosenOption.includes(obj.channel_id);
    });
    let idss = [];
    const ids = [
      'UCVTyTA7-g9nopHeHbeuvpRA',
      'UCwWhs_6x42TyRM4Wstoq8HA',
      'UCMtFAi84ehTSYSE9XoHefig',
    ];
    this.rootStore.selectStore.chosenOption.length === 0
      ? (idss = ids)
      : (idss = this.rootStore.selectStore.chosenOption);
    console.log('selected id', idss);

    const promises = idss.map(async id => {
      const videoDetailPromise = await getDataFromApi(id, 1);
      return videoDetailPromise;
    });
    const videoDetailsToGet = await Promise.all(promises);

    console.log('end');

    runInAction(() => {
      this.videoDetails = videoDetailsToGet;
      this.createConvertedArray();
    });

    console.log(toJS(this.videoDetails));
  }

  hideClip(item) {
    const filteredItem = this.convertArray.findIndex(video => video.id.videoId === item.id.videoId);
    if (filteredItem > -1) {
      this.convertArray.splice(filteredItem, 1);
    }
  }

  addHideClip(item) {
    this.hiddenVideoDetails.push(item.id.videoId);
  }
}

/*
  hideClip(item) {
    return this.convertArray.filter(
      i => (i.id.videoId || i.id.playlistId) === (item.id.videoId || item.id.playlistId),
    );

 
    const toBeHidden = this.hiddenVideoDetails.find(v => v.channel_id === item.snippet.channelId);
    const hiddenVideo = {
      ...toBeHidden,
      hiddenVideoId: [...toBeHidden.hiddenVideoId, item.id.videoId || item.id.playlistId],
    };

    return this.hiddenVideoDetails.map(v =>
      v.channel_id !== item.snippet.channelId ? v : hiddenVideo,
    );

    observer(Todos, {
  videoDetails: observable,
  convertArray: observable,
  createConvertedArray: action,
  initForms: action,
});

    */

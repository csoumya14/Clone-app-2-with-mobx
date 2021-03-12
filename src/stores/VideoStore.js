import { getDataFromApi } from '../services/FetchData';
import { observable, action, runInAction } from 'mobx';
import { makeAutoObservable } from 'mobx';

export default class VideoDetailStores {
  videoDetails = observable([]);
  convertArray = observable([]);

  constructor() {
    //this.rootStore = RootStore;
    makeAutoObservable(this, {
      videoDetails: observable,
      convertArray: observable,
      createConvertedArray: action,
      initForms: action,
      hideClip: action,
    });
  }

  createConvertedArray() {
    for (let i = 0; i < this.videoDetails.length; i++) {
      for (let j = 0; j < this.videoDetails[i].length; j++) {
        this.convertArray.push(this.videoDetails[i][j]);
      }
    }
  }

  async getVideoDetailsAsync(idsObject, maxResult) {
    console.log('start');
    const promises = idsObject.map(async id => {
      const videoDetailPromise = await getDataFromApi(
        id.channel_id,
        maxResult + id.hiddenVideoId.length,
      );
      return videoDetailPromise;
    });
    const videoDetailsToGet = await Promise.all(promises);
    console.log('end');
    runInAction(() => {
      this.videoDetails = videoDetailsToGet;
      this.createConvertedArray();
    });
  }

  hideClip(item) {
    const filteredItem = this.convertArray.findIndex(video => video.id.videoId === item.id.videoId);
    if (filteredItem > -1) {
      this.convertArray.splice(filteredItem, 1);
    }
  }
}

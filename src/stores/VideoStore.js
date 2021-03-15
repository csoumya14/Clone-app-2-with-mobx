import { getDataFromApi } from '../services/FetchData';
import { observable, action, runInAction } from 'mobx';
import { makeAutoObservable } from 'mobx';

export default class VideoDetailStores {
  videoDetails = [];
  convertArray = [];

  constructor() {
    makeAutoObservable(this, {
      videoDetails: observable,
      convertArray: observable,
      createConvertedArray: action,
      getVideoDetailsAsync: action,
      hideClip: action,
    });
  }

  // data fetched is converted from an array of three separate array of objects into a single array of objects and hiddenids are filtered out from the array.
  createConvertedArray(hiddenVideoIdsArray) {
    for (let i = 0; i < this.videoDetails.length; i++) {
      for (let j = 0; j < this.videoDetails[i].length; j++) {
        this.convertArray.push(this.videoDetails[i][j]);
      }
    }
    const convertArrayWihoutHiddenIds = this.convertArray.filter(
      item => !hiddenVideoIdsArray.includes(item.id.videoId || item.id.playlistId),
    );

    this.convertArray = convertArrayWihoutHiddenIds
      .sort((a, b) => {
        var dateA = new Date(a.snippet.publishedAt);
        var dateB = new Date(b.snippet.publishedAt);
        return dateB - dateA;
      })
      .slice(0, 10);
    return this.convertArray;
  }

  async getVideoDetailsAsync(channelIds, maxResult, hiddenVideoIdsArray) {
    console.log('start');
    const promises = channelIds.map(async id => {
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
      this.createConvertedArray(hiddenVideoIdsArray);
    });
  }

  hideClip(item) {
    const filteredItem = this.convertArray.findIndex(video => video.id.videoId === item.id.videoId);
    if (filteredItem > -1) {
      this.convertArray.splice(filteredItem, 1);
    }
  }
}

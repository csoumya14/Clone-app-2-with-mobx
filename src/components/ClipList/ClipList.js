import React from 'react';
import './ClipList.css';
import VideoDetails from '../VideoDetails/VideoDetails';
import { observer } from 'mobx-react';

const ClipList = ({ store, handleDeleteClip, hiddenVideoDetails }) => {
  const videoDetailsToDisplay = store.convertArray.filter(function (video) {
    return !hiddenVideoDetails.some(function (hiddenVideos) {
      return hiddenVideos.hiddenVideoId.includes(video.id.videoId || video.id.playlistId);
    });
  });
  videoDetailsToDisplay.sort(function compare(a, b) {
    var dateA = new Date(a.snippet.publishedAt);
    var dateB = new Date(b.snippet.publishedAt);
    return dateB - dateA;
  });

  return (
    <div>
      <iframe title="video" width="420" height="345" className="videoShow" name="iframe_a"></iframe>
      <ul className="ul-list">
        {videoDetailsToDisplay.slice(0, 10).map(clip => (
          <VideoDetails
            key={Math.random().toString(36).substr(2, 9)}
            clip={clip}
            handleDeleteClip={handleDeleteClip}
          />
        ))}
      </ul>
    </div>
  );
};

export default observer(ClipList);

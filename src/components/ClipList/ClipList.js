import React from 'react';
import './ClipList.css';
import VideoDetails from '../VideoDetails/VideoDetails';
import { observer } from 'mobx-react';

const ClipList = ({ store, handleDeleteClip }) => {
  const videoDetailsToDisplay = store.convertArray.slice(0, 10).sort(function compare(a, b) {
    var dateA = new Date(a.snippet.publishedAt);
    var dateB = new Date(b.snippet.publishedAt);
    return dateB - dateA;
  });
  return (
    <div>
      <iframe title="video" width="420" height="345" className="videoShow" name="iframe_a"></iframe>
      <ul className="ul-list">
        {videoDetailsToDisplay.map(clip => (
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

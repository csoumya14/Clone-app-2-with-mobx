import React from 'react';
import './ClipList.css';
import VideoDetails from '../VideoDetails/VideoDetails';
import { observer } from 'mobx-react';

const ClipList = ({ store, handleDeleteClip }) => {
  return (
    <div>
      <iframe title="video" width="420" height="345" className="videoShow" name="iframe_a"></iframe>
      <ul className="ul-list">
        {store.convertArray.map(clip => (
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

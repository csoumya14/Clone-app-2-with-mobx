import React from 'react';
import './VideoDetails.css';

const VideoDetails = ({ clip, handleDeleteClip }) => {
  return (
    <li className="list-items">
      <div>
        <a href={`https://www.youtube.com/embed/${clip.id.videoId}`} target="iframe_a">
          {clip.snippet.description}
        </a>
      </div>
      <div>
        <a href={`https://www.youtube.com/embed/${clip.id.videoId}`} target="iframe_a">
          {new Date(clip.snippet.publishTime).toISOString().split('T')[0]}
        </a>
      </div>
      <button className="button" onClick={() => handleDeleteClip(clip)}>
        Hide
      </button>
    </li>
  );
};

export default VideoDetails;

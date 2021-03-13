import React from 'react';
import './VideoDetails.css';

const VideoDetails = ({ clip, handleDeleteClip }) => {
  return (
    <li className="list-items">
      <a
        href={`https://www.youtube.com/embed/${clip.id.videoId}`}
        target="iframe_a"
        onClick={() => handleDeleteClip(clip)}
      >
        {clip.snippet.description}
      </a>
      <a
        href={`https://www.youtube.com/embed/${clip.id.videoId}`}
        target="iframe_a"
        onClick={() => handleDeleteClip(clip)}
      >
        {new Date(clip.snippet.publishTime).toISOString().split('T')[0]}
      </a>
      <button className="button" onClick={() => handleDeleteClip(clip)}>
        Hide
      </button>
    </li>
  );
};

export default VideoDetails;

import React, { useState, useEffect } from 'react';
import SelectList from './components/SelectList/SelectList';
import ClipList from './components/ClipList/ClipList';
import { observer } from 'mobx-react';
import { useStores } from './stores';
import './App.css';

const App = observer(() => {
  const { videoStore, selectStore } = useStores();
  const [hiddenVideoDetails, setHiddenVideoDetails] = useState([
    {
      channel_id: 'UCVTyTA7-g9nopHeHbeuvpRA',
      hiddenVideoId: [],
    },
    {
      channel_id: 'UCwWhs_6x42TyRM4Wstoq8HA',
      hiddenVideoId: [],
    },
    {
      channel_id: 'UCMtFAi84ehTSYSE9XoHefig',
      hiddenVideoId: [],
    },
  ]);

  const [chosenOption, setChosenOption] = useState([]);
  let channelIds = [];

  const findMaxResult = () => {
    let maxResult = 0;
    if (chosenOption.length === 1) {
      maxResult = 10;
    } else if (chosenOption.length === 2) {
      maxResult = 5;
    } else {
      maxResult = 4;
    }
    return maxResult;
  };

  const maxResult = findMaxResult();

  const channelIdsForChosenShow = hiddenVideoDetails.filter(videoDetail =>
    chosenOption.includes(videoDetail.channel_id),
  );

  const arrayOfHiddenVideoIds = [
    ...new Set([].concat(...hiddenVideoDetails.map(videoDetail => videoDetail.hiddenVideoId))),
  ];

  //console.log(hiddenVideoIdsArrays);
  // if no shows are chosen all channel ids are given as input if shows are selected only channel ids corresponding to each
  //chosen show is given as input
  chosenOption.length === 0
    ? (channelIds = hiddenVideoDetails)
    : (channelIds = channelIdsForChosenShow);

  const addHiddenClipIdToHiddenVideoDetails = item => {
    const toBeHidden = hiddenVideoDetails.find(
      videoItem => videoItem.channel_id === item.snippet.channelId,
    );
    const hiddenVideo = {
      ...toBeHidden,
      hiddenVideoId: [...toBeHidden.hiddenVideoId, item.id.videoId || item.id.playlistId],
    };
    setHiddenVideoDetails(
      hiddenVideoDetails.map(v => (v.channel_id !== item.snippet.channelId ? v : hiddenVideo)),
    );
  };

  useEffect(() => {
    const storedVideoDetails = localStorage.getItem('hiddenVideoIds');
    setHiddenVideoDetails(
      storedVideoDetails !== null ? JSON.parse(storedVideoDetails) : hiddenVideoDetails,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem('hiddenVideoIds', JSON.stringify(hiddenVideoDetails));
    //localStorage.clear();  //uncomment this line to clear local storage
  }, [hiddenVideoDetails]);

  const handleSubmit = event => {
    event.preventDefault();
    videoStore.getVideoDetailsAsync(channelIds, maxResult, arrayOfHiddenVideoIds);
    //setChosenOption('');  //uncomment this line to clear the array of selected items
  };

  const handleDeleteClip = videoItem => {
    videoStore.hideClip(videoItem);
    addHiddenClipIdToHiddenVideoDetails(videoItem);
  };

  const handleChange = value => {
    if (!chosenOption.includes(value)) setChosenOption([...chosenOption, value]);
  };

  return (
    <div className="App">
      <SelectList
        store1={selectStore}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        chosenOption={chosenOption}
      />
      <ClipList store={videoStore} handleDeleteClip={handleDeleteClip} />
    </div>
  );
});

export default App;

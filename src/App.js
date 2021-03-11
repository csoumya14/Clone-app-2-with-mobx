import React, { useEffect, useState } from 'react';

import SelectList from './components/SelectList/SelectList';
//import SelectStore from './stores/SelectStore';
//import VideoStore from './stores/VideoStore';
import ClipList from './components/ClipList/ClipList';
import { observer } from 'mobx-react';
import { useStores } from './stores';

import './App.css';

const App = observer(() => {
  //console.log(selectStore);
  const { videoStore, selectStore } = useStores();
  const [hiddenVideoDetails, setHiddenVideoDetails] = useState([]);

  /*
  useEffect(() => {
    const storedVideoDetails = localStorage.getItem('hiddenVideoIds');
    setHiddenVideoDetails(
      storedVideoDetails !== null ? JSON.parse(storedVideoDetails) : videoStore.hiddenVideoDetails,
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem('hiddenVideoIds', JSON.stringify(videoStore.hiddenVideoDetails));
    console.log(videoStore.hiddenVideoDetails);
  }, [videoStore.hiddenVideoDetails]);
  */

  const handleSubmit = event => {
    event.preventDefault();
    videoStore.initForms();
  };

  const handleDeleteClip = item => {
    videoStore.hideClip(item);
    videoStore.addHideClip(item);
  };

  return (
    <div className="App">
      <ClipList store={videoStore} handleDeleteClip={handleDeleteClip} />
      <SelectList store1={selectStore} handleSubmit={handleSubmit} />
    </div>
  );
});

export default App;

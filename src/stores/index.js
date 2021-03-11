import { useContext } from 'react';
import SelectStore from './SelectStore';
import VideoStore from './VideoStore';
import { createContext } from 'react';

class RootStore {
  constructor() {
    this.selectStore = new SelectStore();
    this.videoStore = new VideoStore(this);
  }
}

const StoresContext = createContext(new RootStore());
export const useStores = () => useContext(StoresContext);

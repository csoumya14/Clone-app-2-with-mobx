import axios from 'axios';
//const KEY = 'AIzaSyBrq7CWaBLpWJxIpJzqOMvFT5CmK1dG7AA';
const KEY = 'AIzaSyBrq7CWaBLpWJxIpJzqOMvFT5CmK1dG7AA';

const youTubeApi = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/',
  params: {
    part: 'snippet',
    key: KEY,
  },
});

export default youTubeApi;

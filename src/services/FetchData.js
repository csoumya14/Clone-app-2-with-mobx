//import React from 'react'
import youtubeAPI from './youtubeApi';

export const getDataFromApi = (channelId, maxResults) => {
  return new Promise((resolve, reject) => {
    youtubeAPI
      .get('/search', {
        params: {
          channelId: channelId,
          maxResults: maxResults,
        },
      })
      .then((response) => {
        if (response !== null) resolve(response.data.items);
      })
      .catch((error) => {
        console.log('Error', error);
        reject(error);
      });
  });
};

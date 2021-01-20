import { getStorageItem, hasStorageItem, setStorageItem } from './storageHelpers';

export const getUserSession = () => getStorageItem('userSession');

export const setUserSession = (sessionData) => setStorageItem('userSession', sessionData);

export const hasUserSession = () => hasStorageItem('userSession');

export const getToken = () => {
  if (hasUserSession()) {
    return getUserSession().token;
  }
  return undefined;
};

export const removeUserSession = () => {
  localStorage.removeItem('userSession');
  localStorage.removeItem('active-chat');
};

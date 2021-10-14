import { useContext } from 'react';
import { IStore } from '../store/interface/store';
import { Store } from '../store/store';

export const useRedux = () => {
  const { state, dispatch, actions } = useContext<IStore>(Store);

  return {
    state,
    dispatch,
    actions
  };
};
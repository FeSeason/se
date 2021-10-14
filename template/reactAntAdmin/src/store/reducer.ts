import sLog from '@/utils/log';
import { Dispatch } from 'react';
import { IState } from './interface/initialState';
import { IAction, IReducers } from './interface/store';
import reducers from './reducers';

export let reducerHandle: IReducers;
export let reducerActions: ReducerActions;

export type ReducerKinds = keyof typeof reducers;
export type ReducerActions = {
  [key in ReducerKinds]: typeof reducers[key]['actions'];
};

export const buildActionReducers = (
  dispatch: Dispatch<IAction>
): { 
  actions: ReducerActions;
  reducerHandle: IReducers 
} => {
  Object.keys(reducers).forEach(kindKey => {
    
    const currentReducer: any = reducers[kindKey];
    const currentActions: { [key: string]: any } = {};

    Object.keys(currentReducer['actions']).forEach((actionKey: string) => {
      currentActions[actionKey] = (...args: any[]) => {
        const action = currentReducer['actions'][actionKey].apply(null, args);

        dispatch(action);
      };
    });

    reducerActions = {
      ...reducerActions,
      [kindKey]: currentActions,
    };
    
    Object.keys(currentReducer['reducers']).forEach(reducerKey => {
      reducerHandle = {
        ...reducerHandle,
        [reducerKey]: currentReducer['reducers'][reducerKey],
      };
    });
  });

  return {
    actions: reducerActions,
    reducerHandle: reducerHandle,
  };
};

export const reducer = (state: IState, action: IAction): IState => {
  if (reducerHandle[action.type]) {
    sLog.info('【action】', action);

    const data = reducerHandle[action.type](state, action);
    sLog.great('【next state】', data);

    return data;
  }
  return state;
};
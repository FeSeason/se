import { Dispatch } from 'react';
import { ReducerActions } from '../reducer';
import { IState } from './initialState';

export interface IAction<T = any> {
  type: string;
  payload: T;
}

export interface IReducer {
  (state: IState, action: IAction): IState
}

export interface IReducers {
    [key: string]: IReducer;
}

export interface IStore {
  state: IState;
  dispatch: Dispatch<IAction>;
  actions: ReducerActions
}
import { IState } from '../interface/initialState';
import { IAction } from '../interface/store';
import { IUserState } from '../interface/user';

const actions = {
  setUser (data: Partial<IUserState>): IAction {
    return {
      type: 'setUser',
      payload: data
    };
  }
};

const reducers = {
  setUser (state: IState, action: IAction): IState {
    return {
      ...state,
      userInfo: { ...action.payload }
    }; 
  }
};

export default {
  actions,
  reducers
};
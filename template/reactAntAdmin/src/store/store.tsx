import React, { createContext, FC, useMemo, useReducer } from 'react';
import { buildActionReducers, reducer } from './reducer';
import initState from './states';

const Store = createContext<any>(initState);

const Provider: FC = (props) => {
  const { children } = props;
  const [ state, dispatch ] = useReducer(reducer, initState);
  
  const actions = useMemo(() => {
    return buildActionReducers(dispatch).actions;
  }, []);

  return (
    <Store.Provider value={{ state, dispatch, actions }}>
      {children}
    </Store.Provider>
  );
};

export { Provider, Store };

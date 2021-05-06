import { combineReducers } from 'redux';
import AuthReducer from './auth/auth.reducer';

const RootReducer = combineReducers({ AuthReducer });

export default RootReducer;
export type RootReducersType = ReturnType<typeof RootReducer>;

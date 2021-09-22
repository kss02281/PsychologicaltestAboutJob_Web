import { createStore } from 'redux';
import Reducer from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(Reducer, composeWithDevTools());

export default store;
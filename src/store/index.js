import { applyMiddleware, createStore } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger'; 
import { configureStore } from '@reduxjs/toolkit';
import reducer from './modules/reducer';

// const store = createStore(Reducer, applyMiddleware(logger));

const store = configureStore({reducer, middleware : [ logger ]});

export default store;
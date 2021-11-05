import logger from 'redux-logger'; 
import { configureStore } from '@reduxjs/toolkit';
import reducer from './modules/reducer';

const store = configureStore({reducer, middleware : [ logger ]});

export default store;
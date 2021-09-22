
import React, { Component, useState } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import { Main, SampleQuestion, Question, ResultWait, FinalResult } from "./pages";
import { Provider } from 'react-redux';
import store from './redux/store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <BrowserRouter>
            <Route path="/" exact component={Main} />
            <Route path="/sampleQuestion" component={SampleQuestion} />
            <Route path="/question" component={Question} />
            <Route path="/resultWait" component={ResultWait} />
            <Route path="/finalResult" component={FinalResult} />
          </BrowserRouter>
        </div>
      </Provider>
    )
  }
}

export default App;

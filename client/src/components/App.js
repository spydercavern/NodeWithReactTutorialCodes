import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './header';

const Dashsboard = () => <h2> Dashboard </h2>;
const SurveyNew = () => <h2> SurveyNew </h2>;
const Landing = () => <h2> Landing </h2>;

const App = () => (
  <Router>
    <div>
      <Header />
      <Route path="/" exact component={Landing} />
      <Route path="/surveys" exact component={Dashsboard} />
      <Route path="/survey/new" exact component={SurveyNew} />
    </div>
  </Router>
);

export default App;

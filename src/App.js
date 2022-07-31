import './App.css';
import React, {useState} from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

export default function App() {
  let pageSize = 6;
  let apiKey = process.env.REACT_APP_NEWS_API;
  const [progress, setProgress] = useState(0);
  return (
    <>
    <Router>
      <LoadingBar
        color='red'
        progress={progress}
      />
      <Navbar />
    <Switch>
        <Route exact path="/"><News setProgress={setProgress} apiKey={apiKey} key="general" country="in" pageSize={pageSize} category="general" /></Route>
        <Route exact path="/business"><News setProgress={setProgress} apiKey={apiKey} key="business" country="in" pageSize={pageSize} category="business" /></Route>
        <Route exact path="/entertainment"><News setProgress={setProgress} apiKey={apiKey} key="entertainment" country="in" pageSize={pageSize} category="entertainment" /></Route>
        <Route exact path="/health"><News setProgress={setProgress} apiKey={apiKey} key="health" country="in" pageSize={pageSize} category="health" /></Route>
        <Route exact path="/science"><News setProgress={setProgress} apiKey={apiKey} key="science" country="in" pageSize={pageSize} category="science" /></Route>
        <Route exact path="/sports"><News setProgress={setProgress} apiKey={apiKey} key="sports" country="in" pageSize={pageSize} category="sports" /></Route>
        <Route exact path="/technology"><News setProgress={setProgress} apiKey={apiKey} key="technology" country="in" pageSize={pageSize} category="technology" /></Route>
    </Switch>

    </Router>
    </>
  )
}
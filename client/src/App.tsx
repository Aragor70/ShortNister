import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './interface/Header';
import Index from './interface/Index';
import Overview from './interface/Overview';
import Stats from './interface/Stats';

const App = () => {


  return (
    <Fragment>
      
      <header className="header">
        <Header />
      </header>
      
      <main className="output">


        <Switch>
          <Route exact path="/">
            <Index />
          </Route>
          <Route exact path="/:code/stats">
            <Stats />
          </Route>
          <Route exact path="/:code/overview">
            <Overview />
          </Route>
        </Switch>
        

      </main>
    </Fragment>
  );
}
export default App;
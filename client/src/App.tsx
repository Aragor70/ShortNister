import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Footer from './interface/Footer';
import Header from './interface/Header';
import Index from './interface/Index';
import NoMatch from './interface/NoMatch';
import Overview from './interface/Overview';
import Stats from './interface/Stats';
import Toplist from './interface/Toplist';

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
          <Route exact path="/list">
            <Toplist />
          </Route>
          <Route>
            <NoMatch />
          </Route>
        </Switch>
        
        <Footer />

      </main>
      
    </Fragment>
  );
}
export default App;
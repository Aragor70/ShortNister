import React,{ Fragment } from "react";
import { withRouter } from "react-router-dom";
import { History, LocationState } from 'history'

interface NoMatchProps {
    history: History<LocationState>
}

const NoMatch = ({ history }: NoMatchProps) => {
    
    return (
      <Fragment>
        <div className="section-content">
            <p>404, Page not found.</p>
            <button onClick={e=> history.push('/')}>Go to home</button>
        </div>
        
      </Fragment>
    )
}
export default withRouter(NoMatch);
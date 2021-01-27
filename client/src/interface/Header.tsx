import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';

type HeaderProps = {
    history: any
}

const Header = ({ history }: HeaderProps ) => {



    return (
        <Fragment>
            <div className="header-content">
                <h1 onClick={e=> history.push('/')}>Shortster</h1>
            </div>
        </Fragment>
    );
}
export default withRouter(Header);
import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { History, LocationState } from 'history';
import portfolio from "../style/portfolio.svg"
import github from "../style/logo-github.svg"
import linkedin from "../style/logo-linkedin.svg"

interface HeaderProps {
    history: History<LocationState>
}

const Footer = ({ history }: HeaderProps ) => {



    return (
        <Fragment>
            <footer>
                <div>
                    <h3>
                    SUPPORT
                    </h3>
                    <p>
                        <span onClick={() => window.open("https://redirect.m-prus.uk/", "_blank")}>
                            HOW IT WORKS
                        </span>
                    </p>
                    <p>
                        <span onClick={() => window.open("https://www.linkedin.com/in/mikolaj-prus/", "_blank")}>
                            CONTACT US
                        </span>
                    </p>
                    <p>
                        <span onClick={() => window.open("https://redirect.m-prus.uk/Privacy_Policy-GitHub_Repository", "_blank")}>
                            PRIVACY POLICY
                        </span>
                    </p>
                </div>
                <div>
                    <div className="icons">
                        <label onClick={() => window.open("https://redirect.m-prus.uk/Mikolaj-LinkedIn_Profile", "_blank")}><img src={linkedin} /></label>
                        <label onClick={() => window.open("https://redirect.m-prus.uk/GitHub_Profile", "_blank")}><img src={github} /></label>
                        <label onClick={() => window.open("https://m-prus.uk/", "_blank")}><img src={portfolio} /></label>
                    </div>
                </div>
                <div>
                    <p className="copy">
                        ©2022 by mikey.prus@gmail.com
                    </p>
                </div>
            </footer>
        </Fragment>
    );
}
export default withRouter(Footer);
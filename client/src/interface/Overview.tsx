import React, { Fragment, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import copy from 'copy-to-clipboard';

type OverviewProps = {
    match: any,
    history: any
}

const Overview = ({ match, history }: OverviewProps) => {

    const [url, setUrl] = useState('')

    useEffect(() => {
        setUrl(`http://localhost:5000/${match.params.code}`)
    }, [match.params.code])
    
    const handleCopy = (address: string) => {
        copy(address)
        console.log('copy success')
    }

    return (
        <Fragment>
            <div className="section-content">
                <p>Overiew</p>

                    Your shortcut URL is:
                    <p style={{textAlign: 'center'}} onClick={e=> handleCopy(url)}>
                    
                        http://localhost:5000/{match.params.code}
                    
                    </p>
                    <div className="options">
                        <button onClick={e=> history.push(`/${match.params.code}/stats`)}>Get statistics</button>
                        <button onClick={e=> handleCopy(url)}>Copy</button>
                        <button onClick={e=> history.push('/')}>Go back</button>
                    </div>
            </div>
        </Fragment>
    );
}
export default withRouter(Overview);
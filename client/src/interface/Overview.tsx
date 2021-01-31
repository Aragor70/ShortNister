import React, { Fragment, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import copy from 'copy-to-clipboard';
import { getUrl } from '../actions/url';

type OverviewProps = {
    match: any,
    history: any
}

const Overview = ({ match, history }: OverviewProps) => {



    const [data, setData] = useState({
        urlCode: '',
        longUrl: '',
        shortUrl: '',
        views: ''
    })
    
    
    useEffect(() => {

        const getData = async() => {
            const res: any = await getUrl(match.params.code)
            
            if (res) {
                setData({
                    urlCode: res.urlCode,
                    longUrl: res.longUrl,
                    shortUrl: res.shortUrl,
                    views: res.views
                })
            }
        }
        getData()

        return () => {
            setData({
                urlCode: '',
                longUrl: '',
                shortUrl: '',
                views: ''
            })
        }

    }, [match.params.code])

    
    const handleCopy = (address: string) => {
        copy(address);
    }

    return (
        <Fragment>
            <div className="section-content">
                {
                    data.urlCode ? <Fragment>
                        <p>Overiew</p>

                        Your shortcut URL is:
                        <p style={{textAlign: 'center'}} onClick={e=> handleCopy(data.shortUrl)}>

                            <span className="weightBold">{data.shortUrl}</span>

                        </p>
                        <div className="options">
                            <button onClick={e=> history.push(`/${data.urlCode}/stats`)}>Get statistics</button>
                            <button onClick={e=> handleCopy(data.shortUrl)}>Copy</button>
                            <button onClick={e=> history.push('/')}>Go back</button>
                        </div>
                    </Fragment> : <Fragment>
                        <p>Address not found.</p>
                    </Fragment>
                }
                
            </div>
        </Fragment>
    );
}
export default withRouter(Overview);
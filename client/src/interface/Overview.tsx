import React, { Fragment, useEffect, useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import copy from 'copy-to-clipboard';
import { getUrl } from '../actions/url';
import { History, LocationState } from 'history';
import moment from 'moment';

interface OverviewParams {
    code: string
}

interface OverviewProps extends RouteComponentProps<OverviewParams> {
    history: History<LocationState>
}

const Overview = ({ match, history }: OverviewProps) => {



    const [data, setData] = useState({
        urlCode: '',
        longUrl: '',
        shortUrl: '',
        views: '',
        lastVisit: '',
        date: ''
    })
    
    
    useEffect(() => {

        const getData = async() => {
            const res: any = await getUrl(match.params.code)
            
            if (res) {
                setData({
                    urlCode: res.urlCode,
                    longUrl: res.longUrl,
                    shortUrl: res.shortUrl,
                    views: res.views,
                    lastVisit: res.lastVisit,
                    date: res.date
                })
            }
        }
        getData()

        return () => {
            setData({
                urlCode: '',
                longUrl: '',
                shortUrl: '',
                views: '',
                lastVisit: '',
                date: ''
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
                        <p>Overview</p>

                        Your shortcut URL is:
                        <p style={{textAlign: 'center'}} onClick={e=> handleCopy(data.shortUrl)}>

                            <span className="weightBold">{data.shortUrl}</span>

                        </p>
                        {
                            data.date && <Fragment>
                                <p> URL registration was: </p>
                                <p style={{textAlign: 'center'}}>
                                {
                                    Date.parse(data.date) < Date.now() - 86400000 ? 
                                    
                                    `${moment(data.date).format('DD-MM-YYYY')} at ${moment(data.date).format('HH:mm:SS')}` : `Today at ${moment(data.date).format('HH:mm:SS')}` 
                                
                                }
                                </p>
                            </Fragment>
                        }

                        <div className="options">
                            <button onClick={e=> handleCopy(data.shortUrl)}>Copy</button>
                            <button onClick={e=> window.open(data.shortUrl, "_blank")}>Visit</button>
                            <button onClick={e=> history.push(`/${data.urlCode}/stats`)}>Get statistics</button>
                            <button onClick={e=> history.push('/')}>Go to home</button>
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
import React, { Fragment, useEffect, useState } from 'react';
import { withRouter, match, RouteComponentProps } from 'react-router-dom';
import { getUrl } from '../actions/url';
import { History, LocationState } from 'history';
import moment from 'moment';

interface MatchParams {
    code: string
}

interface StatsProps extends RouteComponentProps<MatchParams> {
    history: History<LocationState>,
    match: any
}


const Stats = ({ match, history }: StatsProps) => {

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


    return (
        <Fragment>
            <div className="section-content">
                {
                    data.urlCode ? <Fragment>
                        <p>Statistical analysis</p>

                        <p>Shortcut URL:</p>

                            <p className="weightBold">{data.shortUrl}</p>

                        <p>Original URL:</p>

                            <p className="weightBold">{data.longUrl}</p>

                        <p>Views:</p>

                            <p className="textCenter weightBold" style={{ fontSize: '32px'}}>{data.views}</p>

                        {
                            data.lastVisit && <Fragment>
                                <p> The last visit was: </p>
                                <p style={{textAlign: 'center'}}>
                                {
                                    Date.parse(data.lastVisit) < Date.now() - 86400000 ? 
                                    
                                    `${moment(data.lastVisit).format('DD-MM-YYYY')} at ${moment(data.lastVisit).format('HH:mm:SS')}` : `Today at ${moment(data.lastVisit).format('HH:mm:SS')}` 
                                
                                }
                                </p>
                                
                                
                            </Fragment>
                        }
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
                    </Fragment> : <Fragment>
                        <p>Address not found.</p>
                    </Fragment>
                }
                <div className="options">
                    <button onClick={e=> history.push(`/${data.urlCode}/overview`)}>Go to overview</button>
                </div>
                
                

            </div>
        </Fragment>
    );
}
export default withRouter(Stats);
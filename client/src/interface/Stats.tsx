import React, { Fragment, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { getUrl } from '../actions/url'

type StatsProps = {
    match: any
}

const Stats = ({ match }: StatsProps) => {

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

                    </Fragment> : <Fragment>
                        <p>Address not found.</p>
                    </Fragment>
                }
                
                

            </div>
        </Fragment>
    );
}
export default withRouter(Stats);
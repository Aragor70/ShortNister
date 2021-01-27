import React, { Fragment, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { getStats } from '../actions/url'

type StatsProps = {
    match: any
}

const Stats = ({ match }: StatsProps) => {

    const [data, setData] = useState({
        longUrl: '',
        shortUrl: '',
        views: ''
    })
    
    
    useEffect(() => {

        const getData = async() => {
            const res: any = await getStats(match.params.code)
            
            setData({
                longUrl: res.longUrl,
                shortUrl: res.shortUrl,
                views: res.views
            })
        }
        getData()

    }, [match.params.code])


    return (
        <Fragment>
            <div className="section-content">
                <p>Statistical analysis</p>

                <p>Shortcut URL:</p>

                    <p className="weightBold">{data.shortUrl}</p>
                
                <p>Original URL:</p>

                    <p className="weightBold">{data.longUrl}</p>

                <p>Views:</p>

                    <p className="textCenter weightBold" style={{ fontSize: '32px'}}>{data.views}</p>


            </div>
        </Fragment>
    );
}
export default withRouter(Stats);
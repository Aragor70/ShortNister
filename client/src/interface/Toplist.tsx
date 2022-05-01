import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import { getURLs } from '../actions/url';



type UrlType = {
    shortUrl: string,
    views: number,
    lastVisit: any
}

const Toplist = () => {


    const [urls, setUrls] = useState([])

    
    useEffect(() => {

        const getArray = async() => {
            const res: any = await getURLs()
            
            return setUrls(res)
        }
        getArray()
        return () => {
            setUrls([])
        }
    }, [])
    
    return (
        <Fragment>
            <div className="section-content urls">
                <h3>
                    List of all of the available URLs
                </h3>
                <table>
                    <tr>
                        <th>Page address</th>
                        <th>Number of views</th>
                        <th>Last visit</th>
                    </tr>
                    {
                        urls?.length === 0 ? <tr><td>None</td></tr> : urls.map((url: UrlType) => <tr><td><span onClick={e => window.open(url.shortUrl, "_blank")}>{url.shortUrl}</span></td><td><b>{url.views}</b></td><td>{url.lastVisit ? moment(url.lastVisit).format('DD-MM-YYYY hh:ss:ss') : 'None'}</td></tr>)
                    }
                </table>
                
            </div>
        </Fragment>
    );
}
export default Toplist;
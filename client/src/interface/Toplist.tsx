import React, { Fragment, useEffect, useState } from 'react';
import { getURLs } from '../actions/url';



type Url = {
    shortUrl: string,
    views: number
}

const Toplist = () => {


    const [urls, setUrls] = useState([])

    const openUrl = (address: string) => {
        return window.open(address, "_blank")
    }

    
    useEffect(() => {
        const getArray = async() => {
            const res = await getURLs()
            
            setUrls(res)
        }
        getArray()
    }, [])

    return (
        <Fragment>
            <div className="section-content">
                <p>Top 3 URLs</p>
                {
                    urls.length === 0 ? 'Empty list' : urls.map((url: Url) => <p className="textCenter" ><span onClick={e => openUrl(url.shortUrl)}>{url.shortUrl} | <b>{url.views} views</b></span></p>)
                }
            </div>
        </Fragment>
    );
}
export default Toplist;
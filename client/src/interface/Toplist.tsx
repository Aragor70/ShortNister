import React, { Fragment, useEffect, useState } from 'react';
import { getURLs } from '../actions/url';



type UrlType = {
    shortUrl: string,
    views: number
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
            <div className="section-content">
                <p>Top 3 URLs</p>
                {
                    urls.length === 0 ? 'The list is empty' : urls.map((url: UrlType) => <p className="textCenter" ><span onClick={e => window.open(url.shortUrl, "_blank")}>{url.shortUrl} | <b>{url.views} views</b></span></p>)
                }
            </div>
        </Fragment>
    );
}
export default Toplist;
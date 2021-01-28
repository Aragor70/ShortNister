import React, { Fragment, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { postUrl } from '../actions/url';
import validUrl from 'valid-url'
import Toplist from './Toplist';

type IndexType = {
    history: any
}

const Index = ({ history }: IndexType) => {

    const [isValid, setIsValid] = useState(false)
    const [formData, setFormData] = useState({
        longUrl: '',
        customCode: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async(e: React.SyntheticEvent) => {
        e.preventDefault();
        await postUrl(formData, history)
    }
    useEffect(() => {

        if (validUrl.isUri(formData.longUrl)){
            return setIsValid(true)
        } else {
            return setIsValid(false)
        }
    }, [formData.longUrl])

    return (
        <Fragment>
            <div className="section-content">
                <p>Meet Shortster</p>
                    Take control of your URL address. Meet Shortster, to build a shortcut address. 
                    Get the quick report of the frequency. 
                    Right now you know how many times your partners clicked your address.



                <form className="input-form" onSubmit={e=> handleSubmit(e)}>
                    <p style={{ position: 'relative' }}>Paste address URL

                    {
                        formData.longUrl.length > 0 && <button type="button" className="clean-button" onClick={e=> setFormData({ longUrl: '', customCode: ''})}>cancel</button>
                    }
                    </p>

                    <input type="text" name="longUrl" value={ formData.longUrl || '' } onChange={e=> handleChange(e)} required />
                    {
                        formData.longUrl.length > 0 && isValid ? <Fragment>
                            <p>Create a random 6 characters long URL shortcut</p>
                            <button type="submit" className="randomize">
                                Generate random shortcut
                            </button>

                            <p>or</p>

                            <label>
                                <p>Customize your URL shortcut (at least 4 characters long)</p>
                                <p>http://localhost:5000/
                                    <input type="text" name="customCode" value={ formData.customCode || '' } onChange={e=> handleChange(e)} />
                                </p>
                            </label>
                            <button type="submit">
                                Continue
                            </button>
                        </Fragment>
                        : null
                    }
                    
                </form>

                


            </div>
        </Fragment>
    );
}
export default withRouter(Index);
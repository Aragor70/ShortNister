import React, { Fragment, InputHTMLAttributes, useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { postUrl } from '../actions/url';

type IndexType = {
    history: any
}

const Index = ({ history }: IndexType) => {

    const [formData, setFormData] = useState({
        longUrl: '',
        customCode: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async(e: React.SyntheticEvent) => {
        e.preventDefault();
        const res = await postUrl(formData, history)
        console.log(res, 'output')
    }

    return (
        <Fragment>
            <div className="section-content">
                <p>Meet Shortster</p>
                    Take control of your URL address. Meet Shortster, to build a shortcut address. 
                    Get the quick report of the frequency. 
                    Right now you know how many times your partners clicked your address.



                <form className="input-form" onSubmit={e=> handleSubmit(e)}>
                    <p>Paste address URL</p>
                    <input type="text" name="longUrl" onChange={e=> handleChange(e)} required />

                    <button type="submit" className="randomize">
                        Generate random shortcut
                    </button>

                    <p>or</p>

                    <label>
                        <p>Customize your own</p>
                        <input type="text" name="customCode" onChange={e=> handleChange(e)} />
                    </label>
                    <button type="submit">
                        Continue
                    </button>

                </form>
            </div>
        </Fragment>
    );
}
export default withRouter(Index);
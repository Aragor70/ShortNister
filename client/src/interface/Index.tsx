import React, { Fragment } from 'react';



const Index = () => {



    return (
        <Fragment>
            <div className="section-content">
                <p>Meet Shortster</p>
                    Take control of your URL address. Meet Shortster, to build a shortcut address. 
                    Get the quick report of the frequency. 
                    Right now you know how many times your partners clicked your address.



                <form className="input-form">
                    <p>Paste address URL</p>
                    <input type="text" />

                    <button type="button" className="randomize">
                        Generate random shortcut
                    </button>

                    <p>or</p>

                    <label>
                        <p>Customize your own</p>
                        <input type="text" />
                    </label>
                    <button type="submit">
                        Continue
                    </button>

                </form>
            </div>
        </Fragment>
    );
}
export default Index;
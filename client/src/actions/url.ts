import axios from "axios";

type formType = {
    longUrl: string,
    customCode?: string
}

export const getURLs = async() => {

    try {
        
        const res = await axios.get('https://shortnister.herokuapp.com/api/urls')
        
        return res.data

    } catch (err: any) {
        console.log(err.message)
        
    }
}

export const getUrl = async(code: string) => {

    try {

        const res = await axios.get(`https://shortnister.herokuapp.com/api/urls/${code}`)
        
        return res.data

    } catch (err: any) {
        console.log(err.message)
        
    }
}

export const postUrl = async(formData: formType, history: any) => {

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    try {

        const res = await axios.post('https://shortnister.herokuapp.com/api/urls', formData, config)
        
        history.push(`/${res.data.urlAddress.urlCode}/overview`)
        return res

    } catch (err: any) {
        console.log(err.message)
        
        
    }
}
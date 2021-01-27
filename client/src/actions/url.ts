import axios from "axios";

type formType = {
    longUrl: string,
    customCode?: string
}


export const postUrl = async(formData: formType, history: any) => {

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    try {

        const res = await axios.post('/api/url', formData, config)
        
        history.push(`/${res.data.urlAddress.urlCode}/overview`)
        return res

    } catch (err) {
        console.log(err)
        
    }
}
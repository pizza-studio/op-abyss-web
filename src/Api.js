import axios from 'axios';
import useSWR from "swr";

const fetcher = async url => {
    const res = await axios.get(url, {
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }
    );
    if (res.retCode) {
        const error = new Error('An error occurred while fetching the data.')
        // 将额外的信息附加到错误对象上。
        error.info = await res.json()
        error.status = res.status
        return error;
    }
    return res.data;
}

export class API {
    static getCharInfoFromCharID(id) {

    }
}

export async function getNameFromCharID(id) {
    return getLocalizedStrFromHashID(getCharInfoFromCharID(id).NameTextMapHash);
}



function getLocalizedStrFromHashID(hashID) {

}

export default { getNameFromCharID, getCharInfoFromCharID, getLocalizedStrFromHashID };
import axios from "axios";
import {useMutation} from "react-query";

type Props = {
    url: string,
    requestBody: Object,
    requestQuery?: Object
}

const usePut = () => {
    const putData = async (props: Props) => {
        try {
            const url = props.url;
            const requestBody = props.requestBody;
            const params = props?.requestQuery;
            await axios.post(url, requestBody, {params: params, withCredentials: true})
        } catch (error) {
            throw new Error("Problem fetching data");
        }
    }
    return useMutation((props: Props) => putData(props));
};

export default usePut;

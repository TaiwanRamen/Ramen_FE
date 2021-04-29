import {useQuery} from "react-query";
import axios from "axios";
import {IComment} from "../../types/IComment";
import Loading from "../Loading/Loading";
import {useContext, useState} from "react";
import {UserContext} from "../../Context/UserContext";
import AddComment from "./AddComment";
import {Button} from "react-bootstrap";

const getComments = async (storeId: string): Promise<IComment[]> => {
    //console.log(process.env.REACT_APP_URL + `/api/v1/comment/${storeId}`);
    const response = await axios.get(process.env.REACT_APP_URL + `/api/v1/comment/${storeId}`);
    if (response.status !== 200) {
        throw new Error("Problem fetching data");
    }
    console.log("comment:", response.data.data)
    return await response.data.data;
}

type Props = {
    storeId: string
}

const Comment = (props: Props) => {
    const {user} = useContext(UserContext);
    const [modalShow, setModalShow] = useState(false);

    const { data: comments, status, error } = useQuery<IComment[], Error>(
        ['comments', props.storeId],
        () => getComments(props.storeId),
        {
            keepPreviousData: true,
        }
    );
    if (status === "loading") {
        return <Loading />;
    }

    if (status === "error") {
        return <div>{error?.message}</div>;
    }
    if (!comments) return <div>沒有留言</div>;

    return comments ?
        <div className="well">
            {user && <div className="text-left">
                <Button variant="success" className="m-2" onClick={() => setModalShow(true)} >留言</Button>
                <AddComment
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </div>}
        </div> : null
};

export default Comment;



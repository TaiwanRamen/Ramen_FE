import {IComment} from "../../types/IComment";
import Loading from "../Loading/Loading";
import { useState} from "react";
import {Button} from "react-bootstrap";
import {useUser} from "../../Context/UserContext";
import useFetch from "../../customHooks/UseFetch";
import AddCommentModal from "./AddCommentModal";

type Props = {
    storeId: string
}

const Comments = (props: Props) => {
    const { user } = useUser()!;
    const [modalShow, setModalShow] = useState(false);
    const storeId = props.storeId;
    const options = {
        key: "comments",
        url: process.env.REACT_APP_BE_URL + `/api/v1/comment/${storeId}`,
        requestQuery: {}
    }

    const {data:comments, status, error} = useFetch<IComment[]>(options);


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
                <AddCommentModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </div>}
            {comments.map(comment =>
                <div>
                    {comment._id}, {comment.createdAt}
                </div>
            )}
        </div> : null
};

export default Comments;



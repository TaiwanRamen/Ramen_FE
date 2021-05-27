import {Button, Modal, FormControl} from 'react-bootstrap';
import {useState} from "react";

type Props = {
    show:boolean;
    onHide: () => void;
}

const AddReviewModal = (props: Props) => {
    const [content, setContent] = useState(false);

    const addComment = () => {
        console.log(content);
        props.onHide();
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    新增留言
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormControl
                    as="textarea" rows={3}
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    onChange={(e:any) => setContent(e.target.value)}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button disabled={!content} variant="success" onClick={addComment} >留言</Button>
                <Button variant="secondary" onClick={props.onHide}>取消</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddReviewModal;


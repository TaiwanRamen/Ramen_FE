import React, {useState} from 'react';
import {Button, Modal, FormControl} from 'react-bootstrap';


const DeleteModal = (props) => {
    const [deleteInputClass, setDeleteInputClass] = useState("delete-input-unmatch");
    const [isInputMatch, setIsInputMatch] = useState(false);

    const deleteStore = () => {
        if(isInputMatch) alert(`delete store ${props.storeName}`)
    }
    const validateName = (e) => {
        const input = e.target.value;
        if (input === props.storeName) {
            setDeleteInputClass("delete-input-match");
            setIsInputMatch(true);
        } else {
            setDeleteInputClass("delete-input-unmatch");
            setIsInputMatch(false);
        }
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
                    刪除
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>刪除</h4>
                <p>
                    {`請問您是否確定要刪除店家：${props.storeName}`}
                </p>
                <p>請於下方輸入店家名字，確認刪除。</p>
                <FormControl
                    className={deleteInputClass}
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    onChange={validateName}
                />

            </Modal.Body>
            <Modal.Footer>
                <Button disabled={!isInputMatch} variant="danger" onClick={deleteStore}>刪除</Button>
                <Button variant="secondary" onClick={props.onHide}>取消</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteModal;


import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {makeStyles} from "@material-ui/core/styles";
import {useMemo, useRef, useState} from "react";
import useStackedSnackBar from "../../customHooks/UseStackedSnackBar";
import usePost from "../../customHooks/usePost";
import resizeFile from "./resizeImage";
import {IStore} from "../../types/IStore";
import LoadingIcon from "../Loading/LoadingIcon";
import {Dialog, DialogContent, DialogContentText} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    quill: {
        backgroundColor: "white",
        height: "80vh"
    }
}))

type Props = {
    store: IStore
}

const QuillEditor = (props: Props) => {
    const classes = useStyles();
    const store = props.store;
    const showSnackBar = useStackedSnackBar();
    const {mutateAsync} = usePost();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const quillRef = useRef<any>();

    const uploadImage = async (result: any) => {
        try {
            const formData = new FormData();
            formData.append('upload_image', result);

            const reqProps = {
                url: process.env.REACT_APP_BE_URL + "/api/v1/reviews/image",
                requestBody: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            const response = await mutateAsync(reqProps);
            if (response.status === 200) {
                const data = response.data?.data;
                showSnackBar(`上傳照片成功`, 'success');
                return data.imageUrl;
            } else {
                return new Error()
            }

        } catch (error) {
            showSnackBar(`上傳圖片失敗`, 'error');
        }
    }

    const imageHandler = async () => {
        const editor = quillRef.current?.getEditor()
        const range = editor?.getSelection();

        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();
        input.onchange = async () => {
            if (!input?.files?.[0]) {
                return showSnackBar(`不是正確的圖片`, 'error');
            }
            const file = input.files[0];
            if (/^image\//.test(file.type)) {
                try {
                    setIsLoading(true);
                    const image = await resizeFile(file);
                    let imageUrl = await uploadImage(image);
                    // Insert the server saved image
                    editor?.insertEmbed(range.index, 'image', imageUrl, "user");
                } catch (e) {
                    return showSnackBar(`上傳圖片出現問題`, 'error');
                } finally {
                    setIsLoading(false)
                }

            } else {
                showSnackBar(`僅能上傳圖片檔案`, 'error');
            }
        };
    }

    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{'header': [1, 2, 3, 4, 5, 6, false]}],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{list: 'ordered'}, {list: 'bullet'}],
                ['link', 'image'],
                ['clean'],
            ],
            handlers: {
                image: imageHandler
            },
        },
    }), []);

    const formats = ['header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link', 'image'];


    const onQuillChange = (content: any, delta: any, source: any, editor: any) => {
        // content 是真實的DOM節點
        // delta 記錄了修改的物件，下篇文章詳述
        // source 值為user或api
        // editor 文字框物件，可以呼叫函式獲取content, delta值
        window.localStorage.setItem(`review`, content);

    }

    return (
        <>
            <div>
                {`編輯${store.name}`}
            </div>

            <Dialog open={isLoading}>
                <DialogContent>
                    <DialogContentText id="uploading">
                        上傳圖片中，請稍等
                        <LoadingIcon/>
                    </DialogContentText>
                </DialogContent>
            </Dialog>

            <ReactQuill
                ref={quillRef}
                theme="snow"
                modules={modules}
                formats={formats}
                onChange={onQuillChange}
                placeholder="輸入評論"
                className={classes.quill}
            />
        </>

    )
}

export default QuillEditor

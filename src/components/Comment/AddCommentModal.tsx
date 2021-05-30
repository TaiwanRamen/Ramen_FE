import {Button, Grid, TextField} from "@material-ui/core";
import {makeStyles, Theme} from "@material-ui/core/styles";
import {useUser} from "../../Context/UserContext";
import {useState} from "react";
import Avatar from "@material-ui/core/Avatar";


const useStyles = makeStyles((theme: Theme) => ({
    input: {
        margin: "0 5px",
        float:"right"
    },
    avatar: {
        width: theme.spacing(6),
        height: theme.spacing(6),
    },
    commentBtn: {
        margin: 5,
        padding:0
    }
}))

type Props = {
    storeId: string
}

const AddCommentModal = (props: Props) => {
    const classes = useStyles();
    const [comment, setComment] = useState<string>("")
    const {user} = useUser()!;
    const storeId = props.storeId;

    const addComment = () => {
        console.log(comment)
    }

    return (
        <>
            <Grid container spacing={1}>
                <Grid item>
                    {<Avatar variant="rounded" src={user?.avatar} className={classes.avatar}/>}
                </Grid>
                <Grid item sm={12} md container>

                    <TextField
                        id="storeName"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        className={classes.input}
                        autoComplete='off'
                        onChange={(e: any) => setComment(e.target.value)}
                    />
                </Grid>

                <Button variant="outlined" className={classes.commentBtn} onClick={addComment}>
                    留言
                </Button>

            </Grid>

        </>

    )
        ;
};

export default AddCommentModal;


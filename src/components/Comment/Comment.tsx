import {IComment} from "../../types/IComment";
import {DateTime} from "luxon";
import Avatar from "@material-ui/core/Avatar";
import {makeStyles, Theme} from "@material-ui/core/styles";
import {Box, Grid, Paper, Typography} from "@material-ui/core";
import CommentDropdown from "./CommentDropdown";
import {useState} from "react";
import EditComment from "./EditComment";
// import {useUser} from "../../Context/UserContext";

const useStyles = makeStyles((theme: Theme) => ({
    avatar: {
        marginRight: theme.spacing(2),
    },
    createdTime: {
        margin: 0
    },
    paper: {
        marginTop: 10,
        backgroundColor: "#efefef",
        boxShadow: "2px 2px 5px 1px rgba(0, 0, 0, 0.2)",
        borderRadius: 5,
        padding: 15
    },

}))

type Props = {
    comment: IComment,
}
const Comment = (props: Props) => {
    // const {user} = useUser()!;
    const comment = props.comment;
    //const commentAuthorId = props.comment?.author?.id;
    const [editSectionShow, setEditSectionShow] = useState(false);
    const classes = useStyles();
    const dt = DateTime.fromISO(comment.createdAt).setLocale('zh-tw');

    return (
        <Box mt={4} mb={4}>
            <Grid container spacing={1}>
                <Grid item>
                    {<Avatar src={comment.author.avatar} className={classes.avatar}/>}
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column">
                        <Grid item xs>
                            <Typography variant="subtitle1">
                                {comment.author.username}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {dt.toRelative()}
                            </Typography>
                        </Grid>
                    </Grid>

                    {/*{user && comment && (user._id === commentAuthorId) &&*/}
                    {/*<Grid item>*/}
                    {/*    <Typography variant="body2">*/}
                    {/*        <CommentDropdown comment={comment}/>*/}
                    {/*    </Typography>*/}
                    {/*</Grid>*/}
                    {/*}*/}

                    <Grid item>
                        <Typography variant="body2">
                            <CommentDropdown comment={comment}
                                             editSectionShow={editSectionShow}
                                             setEditSectionShow={setEditSectionShow}
                            />
                        </Typography>
                    </Grid>


                </Grid>
            </Grid>
            {editSectionShow &&
            <EditComment
                comment={comment}
                setEditSectionShow={setEditSectionShow}
            />
            }
            {!editSectionShow &&
            <Paper className={classes.paper}>
                <Grid item spacing={2}>
                    <Typography variant="body1">
                        {comment.text}
                    </Typography>
                </Grid>
            </Paper>
            }


        </Box>
    );
};

export default Comment;

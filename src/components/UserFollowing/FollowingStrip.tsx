import {Paper, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
        strip: {
            backgroundColor: '#f8f9fa!important',
            margin: 10,
            width: "100%",
            height: 60,
            padding: 15
        },
        title: {
            display: "flex",
            justifyContent: "left",
            marginLeft: 15,
            fontSize: "1.25rem",
        },
    }),
);

type Props = {
    store: string
}
const FollowingStrip = (props: Props) => {
    const classes = useStyles();
    const store = props.store;
    return (
        <Paper elevation={2} className={classes.strip}>
            <Typography className={classes.title}>
                {store}
            </Typography>
        </Paper>
    );
};

export default FollowingStrip;

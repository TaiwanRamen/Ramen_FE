import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import {makeStyles, Theme} from "@material-ui/core/styles";
import {IStore} from "../../types/IStore";

const useStyles = makeStyles((theme: Theme) => ({
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
        root: {
            width: '100%',
            maxWidth: 560,
            backgroundColor: theme.palette.background.paper,
            padding:0,
            margin:5,
            boxShadow: '0 2px 4px -2px rgba(0,0,0,0.24), 0 4px 8px -2px rgba(0, 0, 0, 0.2)'
        },
    }),
);

type Props = {
    store: IStore
}
const FollowingStrip = (props: Props) => {
    const classes = useStyles();
    const store = props.store;
    const handleListItemClick = (store: IStore,) => {
        console.log(store._id);
    };
    return (
        <>

            <List className={classes.root}>
                <ListItem
                    button
                    onClick={() => handleListItemClick(props.store)}
                >
                    <ListItemAvatar>
                        <Avatar>
                            <ImageIcon/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={store.name} secondary="Jan 9, 2014"/>
                </ListItem>
            </List>

        </>

    );
};

export default FollowingStrip;

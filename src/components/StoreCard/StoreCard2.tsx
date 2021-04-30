import cx from 'clsx';
import {makeStyles, Theme} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import IconButton from '@material-ui/core/IconButton';
import LocationOn from '@material-ui/icons/LocationOn';
import Favorite from '@material-ui/icons/Favorite';
import Button from '@material-ui/core/Button';
import {IStore} from "../../types/IStore";



const useStyles = makeStyles((theme:Theme) => ({
    root: {
        margin:10,
        overflow: 'initial',
        maxWidth: 500,
        backgroundColor: 'transparent',
        "&:hover":{
            "& $cardMedia": {
                boxShadow: '0 2px 4px -2px rgba(0,0,0,0.24), 0 4px 24px -2px rgba(0, 0, 0, 0.2)'
            },
            "& $content": {
                boxShadow: '0 2px 4px -2px rgba(0,0,0,0.24), 0 4px 24px 2px rgba(0, 0, 0, 0.2)'
            }
        }
    },
    title: {

        maxHeight: "50px",
        marginBottom: 0,
    },
    rateValue: {
        marginLeft: 8,
        fontWeight: 'bold',
        display:'inline',
    },
    content: {
        position: 'relative',
        padding: 24,
        margin: '-15% 16px 0',
        backgroundColor: '#fff',
        borderRadius: 4,
        height: "350px"
    },
    favorite: {
        color:"#7d7d7d",
        fontSize:30
    },
    favoriteBg: {
        zIndex: 100,
        position: 'relative',
        top: 6,
        left: 6,
        backgroundColor:"rgba(255,255,255,0.1)",
        "&:hover":{
            "& $favorite": {
                color: "#e80036"
            },
        }
    },
    locationIcon: {
        marginLeft: 0,
        marginRight: 4,
        fontSize: 16,
    },
    cardMedia: {
        borderRadius:4,
        width: '100%',
        height: 0,
        paddingBottom: '56.25%',
        backgroundColor:'rgba(0, 0, 0, 0.08)',
    },
    fadeShadow: {
        boxShadow: '0 2px 4px -2px rgba(0,0,0,0.24), 0 4px 24px -2px rgba(0, 0, 0, 0.2)'
    },
    readMoreText: {
        fontSize:"1rem",
        color:theme.palette.text.secondary,
    },
    readMoreBtn:{
        position: 'absolute',
        bottom: 20,
        right: 24,
    },
    cardBody:{
        flex: "1 1 auto",
        minHeight: 1,
        padding: "1.25rem",
        overflowY: "scroll",
        maxHeight: "150px"
    }
}));

type Props = {
    store: IStore
}
const ReviewCardDemo = (props: Props) => {
    const store = props.store;
    const classes = useStyles();

    // const mapFlyTo = (e) => {
    //     console.log(e.target)
    // }
    // const imageError = () =>{
    //     return "this.onerror=null;this.src='https://i.imgur.com/siJp2jE.png"
    // }
    // const descriptionTrimer = (description) => {
    //     if (description.length > 200) {
    //         return description.substring(0, 200) + "...";
    //     }
    //     return description;
    // }
    const descriptionTrimmer = (description:string) => {
        if (description.length > 200) {
            return description.substring(0, 200) + "...";
        }
        return description;
    }

    return (
        <Box >
            <Card elevation={0} className={classes.root} id={store._id} >
                <CardMedia
                    className={classes.cardMedia}
                    image={store.imageLarge[0]}
                >
                    <IconButton className={classes.favoriteBg}>
                        <Favorite className={classes.favorite}/>
                    </IconButton>
                </CardMedia>

                <CardContent className={cx(classes.fadeShadow, classes.content)}>


                    <h4 className={classes.title}>{store.name}</h4>

                    <Box color={'grey.500'} display={'flex'} alignItems={'center'} mb={1} mt={1}>
                        <LocationOn className={classes.locationIcon} />
                        <span className={classes.locationIcon}>{store.city}</span>
                    </Box>

                    <Box display={'flex'} alignItems={'center'} mb={0} >
                        <Rating name={'rating'} value={store.rating} size={'small'} precision={0.1}  readOnly />
                        <Typography variant={'body2'} className={classes.rateValue}>
                            {store.rating.toFixed(1)}
                        </Typography>
                    </Box>
                    <div className={classes.cardBody}>
                        <Typography color={'textSecondary'} variant={'body2'} >
                            {descriptionTrimmer(store.descriptionText)}
                        </Typography>
                    </div>

                    <Box mt={2} display={'flex'} justifyContent={'space-between'} alignItems={'center'} className={classes.readMoreBtn}>
                        <Button size={'small'} className={classes.readMoreText}>
                            顯示更多...
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default ReviewCardDemo
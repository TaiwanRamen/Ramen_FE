import cx from 'clsx';
import {makeStyles, Theme} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
//import IconButton from '@material-ui/core/IconButton';
// import BookmarkRoundedIcon from '@material-ui/icons/BookmarkRounded';
import LocalOfferRoundedIcon from '@material-ui/icons/LocalOfferRounded';
import LocationOn from '@material-ui/icons/LocationOn';
import Button from '@material-ui/core/Button';
import {IStore} from "../../types/IStore";
import Divider from '@material-ui/core/Divider';
import usePut from "../../customHooks/UsePut";
import {useUser} from "../../Context/UserContext";
import {useState} from "react";
// import StackedSnackBar from "../SnackBar/StackedSnackBar";
import useStackedSnackBar from "../../customHooks/UseStackedSnackBar";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        margin: 10,
        overflow: 'initial',
        maxWidth: 500,
        backgroundColor: 'transparent',
        "&:hover": {
            "& $cardMedia": {
                boxShadow: '0 2px 4px -2px rgba(0,0,0,0.24), 0 4px 24px -2px rgba(0, 0, 0, 0.2)'
            },
            "& $content": {
                boxShadow: '0 2px 4px -2px rgba(0,0,0,0.24), 0 4px 24px 2px rgba(0, 0, 0, 0.2)'
            }
        }
    },
    title: {
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
        maxHeight: 50,
        marginBottom: 0,

    },
    rateValue: {
        marginLeft: 8,
        fontWeight: 'bold',
        display: 'inline',
    },
    content: {
        position: 'relative',
        padding: 24,
        margin: '-15% 16px 0',
        backgroundColor: '#fff',
        borderRadius: 4,
        height: "350px"
    },
    follow: {
        margin: "2px",
        color: "#7d7d7d",
        fontSize: "0.85rem"
    },
    unfollow: {
        margin: "2px",
        color: "#2589ff",
        fontSize: "0.85rem"
    },
    followBg: {
        zIndex: 100,
        position: 'relative',
        top: 10,
        left: 10,
        backgroundColor: "#f8f9fa!important",
        "&:hover": {
            // "& $follow": {
            //     color: "#2589ff"
            // },
            // "& $unfollow": {
            //     color: "#7d7d7d"
            // },

            backgroundColor: "#E2E2E2!important",
            boxShadow: '0 3px 7px 2px rgba(0,0,0,0.3)'

        },
        "&:hover, &.Mui-focusVisible": {backgroundColor: "white"}
    },
    locationIcon: {
        marginLeft: 0,
        marginRight: 4,
        fontSize: 16,
    },
    cardMedia: {
        borderRadius: 4,
        width: '100%',
        height: 0,
        paddingBottom: '56.25%',
        backgroundColor: 'rgba(0, 0, 0, 0.08)',
    },
    fadeShadow: {
        boxShadow: '0 2px 4px -2px rgba(0,0,0,0.24), 0 4px 24px -2px rgba(0, 0, 0, 0.2)'
    },
    readMoreText: {
        fontSize: "1rem",
        color: theme.palette.text.secondary,
    },
    readMoreBtn: {
        position: 'absolute',
        bottom: 20,
        right: 40,
    },
    cardBody: {
        fontSize: "0.875rem",
        flex: "1 1 auto",
        minHeight: "0.875rem",
        padding: "1.25rem",
        overflow: "hidden",
        maxHeight: "10rem",
        textOverflow: "ellipsis",
        marginBottom: 0,
        whiteSpace: "normal",
        display: "-webkit-box",
        "-webkit-line-clamp": 6,
        "-webkit-box-orient": "vertical",
    },
    divider: {
        width: 230,
        margin: "15px 10px",
    },
}));

type Props = {
    store: IStore
}
const StoreCard = (props: Props) => {
    const store = props.store;
    const classes = useStyles();
    const {user} = useUser()!;
    const showSnackBar = useStackedSnackBar();
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
    const {isLoading, isError, error, mutate} = usePut();

    const [isUserFollowStore, setIsUserFollowStore] = useState<boolean>(store.followers.includes(user?._id as string));


    const handleFollowBtnClick = async () => {
        // if followed, unFollow
        if (isUserFollowStore) {
            const reqProps = {
                url: process.env.REACT_APP_URL + `/api/v1/stores/${store._id}/unfollow`,
                requestBody: {body: "hot"},
            };
            await mutate(reqProps, {
                onSuccess: () => {
                    showSnackBar(`成功取消追蹤: ${store.name}`, 'default');
                    setIsUserFollowStore(!isUserFollowStore);
                },
                onError: () => showSnackBar(`取消追蹤: ${store.name} 失敗`, 'error')
            });

        } else {
            const reqProps = {
                url: process.env.REACT_APP_URL + `/api/v1/stores/${store._id}/follow`,
                requestBody: {body: "hot"},
            };
            await mutate(reqProps, {
                onSuccess: () => {
                    showSnackBar(`成功追蹤: ${store.name}`, 'success');
                    setIsUserFollowStore(!isUserFollowStore);
                },
                onError: () => showSnackBar(`追蹤: ${store.name} 失敗`, 'error')
            });
        }

    }

    const descriptionTrimmer = (description: string) => {
        if (description.length > 200) {
            return description.substring(0, 200) + "...";
        }
        return description;
    }

    return (
        <Box>
            <Card elevation={0} className={classes.root} id={store._id}>
                <CardMedia
                    className={classes.cardMedia}
                    image={store.imageLarge[0]}
                >
                    {
                        user && !isUserFollowStore &&
                        <Button size={"medium"} className={classes.followBg} onClick={() => handleFollowBtnClick()}>
                            <LocalOfferRoundedIcon className={classes.follow}/>
                            <span className={classes.follow}>追蹤</span>
                        </Button>
                    }
                    {
                        user && isUserFollowStore &&
                        <Button size={"medium"} className={classes.followBg} onClick={() => handleFollowBtnClick()}>
                            <LocalOfferRoundedIcon className={classes.unfollow}/>
                            <span className={classes.unfollow}>已追蹤</span>
                        </Button>
                    }


                </CardMedia>

                <CardContent className={cx(classes.fadeShadow, classes.content)}>


                    <h4 className={classes.title}>{store.name}</h4>

                    <Box color={'grey.500'} display={'flex'} alignItems={'center'} mb={1} mt={1}>
                        <LocationOn className={classes.locationIcon}/>
                        <span className={classes.locationIcon}>{store.city}</span>
                    </Box>

                    <Box display={'flex'} alignItems={'center'} mb={0}>
                        <Rating name={'rating'} value={store.rating} size={'small'} precision={0.1} readOnly/>
                        <Typography variant={'body2'} className={classes.rateValue}>
                            {store.rating.toFixed(1)}
                        </Typography>
                    </Box>
                    <div className={classes.cardBody}>
                        <Typography color={'textSecondary'} variant={'body2'}>
                            {descriptionTrimmer(store.descriptionText)}
                        </Typography>
                    </div>

                    <Divider className={classes.divider} orientation="horizontal"/>

                    <Box mt={2} display={'flex'} justifyContent={'space-between'} alignItems={'center'}
                         className={classes.readMoreBtn}>
                        <Button size={'small'} className={classes.readMoreText}>
                            顯示更多
                        </Button>
                    </Box>
                </CardContent>
            </Card>
            <div>
                {isLoading
                    ? "Saving..."
                    : isError
                        ? error.message
                        : "Saved!"}
            </div>
        </Box>
    );
};

export default StoreCard;
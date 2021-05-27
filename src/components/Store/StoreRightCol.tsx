import React from "react";
import {IStore} from '../../types/IStore'
import Comments from "../Comment/Comments";
import CarouselImage from "../Carousel/Carousel";
import Reviews from "../Reviews/Reviews";
import Box from "@material-ui/core/Box";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import FollowBtn from "../FollowBtn/FollowBtn";
import {Link} from "react-router-dom";
import {Paper, Tab, Tabs} from "@material-ui/core";
import {LocationOn} from "@material-ui/icons";
import StoreDropdown from "./StoreDropdown";

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const useStyles = makeStyles(() => ({
    root: {
        padding: 10,
        borderRadius: 10,
    },
    title: {
        margin: 2
    },
    rateValue: {
        marginRight: 2,
        fontWeight: 'bold',
        display: 'inline',
    },
    locationIcon: {
        marginLeft: 0,
        marginRight: 4,
        fontSize: 16,
    },
    reviewCount: {
        marginLeft: 8,
        fontWeight: 'bold',
        display: 'inline',
        textDecoration: "underline",
},
    tabs: {
        color: "black",
        backgroundColor: 'white',
        boxShadow: "none"
    },
    storeDropdown: {
        margin: 10,
        display: "inline",
        float: "right",
    }
}))

type Props = {
    data: {
        mapboxAccessToken: string,
        isStoreOwner: boolean,
        store: IStore
    }
}

const StoreRightCol = (props: Props) => {
    const classes = useStyles();
    const store = props?.data.store;
    const storeId = store?._id;
    const imageUrls = store?.imageLarge;
    const isStoreOwner = true;


    const [value, setValue] = React.useState(0);

    const handleChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Paper className={classes.root}>

            <FollowBtn store={store}/>
            {isStoreOwner &&<StoreDropdown store={store}/>}

            <Box pt={1} p={5}>
                <h2 className={classes.title}>{store.name}</h2>

                <Box color={'grey.500'} display={'flex'} alignItems={'center'} mb={1} mt={1}>
                    <Typography variant={'body2'} className={classes.rateValue}>
                        {store.rating.toFixed(1)}
                    </Typography>
                    <Rating name={'rating'} value={store.rating} size={'small'} precision={0.1} readOnly/>
                    <Typography variant={'body2'} component={Link} to={""} className={classes.reviewCount}>
                        10 則評論
                    </Typography>
                </Box>

                <Box color={'grey.500'} display={'flex'} alignItems={'center'} mb={1} mt={1} ml={1}>
                    <LocationOn className={classes.locationIcon}/>
                    <span className={classes.locationIcon}>{store.city}</span>
                </Box>


                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    className={classes.tabs}
                >
                    <Tab label="Item One"/>
                    <Tab label="Item Two"/>
                </Tabs>
                <TabPanel value={value} index={0}>
                    <CarouselImage imageUrls={imageUrls}/>
                    <Comments storeId={storeId}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Reviews storeId={storeId}/>
                </TabPanel>

            </Box>

        </Paper>
    );
}

export default StoreRightCol;
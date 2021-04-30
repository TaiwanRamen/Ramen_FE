import React from 'react';
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


const useStyles = makeStyles((theme:Theme) => ({
    root: {
        overflow: 'initial',
        maxWidth: 304,
        backgroundColor: 'transparent',
    },
    title: {
        marginBottom: 0,
    },
    rateValue: {
        marginLeft: 8,
        fontWeight: 'bold',
        display:'inline',
        marginBottom:6
    },
    content: {
        position: 'relative',
        padding: 24,
        margin: '-24% 16px 0',
        backgroundColor: '#fff',
        borderRadius: 4,
    },
    favorite: {
        position: 'absolute',
        top: 12,
        right: 12,
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
        backgroundColor:'rgba(0, 0, 0, 0.08)'
    },
    fadeShadow: {
        boxShadow: '0 2px 4px -2px rgba(0,0,0,0.24), 0 4px 24px -2px rgba(0, 0, 0, 0.2)'

    },
    more: {
        color:theme.palette.text.secondary,
    }
}));

export const ReviewCardDemo = React.memo(function ReviewCard() {
    const classes = useStyles();
    // const gutterStyles = usePushingGutterStyles({ firstExcluded: true });
    return (
        <Card elevation={0} className={classes.root}>
            <CardMedia
                className={classes.cardMedia}
                image={
                    'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80'
                }
            />
            <CardContent className={cx(classes.fadeShadow, classes.content)}>
                <IconButton className={classes.favorite}>
                    <Favorite />
                </IconButton>
                <h3 className={classes.title}>麵屋山篩</h3>
                <Box color={'grey.500'} display={'flex'} alignItems={'center'} mb={1} mt={1}>
                    <LocationOn className={classes.locationIcon} />
                    <span className={classes.locationIcon}>台北市</span>
                </Box>
                <Box
                    display={'flex'}
                    alignItems={'center'}
                    mb={0}
                >
                    <Rating name={'rating'} value={2} size={'small'} />
                    <Typography variant={'body2'} className={classes.rateValue}>
                        4.0
                    </Typography>
                </Box>
                <Typography color={'textSecondary'} variant={'body2'}>
                    Talking about travelling or new jobs, many people often think of
                    change of environment...
                </Typography>
                <Box
                    mt={2}
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                >
                    <Box
                        display={'flex'}
                        alignItems={'center'}
                    >
                    </Box>

                    <Button size={'small'} className={classes.more}>
                        顯示更多...
                    </Button>


                </Box>
            </CardContent>
        </Card>
    );
});

export default ReviewCardDemo
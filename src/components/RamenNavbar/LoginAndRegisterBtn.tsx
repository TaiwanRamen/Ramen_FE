import {Link as RouterLink} from "react-router-dom";
import Button from '@material-ui/core/Button';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
// import ExitToAppIcon from '@material-ui/icons/ExitToApp';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        link: {
            fontSize:"1rem",
            color:theme.palette.text.secondary,
            "&:hover":{
                color:theme.palette.text.hint,
            }
        }
    }),
);

const LoginAndRegisterBtn = () => {
    const classes = useStyles();
    return (
        <Button component={RouterLink} to={'/login'} color="inherit" className={classes.link} >登入</Button>
    );
};

export default LoginAndRegisterBtn;

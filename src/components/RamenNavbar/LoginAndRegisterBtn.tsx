import {Link as RouterLink} from "react-router-dom";
import Button from '@material-ui/core/Button';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme:Theme) =>
    createStyles({
        login:{
            color:theme.palette.text.secondary,
            "&:hover":{
                color:theme.palette.text.primary,
            }
        }
    }));
const LoginAndRegisterBtn = () => {
    const classes = useStyles();
    return (
        <Button variant="outlined" component={RouterLink} className={classes.login} to={'/login'}>登入</Button>
    );
};

export default LoginAndRegisterBtn;

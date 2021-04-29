import {Link as RouterLink} from "react-router-dom";
import Button from '@material-ui/core/Button';

const LoginAndRegisterBtn = () => {
    return (
        <Button component={RouterLink} to={'/login'} color="inherit" >登入</Button>
    );
};

export default LoginAndRegisterBtn;

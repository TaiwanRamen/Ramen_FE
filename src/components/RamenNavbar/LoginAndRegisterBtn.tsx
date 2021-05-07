import {Button, DialogActions, Divider, Checkbox} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Login from '../../components/Login/Login'
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {ChangeEvent, useState} from "react";

const useStyles = makeStyles((theme:Theme) =>
    createStyles({
        login:{
            color:theme.palette.text.secondary,
            "&:hover":{
                color:theme.palette.text.primary,
            }
        },
    }));
const LoginAndRegisterBtn = () => {
    const classes = useStyles();
    const [dialogShow, setDialogShow] = useState(false);

    return (
        <>
            <LoginModal
                open={dialogShow}
                onClose={() => setDialogShow(false)}
            />
            <Button variant="outlined" className={classes.login} onClick={() => setDialogShow(true)}>登入</Button>
        </>


    );
};

type Props = {
    open:boolean;
    onClose: () => void;
}
const LoginModal = (props: Props) => {
    const [checked, setChecked] = useState(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };
    return (
        <Dialog
            {...props}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth={true}
            maxWidth={"xs"}
        >
            <DialogTitle id="alert-dialog-title" >登入</DialogTitle>
            <Divider/>
            <DialogContent>
                使用者登入即代表同意本網站之使用者規範
                <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
            </DialogContent>
            <DialogActions>
                {checked && <Login/>}
            </DialogActions>


        </Dialog>
    );
};

export default LoginAndRegisterBtn;

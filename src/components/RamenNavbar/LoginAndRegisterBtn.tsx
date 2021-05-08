import {Button, DialogActions, Divider, Checkbox, FormControlLabel} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Login from '../../components/Login/Login'
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {ChangeEvent, useState} from "react";

const useStyles = makeStyles((theme:Theme) =>
    createStyles({
        actions:{
            justifyContent: "space-between"
        },
        dialogTitle: {
            textAlign:"center",
            fontSize:"2rem",
            fontWeight:700,
        },
        dialogContent: {
            maxHeight: 500
        },
        login:{
            color:theme.palette.text.secondary,
            "&:hover":{
                color:theme.palette.text.primary,
            }
        },
        checkBox: {
            margin:10
        }
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
    const classes = useStyles();
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
            maxWidth={"sm"}
        >

            <DialogTitle id="alert-dialog-title" disableTypography className={classes.dialogTitle}>
                <span>登入</span>
            </DialogTitle>
            <Divider/>
            <DialogContent >
                <DialogContentText
                    id="scroll-dialog-description"
                    tabIndex={-1}
                    className={classes.dialogContent}
                >
                    使用者登入即代表同意本網站之使用者規範
                    1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入
                    1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入
                    1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入
                    1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入                    1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入
                    1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入                    1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入
                    1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入                    1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入
                    1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入                    1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入
                    1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入                    1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入
                    1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入                    1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入
                    1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入                    1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入
                    1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入                    1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入
                    1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入                    1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入
                    1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入                    1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入
                    1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入1. 請先加入

                </DialogContentText>
            </DialogContent>
            <Divider/>
            <DialogActions className={classes.actions}>
                <FormControlLabel
                    value="checkbox"
                    control={<Checkbox
                        color="primary"
                        checked={checked}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                        onChange={handleChange}
                    />}
                    label="我同意以上使用者條款"
                    labelPlacement="end"
                    className={classes.checkBox}
                />
                <Login disabled={!checked}/>
            </DialogActions>


        </Dialog>
    );
};

export default LoginAndRegisterBtn;

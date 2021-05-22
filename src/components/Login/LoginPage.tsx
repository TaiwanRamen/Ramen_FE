import {Checkbox, Divider, FormControlLabel, Paper, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Login from "./Login";
import {ChangeEvent, useState} from "react";
import {useUser} from "../../Context/UserContext";
import {useHistory, useLocation} from "react-router-dom";

const useStyles = makeStyles(() => ({
    root: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        maxHeight: "50vh",
        top: 100,
    },
    paper: {
        backgroundColor: '#f8f9fa!important',
        maxWidth: 800,
        width: "80vw",
    },
    title: {
        textAlign: "center",
        fontSize: "2rem",
        fontWeight: 700,
        margin: 15
    },
    content: {
        height: "60vh",
        position: "relative",
        overflowY: "scroll",
        fontSize: "1rem",
        fontWeight: 400,
        margin: "10px 50px",
        whiteSpace: "pre-line"
    },
    container: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        maxWidth: "1440px",
        width: "80%",
        padding: "0 15px",
        margin: "100px auto 0 auto"
    },
    checkBox: {
        margin: "10px 30px",
    },
    actions: {
        flex: "0 0 auto",
        display: "flex",
        padding: 8,
        alignItems: "center",
        justifyContent: "space-between"
    },
    loginBtn: {
        right: 10
    }
}));
interface LocationState {
    from: {
        pathname: string;
    };
}
const LoginPage = () => {
    const location = useLocation<LocationState>();

    const { from } = location.state || { from: { pathname: "/" } };

    const history = useHistory();
    const {user} = useUser()!;

    const classes = useStyles();
    const [checked, setChecked] = useState(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    if (user) {
        history.push(from)
    }


    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Typography className={classes.title}>
                    登入
                </Typography>
                <Divider/>
                <div className={classes.content}>
                    <Typography>
                        {`使用者登入即代表同意本網站之使用者規範: \n
                        使用者登入即代表同意本網站之使用者規範:使用者登入即代表同意本網站之使用者規範: \n
                        使用者登入即代表同意本網站之使用者規範:使用者登入即代表同意本網站之使用者規範::使用者登入即代表同意本網站之使用者規範::使用者登入即代表同意本網站之使用者規範::使用者登入即代表同意本網站之使用者規範::使用者登入即代表同意本網站之使用者規範::使用者登入即代表同意本網站之使用者規範::使用者登入即代表同意本網站之使用者規範::使用者登入即代表同意本網站之使用者規範::使用者登入即代表同意本網站之使用者規範: \n
                        使用者登入即代表同意本網站之使用者規範:使用者登入即代表同意本網站之使用者規範: \n
                        使用者登入即代表同意本網站之使用者規範:使用者登入即代表同意本網站之使用者規範: \n
                        使用者登入即代表同意本網站之使用者規範:使用者登入即代表同意本網站之使用者規範: \n
                        使用者登入即代表同意本網站之使用者規範:使用者登入即代表同意本網站之使用者規範: \n\n\n
                        使用者登入即代表同意本網站之使用者規範:使用者登入即代表同意本網站之使用者規範:
                        `}

                    </Typography>
                </div>

                <Divider/>
                <div className={classes.actions}>
                    <FormControlLabel
                        value="checkbox"
                        control={<Checkbox
                            color="secondary"
                            checked={checked}
                            inputProps={{'aria-label': 'primary checkbox'}}
                            onChange={handleChange}
                        />}
                        label="我同意以上使用者條款"
                        labelPlacement="end"
                        className={classes.checkBox}
                    />
                    <Login disabled={!checked}/>

                </div>


            </Paper>
        </div>
    );
};

export default LoginPage;

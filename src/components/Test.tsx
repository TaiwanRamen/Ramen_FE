import Button from "@material-ui/core/Button";
import useStackedSnackBar from "../customHooks/UseStackedSnackBar";

const Test = () => {
    const show = useStackedSnackBar();
    return (
        <Button onClick={() => show("message", "success")}>
            hi
        </Button>
    );
};

export default Test;

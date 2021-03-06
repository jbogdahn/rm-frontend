import {Button, Typography} from "@material-ui/core";
import {makeStyles, Theme} from "@material-ui/core/styles";
import {ArrowForward} from "@material-ui/icons";
import clsx from "clsx";
import React from "react";

interface Props {
    title: string;
    showPlaceholder: boolean;
    placeholder: React.ReactNode;
    actionDisabled: boolean;
    action: string;
    onActionClicked: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
    card: {
        width: "calc((100% - 1em) / 2)",
        borderRadius: "8px",
        border: "1px solid #CCC",
        display: "flex",
        flexDirection: "column"
    },
    cardHeader: {
        color: "#007c92",
        fontFamily: "Montserrat, sans-serif",
        fontSize: "16px",
        fontWeight: 600,
        padding: "24px 24px 0px 24px"
    },
    cardContent: {
        padding: "12px 24px",
        flexGrow: 1
    },
    cardPlaceholder: {
        width: "100%",
        display: "block",
        textAlign: "center",
        padding: "36px",
        fontFamily: "Montserrat, sans-serif",
        color: "rgba(0,0,0,0.54)"
    },
    cardLink: {
        textTransform: "none",
        fontFamily: "Montserrat, sans-serif",
        width: "100%",
        transition: theme.transitions.create("background-color"),
        justifyContent: "left",
        padding: "12px 24px",
        fontWeight: 600,
        color: "#007c92",
        "&:hover": {
            backgroundColor: "rgba(0,0,0,0.04)"
        }
    },
    cardFooterLink: {
        borderTopLeftRadius: "0px",
        borderTopRightRadius: "0px"
    }
}));

const ContentCard: React.FC<Props> = props => {
    const classes = useStyles();

    return (
        <div className={classes.card}>

            <Typography className={classes.cardHeader}>{props.title}</Typography>

            {!props.showPlaceholder && (
                <div className={classes.cardContent}>
                    {props.children}
                </div>
            )}

            {props.showPlaceholder && (
                <div className={classes.cardPlaceholder}>
                    {props.placeholder}
                </div>
            )}

            <Button
                onClick={props.onActionClicked}
                disabled={props.actionDisabled}
                startIcon={<ArrowForward/>}
                variant="text"
                className={clsx(classes.cardLink, classes.cardFooterLink)}>
                {props.action}
            </Button>

        </div>
    );
};

export default ContentCard;

import React, {Component} from "react";
import {createStyles, Theme, withStyles} from "@material-ui/core/styles";
import {WithStylesPublic} from "../util/WithStylesPublic";
import {Artikel} from "../Model/Artikel";
import {apiDelete, apiGet} from "../util/ApiUtils";
import {Institution} from "../Model/Institution";
import {FormTextInput} from "../components/FormTextInput";
import {FormButton} from "../components/FormButton";
import DemandTable from "../components/DemandTable";
import AddDemandDialog from "./Dialogs/AddDemandDialog";
import {Bedarf} from "../Model/Bedarf";

interface Props extends WithStylesPublic<typeof styles> {
}

interface State {
    addDialogOpen: boolean;
    searchFilter: string;
    artikel?: Artikel[];
    bedarf?: Bedarf[];
    ownInstitution?: Institution;
}

const styles = (theme: Theme) =>
    createStyles({
        tableHeader: {
            marginTop: "64px",
            marginBottom: "16px",
            display: "flex",
            justifyContent: "space-between"
        },
        searchInput: {
            width: "40%",
            minWidth: "200px"
        }
    });

class DemandScreen extends Component<Props, State> {
    state: State = {
        addDialogOpen: false,
        searchFilter: ""
    };

    render() {
        const classes = this.props.classes!;

        return (
            <>
                <div className={classes.tableHeader}>
                    <FormTextInput
                        className={classes.searchInput}
                        label="Bedarf durchsuchen..."
                        changeListener={this.setFilter}
                        value={this.state.searchFilter}/>
                    <FormButton
                        onClick={() => this.setState(state => ({addDialogOpen: !state.addDialogOpen}))}>
                        Bedarf anlegen
                    </FormButton>
                </div>
                <DemandTable rows={this.filter()} onDelete={this.onDelete} ownInstitutionId={this.state.ownInstitution?.id || ""}/>
                <AddDemandDialog
                    open={this.state.addDialogOpen}
                    onCancelled={this.onAddCancelled}
                    onSaved={this.onAddSaved}
                    artikel={this.state.artikel || []}/>
            </>
        )
    }

    private onDelete = async (id: string) => {
        await apiDelete("/remedy/bedarf/" + id);
        this.loadBedarf();
    };

    private setFilter = (value: string) => {
        this.setState({searchFilter: value});
    };

    private filter = () => {
        return (this.state.bedarf || [])
            .filter(bedarf => JSON.stringify(Object.values(bedarf)).toLowerCase().indexOf(this.state.searchFilter.toLowerCase()) !== -1);
    };

    private onAddCancelled = () => {
        this.setState({addDialogOpen: false});
    };

    private onAddSaved = () => {
        this.setState({addDialogOpen: false});
        this.loadBedarf();
    };

    componentDidMount = async () => {
        this.loadArtikel();
        this.loadBedarf();
        this.loadInstitution();
    };

    private loadArtikel = async () => {
        const result = await apiGet<Artikel[]>("/remedy/artikel/suche");
        if (!result.error) {
            this.setState({
                artikel: result.result
            });
        }
    };

    private loadBedarf = async () => {
        const result = await apiGet<Bedarf[]>("/remedy/bedarf");
        if (!result.error) {
            this.setState({
                bedarf: result.result
            });
        }
    };

    private loadInstitution = async () => {
        const result = await apiGet<Institution>("/remedy/institution/assigned");
        if (!result.error) {
            this.setState({
                ownInstitution: result.result
            });
        }
    };
}

export default withStyles(styles)(DemandScreen);
import * as React from 'react';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch, Action } from 'redux';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Theme, createStyles, withStyles, LinearProgress } from '@material-ui/core';

import routes from '../routes';
import { AppComponentProps, AppComponentState } from './app.d';
import { stat } from 'fs';

const theme = createMuiTheme({
    typography: {
        useNextVariants: true
    }
});

const styles = (theme: Theme) =>
    createStyles({
        progressBar: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%'
        }
    });

class AppComponent extends React.Component<AppComponentProps, AppComponentState> {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;
        return (
            <MuiThemeProvider theme={theme}>
                <LinearProgress hidden={!this.props.loading} color='secondary' className={classes.progressBar} />
                <Router>
                    <main>{renderRoutes(routes)}</main>
                </Router>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = (state) => ({
    loading: state.global.loading
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AppComponent));

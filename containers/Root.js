// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import Routes from '../routes';
import CssBaseline from 'material-ui/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import purple from 'material-ui/colors/purple';

const theme = createMuiTheme({
  palette: {
    primary: { main: purple[800] }, // Purple and green play nicely together.
    secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
  },
});

type Props = {
  store: {},
  history: {}
};

export default class Root extends Component<Props> {

  render() {
    console.log('rendering root')
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline>
                <Provider store={this.props.store}>
                    <ConnectedRouter history={this.props.history}>
                        <Routes store={this.props.store} />
                    </ConnectedRouter>
                </Provider>
            </CssBaseline>
        </MuiThemeProvider>


    );
  }
}

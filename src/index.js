import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {QueryClient, QueryClientProvider} from 'react-query';
import {SnackbarProvider} from 'notistack';
import {UserProvider} from "./Context/UserContext";
import {history} from "./utils/history";
import {Router} from "react-router";
import {Grow} from "@material-ui/core";
import ScrollToTop from "./customHooks/ScrollToTop";

const queryClient = new QueryClient();

ReactDOM.render(
    <React.StrictMode>
        <SnackbarProvider
            maxSnack={3}
            TransitionComponent={Grow}
        >
            <QueryClientProvider client={queryClient}>
                <UserProvider>
                    <Router history={history}>
                        <ScrollToTop />
                        <App/>
                    </Router>
                </UserProvider>
            </QueryClientProvider>
        </SnackbarProvider>

    </React.StrictMode>,
    document.getElementById('root')
);

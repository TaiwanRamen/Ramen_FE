import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {QueryClient, QueryClientProvider} from 'react-query';
import {SnackbarProvider} from 'notistack';
import Grow from '@material-ui/core/Grow';


const queryClient = new QueryClient();

ReactDOM.render(
    <React.StrictMode>
        <SnackbarProvider
            maxSnack={3}
            TransitionComponent={Grow}
        >
            <QueryClientProvider client={queryClient}>
                <App/>
            </QueryClientProvider>
        </SnackbarProvider>

    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
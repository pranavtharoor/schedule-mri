import '@babel/polyfill';
import { hot } from 'react-hot-loader/root';
import React from 'react';
import ReactDOM from 'react-dom';
import App from 'Src/components/App';

let Root = () => <App />;

Root = process.env.NODE_ENV === 'development' ? hot(Root) : Root;

ReactDOM.render(<Root />, document.getElementById('root'));

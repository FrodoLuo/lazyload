import React from 'react';
import ReactDOM from 'react-dom';
import LazyImage from '../../src/index';

const App = () => (
    <div>
        <div style={{
            height: 2000,
            backgroundColor: 'whitesmoke',
        }} />
        <LazyImage src="https://i.imgur.com/qgdHAFa.jpg" offset={200} />
    </div>
)

ReactDOM.render(
    <App />
, document.getElementById('root'));
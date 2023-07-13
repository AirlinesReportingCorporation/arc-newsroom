require('file-loader?name=[name].[ext]!./index.html');
import ReactDOM from 'react-dom/client';
import Newsroom from './app';
import "./scss/main.scss";

const root = ReactDOM.createRoot(document.getElementById('app'))

root.render(<Newsroom />); 
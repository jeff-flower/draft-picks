import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './components';
import { FirebaseProvider } from './components/Firebase';

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <FirebaseProvider>
      <App />
    </FirebaseProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

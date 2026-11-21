import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ContentProvider } from './content/ContentContext';
import { ThemeProvider } from './content/ThemeContext';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ContentProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ContentProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

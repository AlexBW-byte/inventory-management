import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { InventoryProvider } from './context/InventoryContext';


ReactDOM.render(
  <InventoryProvider>
    <App />
  </InventoryProvider>,
  document.getElementById('root')
);
reportWebVitals();

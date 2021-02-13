import './App.css';
import store from "./store";
import { Provider } from 'react-redux';
import { BrowserRouter as Router,} from "react-router-dom";
import Routes from "./routes"

function App() {
    return (
        <Provider store={store}>
          <div className="main-wrapper">
            <Router>
              <Routes/>
            </Router>
          </div>
        </Provider>
    );
}

export default App;

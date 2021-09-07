import { BrowserRouter, Route } from "react-router-dom";
import './App.css';
// import { Provider } from "react-redux";
import LandingPage from './pages/landingPage';
import Home from './pages/home';
import BreedDetail from './pages/breedDetail';

function App() {
  return (
    // <Provider>
    <BrowserRouter>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/breed/:id" component={BreedDetail} />
    </BrowserRouter>
    // </Provider>
  );
}

export default App;

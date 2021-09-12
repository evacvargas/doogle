import { BrowserRouter, Route } from "react-router-dom";
import './App.css';
import LandingPage from './pages/landingPage';
import Home from './pages/home';
import BreedDetail from './pages/breedDetail';
import CreateBreed from './components/CreateBreed';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/breed/:id" component={BreedDetail} />
      <Route exact path="/createBreed" component={CreateBreed} />
    </BrowserRouter>
  );
}

export default App;

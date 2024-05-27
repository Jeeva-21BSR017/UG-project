import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Cartscreen from './screens/Cartscreen';
import 'bootstrap';
import {BrowserRouter , Route , Link , Switch } from 'react-router-dom'
import Homescreen from './screens/Homescreen';
import Registerscreen from './screens/Registerscreen';
import Loginscreen from './screens/Loginscreen';
import About from './screens/About';
import Orderscreen from './screens/Orderscreen';
import Adminscreen from './screens/Adminscreen';
import Feedbacks from './screens/Feedbacks';
function App() {
  return (
    <div className="App">
      <Navbar/>
      <BrowserRouter>
      <Route path="/" exact component={Homescreen} />
      <Route path="/cart" exact component={Cartscreen}/>
      <Route path="/about" exact component={About}/>
      <Route path="/register" exact component={Registerscreen}/>
      <Route path="/login" exact component={Loginscreen}/>
      <Route path="/orders" exact component={Orderscreen}/>
      <Route path='/admin' component={Adminscreen}/>
      <Route path="/feedbacks" component={Feedbacks} />
    </BrowserRouter>
    </div>
  );
}

export default App;

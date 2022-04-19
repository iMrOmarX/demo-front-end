import Form from './Form/Form-component';
import Search from './Serach/search-component';
import './App.css';

import {
  BrowserRouter as Router,
  Routes ,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (

      <Router >
        
        <div className='app'>
          <nav className='center'>
            <ul>
              <li>
                <Link to="/">Add</Link>
              </li>
              <li>
                <Link to="/search">Search</Link>
              </li>
            </ul>
          </nav>

          <h1 className='center'>Searchable Encryption Demo</h1> 
          <h2  className='center'>Done by: Omar Aburish</h2> 
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Routes>
            <Route path="/" element={<Form></Form>}/>
            
            <Route path="/search" element={<Search></Search>} />
              
          </Routes>
        </div>
      </Router>
    
  );
}

export default App;

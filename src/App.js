import Home from './pages/Home'
import About from './pages/About'
import NotFound from './pages/NotFound';
import Compare from './pages/Compare'
import CarStats from './pages/CarStats';
import Rankings from './pages/Rankings'
import Navbar from './components/layouts/Navbar';
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom'
import Footer from './components/layouts/Footer'
function App() {
  return (
    <Router>
      <div className='page-container'>
        <Navbar/>
        <main>
          <Routes>
            <Route path = '/' element = {<Home/>}/>
            <Route path = '/about' element = {<About/>} />
            <Route path = '/carstats' element = {<CarStats/>}/>
            <Route path = '/compare' element = {<Compare/>}/>
            <Route path = '/rankings' element = {<Rankings/>}/>
            <Route path = '/*' element = {<NotFound/>}/>
            <Route path = '/notfound' element = {<NotFound/>}/>
          </Routes>
        </main>
        <Footer/>
      </div>
    </Router>
  )
}

export default App;

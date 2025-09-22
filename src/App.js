import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from "./pages/Login"
import Form from "./pages/Form";
import Page404 from "./pages/Page404"
import Navbar from './components/Navbar';
import PrivateRoute from "./components/PrivateRoute"
import { AuthContextProvider } from './context/authContext';
import { ClientContextProvider } from "./context/clientContext";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <AuthContextProvider>
      <ClientContextProvider>
        <Router>
          {/* <Navbar /> */}
          <div id='wrapper' className="d-flex vh-100 overflow-auto p-0">
            <Routes>
              <Route path='/' element={<Navigate to="/login" />} />
              <Route path='login' element={<Login />} />
              <Route path='/inicio' element={<Form />} />
              <Route path='/consult' element={<Form />} />
              <Route path='*' element={<Page404 />} />
            </Routes>
          </div>
        </Router>
      </ClientContextProvider>
    </AuthContextProvider>
  );
}

export default App;

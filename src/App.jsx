import Footer from "./components/footer/Footer";
import Navbar from "./components/Navigation/Navigation"
import AppRoutes from "./routes/AppRoutes"
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import AdminLogAlert from "./components/AdminLogAlert/AdminLogAlert";

function App() {
  return (
    <div className="classname main">
      <Navbar />
      {/* <AdminLogAlert /> */}

      <AppRoutes />
      <Footer />
    </div>

  )

}

export default App

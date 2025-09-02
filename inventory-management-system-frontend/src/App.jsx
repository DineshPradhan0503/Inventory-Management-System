import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';
import { store } from './store';

// Layout Components
import Header from './components/common/Header';
import Sidebar from './components/common/Sidebar';

// Authentication Components
import ProtectedRoute from './components/auth/ProtectedRoute';
import Login from './components/auth/Login';

// Page Components
import Dashboard from './pages/Dashboard';
import ProductsPage from './pages/ProductsPage';
import SalesPage from './pages/SalesPage';
import ReportsPage from './pages/ReportsPage';
import CategoriesPage from './pages/CategoriesPage';

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

// Layout component for authenticated pages
const Layout = ({ children }) => (
  <div className="app">
    <Header />
    <div className="container">
      <Sidebar />
      <main className="main-content">
        {children}
      </main>
    </div>
  </div>
);

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            {/* Public Route - Login */}
            <Route path="/login" element={<Login />} />
            
            {/* Protected Routes with Layout */}
            <Route path="/" element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/products" element={
              <ProtectedRoute>
                <Layout>
                  <ProductsPage />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/sales" element={
              <ProtectedRoute>
                <Layout>
                  <SalesPage />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/reports" element={
              <ProtectedRoute>
                <Layout>
                  <ReportsPage />
                </Layout>
              </ProtectedRoute>
            } />

            <Route path="/categories" element={
              <ProtectedRoute>
                <Layout>
                  <CategoriesPage />
                </Layout>
              </ProtectedRoute>
            } />
          </Routes>
          <ToastContainer />
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import TodoPage from "./pages/TodoPage";
import NoLayout from "./layouts/NoLayout";
import TodoDetailPage from "./pages/TodoDetailPage";
import TodoMapPage from "./pages/TodoMapPage";
import SalePage from "./pages/SalePage";
import CartPage from "./pages/CartPage";
import SaleInvoicePage from "./pages/SaleInvoicePage";
import SaleOrderPage from "./pages/SaleOrderPage";
import CustomerPage from "./pages/CustomerPage";
import PrivateRoute from "./components/protect/PrivateRoute";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import AuthCheck from "./components/share/AuthCheck";
import NotFoundPage from "./pages/NoteFoundPage";
import SaleInvoiceSuccessPage from "./pages/SaleInvoiceSuccessPage";
import SaleOrderSuccessPage from "./pages/SaleOrderSuccessPage";
import TestPage from "./pages/TestPage";

function App() {
  return (
    <Router>
      <AuthCheck />
      <Routes>
        {/* Main Layout */}
        <Route
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          <Route path="/" element={<HomePage />} />
          <Route path="/todo" element={<TodoPage />} />
          <Route path="/sale" element={<SalePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        {/* No Layout */}
        <Route
          element={
            <PrivateRoute>
              <NoLayout />
            </PrivateRoute>
          }
        >
          <Route path="/todo/:id" element={<TodoDetailPage />} />
          <Route path="/todo/map/all" element={<TodoMapPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/sale-invoice" element={<SaleInvoicePage />} />
          <Route path="/sale-order" element={<SaleOrderPage />} />
          <Route path="/customer" element={<CustomerPage />} />
          <Route path="/ordered-invoice" element={<SaleInvoiceSuccessPage />} />
          <Route path="/ordered-order" element={<SaleOrderSuccessPage />} />
          <Route path="/test" element={<TestPage />} />
        </Route>

        {/* Public Page */}
        <Route element={<NoLayout />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/* Not Found Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;

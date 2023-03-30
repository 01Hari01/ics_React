import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./ProtectedRoute";

const Login = lazy(() => import("../pages/authentication/Login"));
const Signup = lazy(() => import("../pages/authentication/Signup"));
const Logout = lazy(() => import("../pages/authentication/logout"))
const LandingPage = lazy(() => import("../pages/LandingPage"));
const SuppliersPage = lazy(() => import("../pages/suppliers/SuppliersPage"));
const ProductsPage = lazy(() => import("../pages/Products/AddProducts/ProductsMainPage"));
const ProductsDisplay = lazy(() => import("../pages/Products/ProductsDisplay/ProductsDisplayPage"));



function Routers() {
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route  element={<ProtectedRoute/>}>
                        <Route path="/suppliers" element={<SuppliersPage/>} />
                        <Route path="/addproducts" element={<ProductsPage />} />
                        <Route path="/products" element={<ProductsDisplay />} />
                        <Route path="/logout" element={<Logout />} />
                    </Route>
                    <Route path="/" element={<LandingPage/>}/>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />

                </Routes>
            </Suspense>
        </Router>
    );
}

export default Routers;

import { useState, useEffect } from "react";
import "./App.css";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import AuthDetails from "./components/auth/AuthDetails";
import EventPage from "./EventPage";
import "firebase/compat/auth";

// import {
//     BrowserRouter as Router,
//     Routes,
//     Route,
//     Navigate,
// } from "react-router-dom";

// import LoginPage from "./LoginPage";

function App() {
    const [authUser, setAuthUser] = useState(null);
    const [hasSignedOut, setHasSignedOut] = useState(false);
    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
    return (
        <>
            <div>
                <h1>Workshops in France Event Manager</h1>
                <h4>Created by Jon Schubbe</h4>
            </div>
            <SignIn />
            <SignUp />
            <AuthDetails
                authUser={authUser}
                setAuthUser={setAuthUser}
                hasSignedOut={hasSignedOut}
                setHasSignedOut={setHasSignedOut}
            />
            {authUser && authUser.email === adminEmail && <EventPage />}
        </>
    );
}

export default App;

// function App() {
//     const [isAuthenticated, setIsAuthenticated] = useState(false);

//     useEffect(() => {
//         firebase.auth().onAuthStateChanged((user) => {
//             setIsAuthenticated(!!user);
//         });
//     }, []);

//     return (
//         <Router>
//             <Routes>
//                 {/* Define other routes as needed */}
//                 <Route
//                     path="/"
//                     element={
//                         isAuthenticated ? (
//                             <EventPage />
//                         ) : (
//                             <Navigate to="/login" />
//                         )
//                     }
//                 />
//                 <Route path="/login" element={<LoginPage />} />
//                 {/* Add a default route or redirect if necessary */}
//             </Routes>
//         </Router>
//     );
// }

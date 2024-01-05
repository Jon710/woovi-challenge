import { Routes, Route } from "react-router-dom";

// import { LoginLayout } from "./LoginLayout";

// import { LoginPage } from "./LoginPage";
import SignIn from "./pages/auth/SignIn";
// import { SignupPage } from "./SignupPage";

export const AuthRoutes = () => (
  <Routes>
    <Route path="/" element={<SignIn />}>
      {/* <Route index element={<LoginPage />} /> */}
      {/* <Route path="signup" element={<SignupPage />} /> */}
    </Route>
  </Routes>
);

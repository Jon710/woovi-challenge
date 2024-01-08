import { Routes as Router, Route } from "react-router-dom";

import { AuthRoutes } from "./AuthRoutes";
// import { RequireAuthLayout } from "./modules/auth/RequireAuthLayout";
// import { FeedPage } from "./modules/feed/FeedPage";

export const Routes = () => (
  <Router>
    <Route path="/*" element={<AuthRoutes />} />
    {/* <Route element={<RequireAuthLayout />}>
      <Route path="/feed" element={<FeedPage />} />
    </Route> */}
  </Router>
);

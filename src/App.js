import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Detail from "./views/core/Detail";
import Search from "./views/core/Search";
import Category from "./views/core/Category";
import About from "./views/pages/About";
import Contact from "./views/pages/Contact";
import Register from "./views/auth/Register";
import Login from "./views/auth/Login";
import Logout from "./views/auth/Logout";
import ForgotPassword from "./views/auth/ForgotPassword";
import CreatePassword from "./views/auth/CreatePassword";
import Dashboard from "./views/dashboard/Dashboard";
import Posts from "./views/dashboard/Posts";
import AddPost from "./views/dashboard/AddPost";
import EditPost from "./views/dashboard/EditPost";
import Comments from "./views/dashboard/Comments";
import Notifications from "./views/dashboard/Notifications";
import Profile from "./views/dashboard/Profile";
import MainLayout from "./layouts/MainLayout";
import PrivateRoute from "./layouts/PrivateRoute";
import Home from "./views/core/Home";
import CategoryPostsPage from "./views/core/CategoryPostsPage";
import Postowner from "./views/dashboard/Postowner";
function App() {
  return (
    <>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:slug/" element={<Detail />} />

            <Route path="/category/" element={<Category />} />
            <Route path="/search/" element={<Search />} />

            <Route path="/register/" element={<Register />} />
            <Route path="/login/" element={<Login />} />
            <Route
              path="/logout/"
              element={
                <PrivateRoute>
                  <Logout />
                </PrivateRoute>
              }
            />
            <Route path="/forgot-password/" element={<ForgotPassword />} />
            <Route path="/create-new-password/" element={<CreatePassword />} />

            <Route
              path="/dashboard/"
              element={
                <PrivateRoute>
                  {" "}
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route path="/posts/" element={<Posts />} />
            <Route
              path="/add-post/"
              element={
                <PrivateRoute>
                  <AddPost />
                </PrivateRoute>
              }
            />
            <Route
              path="/edit-post/:id/"
              element={
                <PrivateRoute>
                  <EditPost />
                </PrivateRoute>
              }
            />
            <Route path="/comments/" element={<Comments />} />
            <Route
              path="/notifications/"
              element={
                <PrivateRoute>
                  <Notifications />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile/"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/category/:categorySlug/"
              element={<CategoryPostsPage />}
            />

            <Route path="/postowner/:slug" element={<Postowner />} />
            <Route path="/about/" element={<About />} />
            <Route path="/contact/" element={<Contact />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </>
  );
}

export default App;

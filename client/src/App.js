import * as React from "react";
import "./App.css";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import Home from "./pages/Home";
import ProfileComplete from "./pages/profileComplete";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import ExpandedPost from "./pages/expanded_post";
import ProtectedRoute from "./Components/protectedRoutes"
function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <Routes>
          <Route exact path='/' element={<SignIn />} />
          <Route
            path='/home'
            element={<ProtectedRoute PHComponent={<Home />} />}
          />
          <Route exact path='/signup' element={<SignUp />} />
          <Route exact path='/post/:post_id' element={<ProtectedRoute PHComponent={<ExpandedPost />} />}></Route>
        </Routes>
      </div>
    </Provider>
  );
}

export default App;

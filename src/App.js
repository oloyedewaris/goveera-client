import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./components/NavBar/Navbar";
import Spinner from "./components/Spinner/Spinner";
import large from "./hoc/largeScreenWrapper";
import auth from "./hoc/auth";

//pages
import LandingPage from "./pages/LandingPage/LandingPage";
import Login from "./pages/Login/Login";
import RegisterUser from "./pages/Register/RegisterUser";
import RegisterCompany from "./pages/Register/RegisterCompany";
import Discover from "./pages/Discover/Discover";
import MyColleagues from "./pages/Discover/Colleagues";
import Profile from "./pages/Profile/Profile";
import Create from "./components/Create/Create";
import Footer from "./components/Footer/Footer";
import Contact from "./components/Details/Contact";
import About from "./components/Details/About";
import AboutApp from "./components/Details/AboutApp";
import Settings from "./pages/Settings/Settings";
import Notifications from "./pages/Notifications/Notifications";
import Feeds from "./pages/Feeds/Feeds";
import Post from "./pages/Posts/Post";
import Project from "./pages/Projects/Project";
import Poll from "./pages/Polls/Poll";
import SavedItem from "./pages/Saves/SavedItem";
import Whoops404 from "./util/Whoops404";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import 'react-toastify/dist/ReactToastify.css';
import './App.less';

//fallback loading
const loading = (
  <div className="app_spinner_container">
    <Spinner />
  </div>
)

const App = () => {
  const token = localStorage.getItem('token')

  return (
    <React.Suspense fallback={loading}>
      <Navbar />
      <div className='below_nav'>
        <ScrollToTop>
          <Switch>
            <Route exact path="/">{token ? <Redirect strict from="/" to='/home' /> : <LandingPage />}</Route>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={RegisterUser} />
            <Route exact path="/register/company" component={RegisterCompany} />
            <Route exact path="/create" component={auth(large(Create))} />
            <Route exact path="/home" component={auth(large(Feeds))} />
            <Route exact path="/notifications" component={auth(large(Notifications))} />
            <Route exact path="/discover" component={auth(large(Discover))} />
            <Route exact path="/colleagues" component={auth(large(MyColleagues))} />
            <Route exact path="/post/:id" component={auth(large(Post))} />
            <Route exact path="/project/:id" component={auth(large(Project))} />
            <Route exact path="/poll/:id" component={auth(large(Poll))} />
            <Route exact path="/profile/:id" component={auth(large(Profile))} />
            <Route exact path="/settings" component={auth(large(Settings))} />
            <Route exact path='/saved_items' component={auth(large(SavedItem))} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/about" component={About} />
            <Route exact path="/about_app" component={AboutApp} />
            <Route component={Whoops404} />
          </Switch>
        </ScrollToTop>
      </div>
      <Footer />
    </React.Suspense>
  );
};

export default App;
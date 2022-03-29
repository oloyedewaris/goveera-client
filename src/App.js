import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./components/NavBar/Navbar";
import Spinner from "./components/Spinner/Spinner";
import large from "./hoc/largeScreenWrapper";
import auth from "./hoc/auth";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import 'react-toastify/dist/ReactToastify.css';
import './App.less';

//pages
const LandingPage = React.lazy(() => import("./pages/LandingPage/LandingPage"));
const Login = React.lazy(() => import("./pages/Login/Login"));
const RegisterUser = React.lazy(() => import("./pages/Register/RegisterUser"));
const RegisterCompany = React.lazy(() => import("./pages/Register/RegisterCompany"));
const Discover = React.lazy(() => import("./pages/Discover/Discover"));
const MyColleagues = React.lazy(() => import("./pages/Discover/Colleagues"));
const Profile = React.lazy(() => import("./pages/Profile/Profile"));
const Create = React.lazy(() => import("./components/Create/Create"));
const Footer = React.lazy(() => import("./components/Footer/Footer"));
const Contact = React.lazy(() => import("./components/Details/Contact"));
const About = React.lazy(() => import("./components/Details/About"));
const AboutApp = React.lazy(() => import("./components/Details/AboutApp"));
const Settings = React.lazy(() => import("./pages/Settings/Settings"));
const Notifications = React.lazy(() => import("./pages/Notifications/Notifications"));
const Feeds = React.lazy(() => import("./pages/Feeds/Feeds"));
const Post = React.lazy(() => import("./pages/Posts/Post"));
const Project = React.lazy(() => import("./pages/Projects/Project"));
const Poll = React.lazy(() => import("./pages/Polls/Poll"));
const SavedItem = React.lazy(() => import("./pages/Saves/SavedItem"));
const Whoops404 = React.lazy(() => import("./util/Whoops404"));

const App = () => {
  const token = localStorage.getItem('token')

  return (
    <React.Suspense fallback={<Spinner />}>
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
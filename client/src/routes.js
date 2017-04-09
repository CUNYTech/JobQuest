import Base from './components/Base/Base';
import HomePage from './components/HomePage/HomePage';
import DashboardPage from './components/Dashboard/DashboardPage';
import LoginPage from './components/LoginForm/LoginPage';
import SignUpPage from './components/SignUpForm/SignUpPage';
import ProfilePage from './components/Profile/ProfilePage';
import ForumPage from './components/Forum/ForumPage';
import ThreadForm from './components/ThreadForm/ThreadForm';
import ThreadPage from './components/ThreadPage/ThreadPage';
import ProfileContainer from './components/ProfileContainer/ProfileContainer';
import InterviewItemContainer from './components/InterviewItemContainer/InterviewItemContainer';
import InterviewForm from './components/InterviewForm/InterviewForm';
import AboutPage from './components/AboutPage/AboutPage';
import ResourcePage from './components/ResourcePage/ResourcePage';
import Auth from './modules/Auth';


const routes = {
  // base component (wrapper for the whole application).
  component: Base,
  childRoutes: [
    {
      path: '/',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, DashboardPage);
        } else {
          callback(null, HomePage);
        }
      }
    },

    {
      path: '/login',
      component: LoginPage
    },

    {
      path: '/signup',
      component: SignUpPage
    },

    {
      path: '/logout',
      onEnter: (nextState, replace) => {
        Auth.deauthenticateUser();

        // change the current URL to /
        replace('/');
      }
    },

    {
      path: '/profile',
      component: ProfilePage
    },

    {
      path: '/forum',
      component: ForumPage
    },

    {
      path: '/new_post',
      component: ThreadForm
    },

    {
      path: '/thread/:id',
      component: ThreadPage
    },
    
    {
      path: '/app-log',
      component: ProfileContainer
    },

    {
      path: '/interview',
      component: InterviewItemContainer  
    },

    {
      path: '/postNewInterview',
      component: InterviewForm
    },

    {
      path: '/about',
      component: AboutPage
    },

    {
      path: '/resources',
      component: ResourcePage
    }

  ]
};
export default routes;

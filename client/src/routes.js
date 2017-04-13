import Base from './components/Base/Base';
import HomePage from './components/HomePage/HomePage';
import DashboardPage from './components/Dashboard/DashboardPage';
import LoginPage from './components/LoginForm/LoginPage';
import SignUpPage from './components/SignUpForm/SignUpPage';
import ProfilePage from './components/Profile/ProfilePage';
import ForumLayout from './components/ForumLayout/ForumLayout';
import ThreadForm from './components/ThreadForm/ThreadForm';
import ThreadPage from './components/ThreadPage/ThreadPage';
import ThreadListPage from './components/ThreadListPage/ThreadListPage';
import AppLogContainer from './components/AppLogContainer/AppLogContainer';
import InterviewItemContainer from './components/InterviewItemContainer/InterviewItemContainer';
import InterviewForm from './components/InterviewForm/InterviewForm';
import AboutPage from './components/AboutPage/AboutPage';
import ResourcePage from './components/ResourcePage/ResourcePage';
import InterviewPage from './components/InterviewPage/InterviewPage';
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
      component: ForumLayout,
      indexRoute: {component: ThreadListPage},
      childRoutes: [{
        path: 'thread/:id',
        onEnter: ({ params }, replace) => replace(`/thread/${params.id}`)
      }]
    },

    {
      component: ForumLayout,
      childRoutes: [{
        path: 'thread/:id', component: ThreadPage
      }]
    },
    
    {
      path: '/new_post',
      component: ThreadForm
    },

    {
      path: '/app-log',
      component: AppLogContainer
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
      path: '/interview/:id',
      component: InterviewPage
    },

    {
      path: '/about',
      component: AboutPage
    },

    {
      path: '/resources',
      component: ResourcePage
    },

    {
      path: '/eachInterview',
      component: InterviewPage
    }

  ]
};
export default routes;

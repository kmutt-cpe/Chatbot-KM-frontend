/* eslint-disable react/display-name */
import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Loadable from 'react-loadable';
import PrivateRoute from './assets/PrivateRoute';
import { CircularProgress } from '@material-ui/core';
import { AdminAccess, ModeratorAccess } from '../common/role';

const Home = Loadable({
  loader: () => import('../view/home/Home'),
  loading: () => <CircularProgress />,
});
const SignIn = Loadable({
  loader: () => import('../view/signIn/SignIn'),
  loading: () => <CircularProgress />,
});
const PageNotFound = Loadable({
  loader: () => import('../view/pageNotFound/PageNotFound'),
  loading: () => <CircularProgress />,
});

const QuestionManagement = Loadable({
  loader: () => import('../view/questionManagement/QuestionManagement'),
  loading: () => <CircularProgress />,
});
const QuestionList = Loadable({
  loader: () => import('../view/questionList/QuestionList'),
  loading: () => <CircularProgress />,
});
const EditQuestion = Loadable({
  loader: () => import('../view/questionForm/EditQuestion'),
  loading: () => <CircularProgress />,
});
const CreateQuestion = Loadable({
  loader: () => import('../view/questionForm/CreateQuestion'),
  loading: () => <CircularProgress />,
});
const QuestionView = Loadable({
  loader: () => import('../view/questionView/QuestionView'),
  loading: () => <CircularProgress />,
});

const CategoryManagement = Loadable({
  loader: () => import('../view/categoryManagement/CategoryManagement'),
  loading: () => <CircularProgress />,
});
const SubcategoryManagement = Loadable({
  loader: () => import('../view/subcategoryManagement/SubcategoryManagement'),
  loading: () => <CircularProgress />,
});

const UserManagement = Loadable({
  loader: () => import('../view/userManagement/UserManagement'),
  loading: () => <CircularProgress />,
});
const CreateUser = Loadable({
  loader: () => import('../view/userForm/CreateUserForm'),
  loading: () => <CircularProgress />,
});
const EditUser = Loadable({
  loader: () => import('../view/userForm/EditUserForm'),
  loading: () => <CircularProgress />,
});
const UserView = Loadable({
  loader: () => import('../view/userView/UserView'),
  loading: () => <CircularProgress />,
});
const EditProfile = Loadable({
  loader: () => import('../view/userForm/EditProfileForm'),
  loading: () => <CircularProgress />,
});
const Contact = Loadable({
  loader: () => import('../view/contact/Contact'),
  loading: () => <CircularProgress />,
});
const Logout = Loadable({
  loader: () => import('../view/logout/Logout'),
  loading: () => <CircularProgress />,
});

export const RouteApp: React.FC = (): React.ReactElement => {
  const history = createBrowserHistory();
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/contact/" component={Contact} />
        <PrivateRoute exact path="/question-management" component={QuestionManagement} />
        <PrivateRoute exact path="/question-list/:categoryId" component={QuestionList} />
        <PrivateRoute exact path="/question-view/:faqId" component={QuestionView} />
        <PrivateRoute
          exact
          path="/edit-question/:faqId"
          accessedRoles={ModeratorAccess}
          component={EditQuestion}
        />
        <PrivateRoute
          exact
          path="/create-question"
          accessedRoles={ModeratorAccess}
          component={CreateQuestion}
        />
        <PrivateRoute exact path="/category-management" component={CategoryManagement} />
        <PrivateRoute
          exact
          path="/subcategory-management/:categoryId"
          component={SubcategoryManagement}
        />
        <PrivateRoute exact path="/user-management" component={UserManagement} />
        <PrivateRoute
          exact
          path="/create-user"
          accessedRoles={ModeratorAccess}
          component={CreateUser}
        />
        <PrivateRoute
          exact
          path="/edit-user/:userId"
          accessedRoles={AdminAccess}
          component={EditUser}
        />
        <PrivateRoute
          exact
          path="/user-view/:userId"
          accessedRoles={AdminAccess}
          component={UserView}
        />
        <PrivateRoute exact path="/edit-profile" component={EditProfile} />
        <PrivateRoute exact path="/logout" component={Logout}></PrivateRoute>
        <Route path="/page-not-found" component={PageNotFound} />
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
};

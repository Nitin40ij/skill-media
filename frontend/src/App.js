import LandingPage from './Components/LandingPage/LandingPage';
import { Route, Switch } from 'react-router-dom';
import VerifyEmail from './Components/LandingPage/SignUp/VerifyEmail';
import SignUpForm from './Components/LandingPage/SignUp/SignUpForm';
import SelectSkills from './Components/SelectSkills/SelectSkills';
import Header from "./Components/Header/Header";
import Store from './store';
import { PersistGate } from 'redux-persist/integration/react'
import { useSelector } from "react-redux";
import Feed from "./Components/Feed/Feed"
import { Provider } from "react-redux"
import PrivateRoutes from './private/PrivateRoutes';
import RouteLinks from './private/RouteLinks';
import Loading from './Components/Loading/Loading';
import UploadBlog from './Components/uploads/UploadBlog';
import BlogPosts from './Components/Feed/BlogPosts';
import VideoPost from './Components/Feed/VideoPost';
import PhotoPosts from './Components/Feed/PhotoPosts';
import Home from "./Components/Home/Home";
import EditImage from './Components/Edit/EditImage';
import LoginRouteLink from './private/LoginRouteLink';
import ProfileDetails from './Components/ProfileDetails/ProfileDetails';
import Edit from './Components/Edit/Edit';
import EditSkills from './Components/SelectSkills/EditSkills';
import Profile from './pages/profile/Profile'
import SkillPost from './Components/SkillPost/SkillPost';
import ProfessionalSkills from './Components/SelectSkills/ProfessionalSkills';
import { useState } from 'react';
import EditUSkills from './Components/SelectSkills/EditUSkills';
import SetSkillRoute from './private/SetSkillRoute';
import HomePage from './pages/HomePage/HomePage';
import PostComment from './Components/Comments/PostComment';
import ReportPage from './Components/ReportPage/ReportPage';
import ForgotPassword from './Components/Forgot/ForgotPassword';
import VerifyOtp from './Components/Forgot/VerifyOtp';
import NewPassword from './Components/Forgot/NewPassword';
import SpecificUser from './Components/specificUser/SpecificUser.js';
import EditVideo from './Components/Edit/EditVideo';
function App() {
    const [unprofessionalSkill, setUnprofessionalSkill] = useState([]);
    return (
        // Wrapping up our complete App with the global state using Provider Tag and passing Store Variable to it From store folder
        <>
            {/* Adding Header to ever Page */}
            <Header />
            <Switch>
                <LoginRouteLink path="/" exact component={LandingPage} />
                <LoginRouteLink path="/forgotPassword" exact component={ForgotPassword} />
                <RouteLinks exact path="/verifyEmail" component={VerifyEmail} />
                <RouteLinks exact path="/verifyOtp" component={VerifyOtp} />
                <RouteLinks exact path="/changePassword" component={NewPassword} />
                <RouteLinks exact path="/signup" component={SignUpForm} />
                <SetSkillRoute exact path="/skills" component={SelectSkills} />
                <SetSkillRoute exact path="/professionalSkills" component={ProfessionalSkills} />
                <PrivateRoutes exact path="/feed" component={Feed} />
                <PrivateRoutes exact path="/homeearly" component={Home} />
                <PrivateRoutes exact path="/uploadBlog" component={UploadBlog} />
                <PrivateRoutes exact path="/uploadBlog" component={UploadBlog} />
                <PrivateRoutes exact path="/videoPosts" component={VideoPost} />
                <PrivateRoutes exact path="/blogPosts" component={BlogPosts} />
                <PrivateRoutes exact path="/imagePosts" component={PhotoPosts} />
                <PrivateRoutes exact path="/profile" component={Profile} />
                <PrivateRoutes exact path="/editPost/:id" component={Edit} />
                <PrivateRoutes exact path="/editImage/:id" component={EditImage} />
                <PrivateRoutes exact path="/editVidoePost/:id" component={EditVideo} />
                <PrivateRoutes exact path="/editPSkills" component={EditSkills} />
                <PrivateRoutes exact path="/editUSkills" component={EditUSkills} />
                <PrivateRoutes exact path="/skillPost/:skill" component={SkillPost} />
                <PrivateRoutes exact path="/home" component={HomePage} />
                <PrivateRoutes exact path="/postComments" component={PostComment} />
                <PrivateRoutes exact path="/reportPost" component={ReportPage} />
                <PrivateRoutes exact path="/specificUser" component={SpecificUser} />
                <Route exact path="/loading" component={Loading} />

            </Switch>
        </>
    );
}

export default App;
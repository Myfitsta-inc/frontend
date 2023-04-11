import "App.css";
import "style/style.css";
import "style/landing.css";
import React, { useEffect } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import LoadConnection from "page/loadConnection";
import Checkout from "page/checkout";
import Register from "page/register";
import Landing from "page/landingPage";
import ShopingItem from "page/shopingItem";
import Notification from "page/notification";
import Setup from "page/setup";
import Terms from "landing/terms";
import Termss from "landing/termss";
import Policy from "landing/policy";
import LoadProfile from "page/loadProfile";
import axios from "axios";
import LoadlookProgram from "page/loaddLookprogram";
import Recorver from "page/recover";
import Home from "page/home";
import Cookies from "landing/coki";
import Loading from "components/loading";
import Login from "page/login";
import Discover from "page/discover";
import Group from "messaging/group";
import Upload from "page/upload";
import PostCollection from "page/collection";
import NoFound from "page/nofound";
import LoadDiscover from "page/loaddiscover";
import Comment from "page/comment";
import Myfitstapro from "page/myfitstapro";
import Conversation from "page/conversation";
import Profile from "page/profile";
import Message from "page/message";
import Lookprogram from "page/lookprogram";
import SeeCollection from "page/seeCollection";
import Myprogram from "page/myprogram";
import Setting from "page/setting";
import Visitpage from "page/visitepage";
import Loadprogram from "page/loadprogram";
import Edit from "page/edit";
import Routine from "page/routine";
import EditContent from "page/editcontent";
import Lookformyfitstapro from "page/lookformyfitstapro";
import useMyfitstaPro from "hooks/useMyfitstaPro";
import useUser from "hooks/useUser";
import { useSelector, useDispatch } from "react-redux";
import DeletePost from "modals/DeletePost";
import socket from "socketConfig";

function App() {
  const { user, myfitstapro } = useUser();
  const dispatch = useDispatch();
  const handerlogin = (data) => {
    window.location.reload();
  };
  const loadTheme = (theme) => {
    const root = document.querySelector("#root");
    root.setAttribute("color-scheme", `${theme}`);
    localStorage.setItem("mode", theme);
  };
  const checkLike = (e) => {
    axios.get("/api/likeonpost", { withCredentials: true }).then((res) => {
      if (res.data.length > 0) {
        dispatch({ type: "ADD_LIKES", value: res.data });
      }
    });
  };
  useEffect(() => {
    const mode = localStorage.getItem("mode");
    if (mode === null) {
      loadTheme("light");
    } else {
      loadTheme(mode);
    }
  }, []);

  const getfitstapro = (e) => {
    axios
      .get("/api/check-myfitstapro", { withCredentials: true })
      .then((res) => {
        dispatch({ type: "UPDATE_PRO", value: res.data });
      });
  };
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (!user) {
      const checkLogin = async () => {
        const { data } = await axios.get("/api/check-login", {
          withCredentials: true,
          signal,
        });
        const { isLogIn, user } = data;
        if (isLogIn) {
          socket.auth = { userId: user.userId };
          socket.connect();
          checkLike();
          if (user.myfitstapro) {
            getfitstapro();
          }
          dispatch({ type: "UPDATE_USER", value: user });
        } else {
          dispatch({ type: "UPDATE_USER", value: { email: "" } });
        }
        return () => controller.abort();
      };
      checkLogin();
    }
  }, [user]);

  return (
    <div className="appppp">
      <BrowserRouter>
        <AnimatePresence>
          <Switch>
            <Route exact path="/">
              {user ? (
                user.email.length > 0 ? (
                  <Redirect to="/home" />
                ) : (
                  <Landing />
                )
              ) : (
                <Loading />
              )}
            </Route>
            <Route exact path="/home">
              {user ? (
                user.email.length > 0 ? (
                  <Home />
                ) : (
                  <Redirect to="/login" />
                )
              ) : (
                <Loading />
              )}
            </Route>

            <Route path="/login">
              {user ? (
                user.email.length > 0 ? (
                  <Redirect to="/home" />
                ) : (
                  <Login login={handerlogin} />
                )
              ) : (
                <Loading />
              )}
            </Route>

            <Route path="/register">
              {user ? (
                user.email.length > 0 ? (
                  <Redirect to="/home" />
                ) : (
                  <Register login={handerlogin} />
                )
              ) : (
                <Loading />
              )}
            </Route>
            <Route exact path="/discover">
              {user !== null ? (
                user.email.length > 0 ? (
                  <Discover user={user} />
                ) : (
                  <Redirect to="/login" />
                )
              ) : (
                <Loading />
              )}
            </Route>
            <Route path="/discover/:id">
              {user !== null ? (
                user.email.length > 0 ? (
                  <Discover user={user} />
                ) : (
                  <Redirect to="/login" />
                )
              ) : (
                <Loading />
              )}
            </Route>
            <Route path="/notifications">
              {user !== null ? (
                user.email.length > 0 ? (
                  <Notification user={user} />
                ) : (
                  <Redirect to="/login" />
                )
              ) : (
                <Loading />
              )}
            </Route>
            <Route exact path="/profile">
              {user !== null ? (
                user.email.length > 0 ? (
                  <Profile user={user} />
                ) : (
                  <Redirect to="/login" />
                )
              ) : (
                <Loading />
              )}
            </Route>

            <Route path="/profile/:id/:data">
              {user !== null ? (
                user.email.length > 0 ? (
                  <LoadProfile user={user} />
                ) : (
                  <Redirect to="/login" />
                )
              ) : (
                <Loading />
              )}
            </Route>

            <Route path="/post">
              {user !== null ? (
                user.email.length > 0 ? (
                  <Upload user={user} />
                ) : (
                  <Redirect to="/login" />
                )
              ) : (
                <Loading />
              )}
            </Route>

            <Route exact path="/collection/program">
              {user !== null ? (
                user.email.length > 0 ? (
                  <PostCollection user={user} />
                ) : (
                  <Redirect to="/login" />
                )
              ) : (
                <Loading />
              )}
            </Route>
            <Route exact path="/collection">
              {user !== null ? (
                user.email.length > 0 ? (
                  <PostCollection user={user} />
                ) : (
                  <Redirect to="/login" />
                )
              ) : (
                <Loading />
              )}
            </Route>

            <Route exact path="/message">
              {user !== null ? (
                user.email.length > 0 ? (
                  <Message user={user} />
                ) : (
                  <Redirect to="/login" />
                )
              ) : (
                <Loading />
              )}
            </Route>

            <Route exact path="/account/:id">
              {user !== null ? (
                user.email.length > 0 ? (
                  <Visitpage user={user} />
                ) : (
                  <Redirect to="/login" />
                )
              ) : (
                <Loading />
              )}
            </Route>
            <Route exact path="/message/:id">
              {user !== null ? (
                user.email.length > 0 ? (
                  <Conversation user={user} />
                ) : (
                  <Redirect to="/login" />
                )
              ) : (
                <Loading />
              )}
            </Route>
            <Route exact path="/message/room/:id">
              {user !== null ? (
                user.email.length > 0 ? (
                  <Group user={user} />
                ) : (
                  <Redirect to="/login" />
                )
              ) : (
                <Loading />
              )}
            </Route>

            <Route exact path="/myfitstapro">
              {user ? (
                user.email.length > 0 ? (
                  <Myfitstapro user={user} />
                ) : (
                  <Redirect to="/login" />
                )
              ) : (
                <Loading />
              )}
            </Route>

            <Route exact path="/program/myfitsta/:id">
              {user !== null ? (
                user.email.length > 0 ? (
                  user.myfitstapro ? (
                    <Myprogram user={user} />
                  ) : (
                    <Redirect to="/home" />
                  )
                ) : (
                  <Redirect to="/login" />
                )
              ) : (
                <Loading />
              )}
            </Route>

            <Route exact path="/program/myfitsta/course/:id">
              {user !== null ? (
                user.email.length > 0 ? (
                  user.myfitstapro ? (
                    <Loadprogram user={user} />
                  ) : (
                    <Redirect to="/home" />
                  )
                ) : (
                  <Redirect to="/login" />
                )
              ) : (
                <Loading />
              )}
            </Route>

            <Route path="/program/unlock/:id">
              {user !== null ? (
                user.email.length > 0 ? (
                  <Lookprogram user={user} />
                ) : (
                  <Redirect to="/login" />
                )
              ) : (
                <Loading />
              )}
            </Route>

            <Route path="/edit">
              {user !== null ? (
                user.email.length > 0 ? (
                  <Edit user={user} />
                ) : (
                  <Redirect to="/login" />
                )
              ) : (
                <Loading />
              )}
            </Route>

            <Route path="/collection/:id">
              {user !== null ? (
                user.email.length > 0 ? (
                  <SeeCollection user={user} />
                ) : (
                  <Redirect to="/login" />
                )
              ) : (
                <Loading />
              )}
            </Route>
            <Route exact path="/myfitstapro/:id">
              {user !== null ? (
                user.email.length > 0 ? (
                  <Lookformyfitstapro user={user} />
                ) : (
                  <Redirect to="/login" />
                )
              ) : (
                <Loading />
              )}
            </Route>
            <Route exact path="/recover">
              <Recorver />
            </Route>

            <Route exact path="/account/program/myfitsta/:id">
              {user !== null ? (
                user.email.length > 0 ? (
                  <ShopingItem user={user} />
                ) : (
                  <Redirect to="/login" />
                )
              ) : (
                <Loading />
              )}
            </Route>

            <Route exact path="/account/program/checkout/:id">
              {user !== null ? (
                user.email.length > 0 ? (
                  <Checkout user={user} />
                ) : (
                  <Redirect to="/login" />
                )
              ) : (
                <Loading />
              )}
            </Route>
            <Route exact path="/account/program/myfitsta/course/:id">
              {user !== null ? (
                user.email.length > 0 ? (
                  <LoadlookProgram user={user} />
                ) : (
                  <Redirect to="/login" />
                )
              ) : (
                <Loading />
              )}
            </Route>
            <Route exact path="/comment/:id">
              {user !== null ? (
                user.email.length > 0 ? (
                  <Comment user={user} />
                ) : (
                  <Redirect to="/login" />
                )
              ) : (
                <Loading />
              )}
            </Route>
            <Route exact path="/routine">
              {user !== null ? (
                user.email.length > 0 ? (
                  <Routine />
                ) : (
                  <Redirect to="/login" />
                )
              ) : (
                <Loading />
              )}
            </Route>
            <Route exact path="/setup">
              {user !== null ? (
                user.email.length > 0 ? (
                  user.canActivate === false ? (
                    myfitstapro.username ? (
                      <Redirect to="/myfitstapro" />
                    ) : (
                      <Setup user={user} />
                    )
                  ) : (
                    <Setup user={user} />
                  )
                ) : (
                  <Redirect to="/login" />
                )
              ) : (
                <Loading />
              )}
            </Route>
            {/* <Route exact path="/card">
            {user !== null ? (
              user.email.length > 0 ? (
                <Card  />
              ) : (
                <Redirect to="/login" />
              )
            ) : (
              <Loading />
            )}
          </Route> */}
            <Route exact path="/setting">
              {user !== null ? (
                user.email.length > 0 ? (
                  <Setting user={user} />
                ) : (
                  <Redirect to="/login" />
                )
              ) : (
                <Loading />
              )}
            </Route>
            <Route exact path="/setting/:id">
              {user !== null ? (
                user.email.length > 0 ? (
                  <Setting user={user} />
                ) : (
                  <Redirect to="/login" />
                )
              ) : (
                <Loading />
              )}
            </Route>
            <Route exact path="/setting/:id/:data">
              {user !== null ? (
                user.email.length > 0 ? (
                  <Setting />
                ) : (
                  <Redirect to="/login" />
                )
              ) : (
                <Loading />
              )}
            </Route>

            <Route exact path="/program/myfitsta/course/edit/:id">
              {user !== null ? (
                user.email.length > 0 ? (
                  <EditContent user={user} />
                ) : (
                  <Redirect to="/login" />
                )
              ) : (
                <Loading />
              )}
            </Route>
            <Route exact path="/dis/:id">
              {user !== null ? (
                user.email.length > 0 ? (
                  <LoadDiscover user={user} />
                ) : (
                  <Redirect to="/login" />
                )
              ) : (
                <Loading />
              )}
            </Route>
            <Route exact path="/user/:id/:data">
              {user !== null ? (
                user.email.length > 0 ? (
                  <LoadConnection user={user} />
                ) : (
                  <Redirect to="/login" />
                )
              ) : (
                <Loading />
              )}
            </Route>
            <Route exact path="/termsconditon">
              <Terms />
            </Route>
            <Route exact path="/terms">
              <Termss />
            </Route>
            <Route exact path="/cookies">
              <Cookies />
            </Route>
            <Route exact path="/privacy">
              <Policy />
            </Route>
            <Route path="*">
              <NoFound />
            </Route>
          </Switch>
        </AnimatePresence>
      </BrowserRouter>
      <DeletePost />
    </div>
  );
}

export default App;

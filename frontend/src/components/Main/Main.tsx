import { useState, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import { beanListState } from "store/atom";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Sidebar from "components/Sidebar/Sidebar";
import CreateBean from "components/CreateBean/CreateBean";
import FeedbackButton from "components/FeedbackButton/FeedbackButton";
import "./Main.scss";

function Main() {
  const navigate = useNavigate();
  const location = useLocation();
  const [beanList, setBeanList] = useRecoilState(beanListState);
  // const [isFirst, setisFirst] = useState(true);
  const socketurl = process.env.REACT_APP_SOCKET_URL
    ? process.env.REACT_APP_SOCKET_URL
    : "";
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketurl, {
    shouldReconnect: (closeEvent) => {
      return true;
    },
    reconnectAttempts: 10,
    reconnectInterval: 3000,
  });
  useEffect(() => {
    if (lastMessage !== null) {
      if (lastMessage.data[0] == "{") {
        console.log(JSON.parse(lastMessage.data));
        setBeanList([...beanList, JSON.parse(lastMessage.data)]);
      }
    }
  }, [lastMessage]);

  return (
    <>
      <TransitionGroup component={null}>
        <CSSTransition classNames="transition" timeout={500} key={location.key}>
          <Routes location={location}>
            <Route path="sidebar" element={<Sidebar />} />
            <Route
              path="create"
              element={<CreateBean sendMessage={sendMessage} />}
            />
            <Route path="feedback" element={<FeedbackButton />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </>
  );
}

export default Main;

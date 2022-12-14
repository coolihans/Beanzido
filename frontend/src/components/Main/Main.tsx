import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import { beanListState } from "store/atom";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import KakaoMap from "components/KakaoMap";
import Sidebar from "components/Sidebar/Sidebar";
import CreateBean from "components/CreateBean/CreateBean";
import FeedbackButton from "components/FeedbackButton/FeedbackButton";
import "./Main.scss";

function Main() {
  const navigate = useNavigate();
  const location = useLocation();
  const [beanList, setBeanList] = useRecoilState(beanListState);
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
        setBeanList([...beanList, JSON.parse(lastMessage.data)]);
      }
    }
  }, [lastMessage]);

  return (
    <>
      <KakaoMap />
      <TransitionGroup component={null}>
        {location.pathname === "/keyword" ? (
          <div className="keyword-info">
            ※ 키워드는 5분 단위로 업데이트 됩니다.
          </div>
        ) : (
          <div></div>
        )}
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

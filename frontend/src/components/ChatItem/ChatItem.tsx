import { useEffect, useRef, memo } from "react";
import useColor from "components/hooks/useColor";
import "./ChatItem.scss";
import useTime from "components/hooks/useTime";

type ChatProps = {
  Chatinfo: {
    nickname: string;
    content: string;
    color: number;
    img?: string;
    createdAt: string;
  };
};

function ChatItem({ Chatinfo }: ChatProps) {
  const colorRef = useRef<HTMLDivElement>(null);
  const [elapsedText] = useTime(Chatinfo.createdAt);
  const [indexToColor] = useColor();
  useEffect(() => {
    const { current } = colorRef;
    if (current !== null) {
      current.style.color = indexToColor(Chatinfo.color).color;
      current.style.backgroundColor = indexToColor(
        Chatinfo.color
      ).backgroundColor;
    }
  }, []);

  return (
    <div className="chat-item">
      <div className="nickname-container" ref={colorRef}>
        {Chatinfo.nickname[0]}
      </div>
      <div className="contents-container">
        <div className="up">
          <div>{Chatinfo.nickname}</div>
          <div className="time">{elapsedText}</div>
        </div>
        {Chatinfo.content == "내용이 없습니다." ? (
          <div></div>
        ) : (
          <div className="down">{Chatinfo.content}</div>
        )}
        <div className="chat-item-img">
          <img src={Chatinfo.img} alt="" />
        </div>
      </div>
    </div>
  );
}

export default memo(ChatItem);
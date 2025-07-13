import axios from "axios";
//@ts-ignore
import Chat from "chatui";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getMsgType } from "../../utils/getMsgType";
import toast from "react-hot-toast";
import { useChatContext } from "../../context/ChatContext";
import ChatMessageItem from "../chat-message-item";
import { useLocalization } from "../../hooks/useLocatization";
import openai from "openai";
import sidebarleft from '../../assets/svg/sidebarleft.svg';
import conversationOpenIcon from '../../assets/svg/conversationOpenIcon.svg';
import { Box } from "@chakra-ui/react";
import ForAnyHelp from "../interview/ForAnyHelp";
import GetHelp from "../applicationForm/GetHelp";

const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
// @ts-ignore
openai.apiKey = OPENAI_API_KEY;

const ChatUiWindow: React.FC = () => {
  const { messages, sendMessage, isMsgReceiving, setMessages, setLocale,
    loading, isChatVisible, setIsChatVisible } = useChatContext()
  const [showRecording, setShowRecording] = useState(false)
  const t = useLocalization();

  const options = messages[messages.length - 1]?.options ? messages[messages.length - 1]?.options : null
  const information = messages[messages.length - 1]?.information && messages[messages.length - 1]?.information?.length > 0 ? messages[messages.length - 1]?.information : null
  const optionType = messages[messages.length - 1]?.prompt ?? ''
  const isChatEnd = messages[messages.length - 1]?.status === 'Success' && messages[messages.length - 1]?.end_connection ? true : false

  const [divHeight, setDivHeight] = useState<any>("100%");

  const updateDivHeight = () => {
    const newHeight =
      window.innerHeight - 13;
    setDivHeight(newHeight);
  };

  useEffect(() => {
    updateDivHeight();
    window.addEventListener("resize", updateDivHeight);
    return () => {
      window.removeEventListener("resize", updateDivHeight);
    };
  }, []);

  const handleSend = useCallback(
    async (type: string, msg: any) => {
      if (msg.length === 0) {
        toast.error('please enter text');
        return;
      }

      if (type === "text" && msg.trim()) {
        console.log('first', msg)
        sendMessage(msg.trim())
      }
    },
    [sendMessage]
  );

  const normalizeMsgs = useMemo(() =>
    messages?.map((msg: any) => ({
      type: getMsgType(msg),
      content: { text: msg?.text, data: { ...msg } },
      position: msg?.position ?? "right",
    })),
    [messages]
  );

  const msgToRender = useMemo(() => {
    console.log('norma===============', normalizeMsgs)
    return isMsgReceiving
      ? [
        ...normalizeMsgs,
        {
          type: "loader",
          position: "left",
          botUuid: "1",
        },
      ]
      : normalizeMsgs;
  }, [isMsgReceiving, normalizeMsgs]);

  const toggleChatVisibility = () => {
    setIsChatVisible(!isChatVisible); // Toggle chat visibility
  };

  const [isHovering, setIsHovering] = useState(false);
  const handleMouseEnter = () => {
    if (!isChatVisible) {
      setIsHovering(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <Box sx={{ position: "relative", width: "100%", height: "90vh", bgColor: '#192890', overflow: "auto" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 10,
          padding: "12px 20px",
          backgroundColor: "#192890",
          borderBottom: "1px solid #F4F4F44D",
          width: "100%"
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <img
              src={isChatVisible ? sidebarleft.src : conversationOpenIcon.src}
              alt='Open Conversation History'
              style={{
                cursor: 'pointer'
              }}
              onClick={toggleChatVisibility}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
            {isHovering && !isChatVisible && (
              <span style={{
                fontSize: '16px',
                fontWeight: 600,
                color: "#F3F3F3",
                backgroundColor: 'black',
                padding: '9px',
                borderRadius: '7px',
                marginLeft: '10px',
                whiteSpace: 'nowrap',
                position: "absolute",
                left: "40px"
              }}>
                Open Conversation History
              </span>
            )}
          </Box>
          {isChatVisible && (
            <span style={{
              fontSize: '16px',
              fontWeight: 700,
              color: "#F3F3F3",
              borderRadius: '7px',
              marginLeft: '10px',

            }}>
              Conversation history
            </span>
          )}
        </Box>
      </Box>

      {isChatVisible && (
        <div
          style={{
            height: 'auto',
            width: "100%",
            backgroundColor: "#19289",
            overflowY: 'auto',
            // marginBottom: '100px',
            // maxHeight: '63vh',
          }}
        >
          <Chat
            btnColor="green"
            background="white"
            messages={msgToRender}
            recordingContent={null}
            recordingProps={{ sendMessage: () => { }, setShowRecording: () => { }, showRecording }}
            isChatEnd={isChatEnd}
            disableSend={loading}
            renderMessageContent={(props) => (
              <ChatMessageItem
                key={props.id}
                message={props}
                onSend={handleSend}
              />
            )}
            onSend={handleSend}
            locale="en-US"
            skipButtonProps={{ sendMessage: () => { }, messages: [] }}
            placeholder={'Speak using microphone button, or type your answer here...'}
            optionType={optionType === 'text_message' || optionType === 'link' || !optionType}
            isShowRecording={showRecording}
            chatBg={'#192890'}
          />

        </div>
      )}
    </Box>
  );
};



export default ChatUiWindow;

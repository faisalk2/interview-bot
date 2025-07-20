import React, { ReactElement, useCallback, useContext, useState, createContext, useEffect, FC } from 'react'
import ProfileImage from '../assets/images/profileAI.png'
import { IntlProvider } from "react-intl";
import axios from 'axios';
import { useRouter } from "next/router";



type ContextType = {
  messages: any[],
  setMessages: React.Dispatch<React.SetStateAction<string[]>>,
  loading: boolean,
  setLoading: (arg: boolean) => void,
  isMsgReceiving: boolean,
  setIsMsgReceiving: (arg: boolean) => void,
  sendMessage: (text: string, media?: any) => void,
  locale: any,
  setLocale: any,
  localeMsgs: any,
  userId: string,
  userName: string,
  interviewPercentage: number,
  isChatVisible: boolean,
  setIsChatVisible: (arg: boolean) => void,
  setInterviewPercentage: (arg: number) => void,
  startTyping: boolean,
  setStartTyping: (arg: boolean) => void,
  remainingQuestions: any,
  setRemainingQuestion: (arg: any) => void
}

// Define your initial context value
const initialContextValue: ContextType = {
  messages: [],
  setMessages: () => { },
  loading: false,
  setLoading: () => { },
  isMsgReceiving: false,
  setIsMsgReceiving: () => { },
  sendMessage: () => { },
  locale: '',
  setLocale: () => { },
  localeMsgs: '',
  userId: '',
  userName: '',
  interviewPercentage: 0,
  isChatVisible: true,
  setIsChatVisible: () => { },
  setInterviewPercentage: () => { },
  startTyping: false,
  setStartTyping: () => { },
  remainingQuestions: {
    remaining: 0,
    attempted: 0
  },
  setRemainingQuestion: () => { }
}


function loadMessages(locale: string) {
  switch (locale) {
    case "en":
      return import("../../lang/en.json");
    case "hi":
      return import("../../lang/hi.json");
    case "od":
      return import("../../lang/od.json");
    default:
      return import("../../lang/en.json");
  }
}

const ChatProvider = createContext<ContextType>(initialContextValue)

interface PromptData {
  prompt: string | null;
  bot: any;
}

const ChatContext: FC<{
  locale: any;
  localeMsgs: any;
  setLocale: any;
  userObjId: any;
  children: ReactElement;
}> = ({ locale, children, userObjId, localeMsgs, setLocale }) => {
  const [list, setList] = useState<PromptData[]>([])
  const [messages, setMessages] = useState<Array<any>>([{
    message: `😊 Hello! We'd love to know — which role are you applying for?`, position: "left"
  }]);
  const [startTyping, setStartTyping] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMsgReceiving, setIsMsgReceiving] = useState(false);
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState("");
  const [interviewPercentage, setInterviewPercentage] = useState(0)
  const [inititalDataLoaded, setInitialDataLoaded] = useState(false)
  const [isChatVisible, setIsChatVisible] = useState(true)
  const [remainingQuestions, setRemainingQuestion] = useState({
    remaining: 0,
    attempted: 0
  });
  const router = useRouter();
  const { userId: paramsUserId } = router.query;

  const fetchUserId = async () => {
    // const storedUserId = await localStorage.getItem("userId") || "";
    console.log('paramsUserId', paramsUserId)
    if (paramsUserId && typeof paramsUserId === 'string') {
      await setUserId(paramsUserId);
    }
    const storedUserName = await localStorage.getItem("name") || "";
    await setUserName(storedUserName);
    if (messages.length === 0 && localStorage.getItem("conversation")) {
      const conversation = localStorage.getItem("conversation") || "";
      await setMessages(JSON.parse(conversation));
    }
    setInitialDataLoaded((pre) => !pre);
  };
  useEffect(() => {
    fetchUserId();
  }, [messages.length, paramsUserId]);


  //@ts-ignore
  const sendMessage = useCallback(
    async (text: string, media: any) => {
      setIsMsgReceiving(true);
      setLoading(true);
      setStartTyping(false)
      //@ts-ignore
      setMessages((prev: any) => [
        ...prev.map((prevMsg: any) => ({ ...prevMsg })),
        {
          message: text,
          position: "right",
        },
      ]);

      try {
        const response = await fetch('/api/followup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: [...messages, {
              message: text,
              position: "right",
            },]
          }),
        });

        const data = await response.json();
        console.log("Bot reply:", data);
        // Handle response here

        setMessages((prev: any) => [
          ...prev.map((prevMsg: any) => ({ ...prevMsg })),
          {
            message: data?.reply,
            position: "left",
            user: { avatar: ProfileImage?.src },
          },
        ]);
        console.log(messages)
        localStorage.setItem("conversation", JSON.stringify(
          [
            ...messages,
            { message: text, position: 'right' },
            { message: data?.reply, position: 'left', user: { avatar: ProfileImage?.src }, },
          ]
        ))
        setIsMsgReceiving(false);
        setLoading(false)
      } catch (error) {
        // Handle error here
        setMessages((prev: any) => [
          ...prev.map((prevMsg: any) => ({ ...prevMsg })),
          {
            message: ['Something went wrong, please paste the previous message and try again.'],
            position: "left",
            user: { avatar: ProfileImage?.src }
          },
        ]);
        setIsMsgReceiving(false);
        setLoading(false);
        console.log(error);
      }
    }
  );

  return (

    <ChatProvider.Provider
      value={{
        messages,
        setMessages,
        loading,
        setLoading,
        isMsgReceiving,
        setIsMsgReceiving,
        sendMessage,
        locale,
        setLocale,
        localeMsgs,
        userId,
        userName,
        interviewPercentage,
        setInterviewPercentage,
        isChatVisible,
        setIsChatVisible,
        startTyping,
        setStartTyping,
        remainingQuestions,
        setRemainingQuestion
      }}>
      <IntlProvider
        locale={locale ?? 'en'}
        //@ts-ignore
        messages={localeMsgs}>
        {children}
      </IntlProvider>
    </ChatProvider.Provider>
  )
}


// export default ChatContext

const SSR: FC<{ children: ReactElement }> = ({ children }) => {
  const [locale, setLocale] = useState("");
  const [userId, setUserId] = useState("");
  const [localeMsgs, setLocaleMsgs] = useState<Record<string, string> | null>(
    null
  );

  const fetchUserId = async () => {
    const userId = await localStorage.getItem('userId') || ""
    await setUserId(userId);
  }



  useEffect(() => {
    loadMessages(locale).then((res) => {
      //@ts-ignore
      setLocaleMsgs(res);
    });
    fetchUserId()
  }, [locale]);

  if (typeof window === "undefined") return null;
  return (
    //@ts-ignore
    <IntlProvider locale={locale} messages={localeMsgs}>
      <ChatContext
        locale={locale ?? 'en'}
        setLocale={setLocale}
        localeMsgs={localeMsgs}
        userObjId={userId}
      >
        {children}
      </ChatContext>
    </IntlProvider>
  );
};
export default SSR;

export const useChatContext = () => useContext(ChatProvider);

import React, { useEffect, useRef, useState } from "react";
import { IoClose, IoSendOutline } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { CHAT_INITIAL_VALUES } from "../constants";
import { closeChat, sendMessage } from "../features/chat/chatSlice";

const MessageList = React.memo(() => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { activeChatUser, messages } = useAppSelector((state) => state.chat);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRefMob = useRef<HTMLDivElement | null>(null);

  const formatMessageDate = (dateIso: string): string => {
    const messageDate = new Date(dateIso);
    const now = new Date();

    const isToday =
      messageDate.getDate() === now.getDate() &&
      messageDate.getMonth() === now.getMonth() &&
      messageDate.getFullYear() === now.getFullYear();

    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };

    if (isToday) {
      return messageDate.toLocaleTimeString("es-AR", timeOptions);
    } else {
      const dateOptions: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "2-digit",
        ...timeOptions,
      };
      return messageDate.toLocaleString("es-AR", dateOptions).replace(",", "");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }
    }, 10);

    return () => clearTimeout(timer);
  }, [messages]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (messagesEndRefMob.current) {
        messagesEndRefMob.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }
    }, 10);

    return () => clearTimeout(timer);
  }, [messages]);

  if (!activeChatUser) return null;

  return (
    <>
      <div className="md:hidden fixed flex bottom-[120px] w-[calc(100%-20px)] left-1/2 -translate-x-1/2 h-[400px] max-h-[60dvh] bg-white rounded-t-[20px] flex-col pb-4! shadow-[0px_0px_0px_0px_#0013331A,0px_2px_5px_0px_#0013331A,0px_9px_9px_0px_#00133317,0px_21px_13px_0px_#0013330D,0px_38px_15px_0px_#00133303,0px_59px_17px_0px_#00133300] z-40">
        <div className="bg-[#444444] p-3! text-[#BFD732] flex justify-between rounded-t-[20px]">
          <span>{activeChatUser.fullname}</span>
          <button onClick={() => dispatch(closeChat())}>
            <IoClose size={25} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2! flex flex-col">
          {messages.map((m: any, i: number) => {
            const nextMessage = messages[i + 1];

            const currentTime = formatMessageDate(m.createdAt);
            const nextTime = nextMessage
              ? formatMessageDate(nextMessage.createdAt)
              : null;

            const showTime =
              !nextMessage ||
              nextMessage.senderId !== m.senderId ||
              currentTime !== nextTime;

            return (
              <div key={i} className="flex flex-col">
                <span
                  className={`p-2! my-1! rounded-lg text-[14px] text-[#222222] ${
                    m.senderId === user?._id
                      ? "bg-[#39B54A1A] self-end"
                      : "bg-[#F5F6F7] self-start"
                  }`}
                >
                  {m.content}
                </span>
                {showTime && (
                  <span
                    className={`px-2! rounded-lg text-[8px] ${
                      m.senderId === user?._id ? "self-end" : "self-start"
                    }`}
                  >
                    {currentTime}
                  </span>
                )}
              </div>
            );
          })}
          <div ref={messagesEndRefMob} />
        </div>
      </div>

      <div className="hidden md:flex fixed bottom-[20px] right-10 w-80 h-96 bg-white rounded-t-[20px] flex-col pb-[50px]! shadow-[0px_0px_0px_0px_#0013331A,0px_2px_5px_0px_#0013331A,0px_9px_9px_0px_#00133317,0px_21px_13px_0px_#0013330D,0px_38px_15px_0px_#00133303,0px_59px_17px_0px_#00133300] z-40">
        <div className="bg-[#444444] p-3! text-[#BFD732] flex justify-between rounded-t-[20px]">
          <span>{activeChatUser.fullname}</span>
          <button
            onClick={() => dispatch(closeChat())}
            className="cursor-pointer hover:bg-[#BFD73220] rounded-full transition-all"
          >
            <IoClose size={25} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2! flex flex-col">
          {messages.map((m: any, i: number) => {
            const nextMessage = messages[i + 1];

            const currentTime = formatMessageDate(m.createdAt);
            const nextTime = nextMessage
              ? formatMessageDate(nextMessage.createdAt)
              : null;

            const showTime =
              !nextMessage ||
              nextMessage.senderId !== m.senderId ||
              currentTime !== nextTime;

            return (
              <div key={i} className="flex flex-col">
                <span
                  className={`p-2! my-1! rounded-lg text-[14px] text-[#222222] ${
                    m.senderId === user?._id
                      ? "bg-[#39B54A1A] self-end"
                      : "bg-[#F5F6F7] self-start"
                  }`}
                >
                  {m.content}
                </span>
                {showTime && (
                  <span
                    className={`px-2! rounded-lg text-[8px] ${
                      m.senderId === user?._id ? "self-end" : "self-start"
                    }`}
                  >
                    {currentTime}
                  </span>
                )}
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </>
  );
});

const ChatInput = () => {
  const { activeChatUser } = useAppSelector((state) => state.chat);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [values, setValues] = useState(CHAT_INITIAL_VALUES);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      sendMessage({
        senderId: user!._id.toString(),
        receiverId: activeChatUser!._id.toString(),
        content: values.content,
      })
    );
    setValues(CHAT_INITIAL_VALUES);
  };

  if (!activeChatUser) return null;

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="p-2! border-t border-[#444444] md:hidden flex fixed w-[calc(100%-20px)] left-1/2 -translate-x-1/2 h-[50px] bottom-[82px] bg-white z-40"
      >
        <input
          value={values.content}
          onChange={handleChange}
          name="content"
          type="text"
          required
          className="flex-1 px-2! outline-none"
          placeholder="Escribe un mensaje..."
        />
        <button type="submit" className="ml-2!">
          <IoSendOutline color="#444444" size={25} />
        </button>
      </form>
      <form
        onSubmit={handleSubmit}
        className="p-2! border-t border-[#444444] hidden md:flex fixed bottom-0 right-10 w-80 h-[50px] bg-white z-40"
      >
        <input
          value={values.content}
          onChange={handleChange}
          name="content"
          type="text"
          required
          className="flex-1 px-2! outline-none"
          placeholder="Escribe un mensaje..."
        />
        <button
          type="submit"
          className="ml-2! cursor-pointer hover:bg-[#88888820] p-0.5! transition-all"
        >
          <IoSendOutline color="#444444" size={25} />
        </button>
      </form>
    </>
  );
};

const ChatWindow = () => {
  return (
    <>
      <MessageList />
      <ChatInput />
    </>
  );
};

export default ChatWindow;

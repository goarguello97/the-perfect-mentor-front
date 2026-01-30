import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { CiChat1 } from 'react-icons/ci';
import { IoClose } from 'react-icons/io5';
import { BounceLoader } from 'react-spinners';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  getMessages,
  getUserMessages,
  setActiveChat,
} from '../features/chat/chatSlice';

const ChatList = ({ setView, chats, status, user, count }: any) => {
  const dispatch = useAppDispatch();

  const handleOpenChat = (data: { _id: string; fullname: string }) => {
    dispatch(
      getMessages({
        senderId: user!._id,
        receiverId: data._id,
      }),
    );
    dispatch(setActiveChat(data));
    dispatch(getUserMessages({ userId: user!._id }));
    setView(false);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
        className="md:hidden fixed z-40 bottom-[70px] w-[calc(100%-20px)] left-1/2 -translate-x-1/2 h-[400px] max-h-[60dvh] w-[calc(100%-20px)] bg-[#CCCCCC] rounded-[10px] flex flex-col z-50"
      >
        <div className="bg-[#444444] p-3! text-[#BFD732] flex justify-between rounded-t-[10px] mb-[5px]!">
          <span>Mensajes {count > 0 && `(${count})`}</span>
          <button onClick={() => setView(false)} className="rounded-full">
            <IoClose size={25} />
          </button>
        </div>
        {status.chats === 'loading' && <BounceLoader color="#39B54A" />}
        {chats?.map((chat, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center bg-[#F5F6F7] rounded-[10px] mx-[5px]! mb-[5px]! cursor-pointer shadow-[0px_4px_4px_0px_#4444444D]"
            onClick={() => {
              handleOpenChat(chat.contact);
              //getUserMessages({userId: user._id})
            }}
          >
            <div className="w-full bg-[#C7EACD] rounded-t-[10px] mx-[5px]! mb-[2px]! px-[5px]!">
              {chat.contact.fullname}
            </div>
            <div className="w-full flex mx-[5px]! my-[2px]! px-[5px]!">
              <div className="w-90 truncate">{chat.lastMessage.content}</div>
              <div
                className={`w-10 text-center rounded-full ${chat.unreadCount > 0 && 'bg-[#E61587]'}`}
              >
                {chat.unreadCount > 0 && chat.unreadCount}
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
        className="hidden md:flex flex-col absolute z-40 bottom-full right-[0px] w-80 h-96 bg-[#CCCCCC] rounded-[10px] cursor-default"
      >
        <div className="bg-[#444444] p-3! text-[#BFD732] flex justify-between rounded-t-[10px] mb-[5px]!">
          <span>Mensajes {count > 0 && `(${count})`}</span>
          <button
            onClick={() => setView(false)}
            className="cursor-pointer hover:bg-[#BFD73220] rounded-full transition-all"
          >
            <IoClose size={25} />
          </button>
        </div>
        {status.chats === 'loading' && <BounceLoader color="#39B54A" />}
        {chats?.map((chat, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center bg-[#F5F6F7] rounded-[10px] mx-[5px]! mb-[5px]! cursor-pointer shadow-[0px_4px_4px_0px_#4444444D]"
            onClick={() => handleOpenChat(chat.contact)}
          >
            <div className="w-full bg-[#C7EACD] rounded-t-[10px] mx-[5px]! mb-[2px]! px-[5px]!">
              {chat.contact.fullname}
            </div>
            <div className="w-full flex mx-[5px]! my-[2px]! px-[5px]!">
              <div className="w-90 truncate">{chat.lastMessage.content}</div>
              <div
                className={`w-10 text-center rounded-full ${chat.unreadCount > 0 && 'bg-[#E61587]'}`}
              >
                {chat.unreadCount > 0 && chat.unreadCount}
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </>
  );
};

const ChatBar = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { chats, status, unreadMessages } = useAppSelector(
    (state) => state.chat,
  );
  const [view, setView] = useState(false);

  useEffect(() => {
    if (view && user) {
      dispatch(getUserMessages({ userId: user._id }));
    }
  }, [view, user, dispatch]);

  return (
    <>
      <div
        className="md:hidden fixed top-[80dvh] left-[15px] w-auto px-[10px]! py-[4px]! bg-[#CCCCCC] rounded-[40px] shadow-[0px_0px_0px_0px_#0013331A,0px_2px_5px_0px_#0013331A,0px_9px_9px_0px_#00133317,0px_21px_13px_0px_#0013330D,0px_38px_15px_0px_#00133303,0px_59px_17px_0px_#00133300] z-40"
        onClick={() => setView(!view)}
      >
        <CiChat1 size={40} />
        <div
          className={`absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-[46%] ${unreadMessages > 0 && 'bg-[#E61587]'} w-[15px] h-[15px] rounded-full flex items-center justify-center text-[12px]`}
        >
          {view ? 'X' : unreadMessages}
        </div>
        {view && (
          <ChatList
            setView={setView}
            chats={chats}
            status={status}
            user={user}
            count={unreadMessages}
          />
        )}
      </div>

      <div
        className="hidden md:flex fixed bottom-[40px] right-[40px] w-auto px-[10px]! py-[4px]! bg-[#CCCCCC] rounded-[40px] shadow-[0px_0px_0px_0px_#0013331A,0px_2px_5px_0px_#0013331A,0px_9px_9px_0px_#00133317,0px_21px_13px_0px_#0013330D,0px_38px_15px_0px_#00133303,0px_59px_17px_0px_#00133300] cursor-pointer z-40"
        onClick={() => setView(!view)}
      >
        <CiChat1 size={40} />
        <div
          className={`absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-[46%] ${unreadMessages > 0 && 'bg-[#E61587]'} w-[15px] h-[15px] rounded-full flex items-center justify-center text-[12px]`}
        >
          {view ? 'X' : unreadMessages}
        </div>
        {view && (
          <ChatList
            setView={setView}
            chats={chats}
            status={status}
            user={user}
            count={unreadMessages}
          />
        )}
      </div>
    </>
  );
};

export default ChatBar;

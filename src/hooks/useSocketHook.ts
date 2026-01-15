import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import Swal from "sweetalert2";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { receiveMessage, setActiveChat } from "../features/chat/chatSlice";
import {
  addReceivedRequest,
  moveRequestToFriends,
} from "../features/match/matchSlice";

const NotificationToast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export const useSocket = (userId: string | undefined) => {
  const { activeChatUser } = useAppSelector((state) => state.chat);
  const dispatch = useAppDispatch();
  const isMobile = window.innerWidth < 768;

  const activeUserRef = useRef(activeChatUser);

  useEffect(() => {
    activeUserRef.current = activeChatUser;
  }, [activeChatUser]);

  useEffect(() => {
    if (!userId) return;

    const socket = io(import.meta.env.VITE_API_BASE_URL1, {
      query: { userId },
    });

    socket.on("NEW_FRIEND_REQUEST", (data) => {
      const newRequest = {
        _id: data.matchId,
        senderId: {
          _id: data.senderId,
          fullname: data.from,
          status: "pending",
        },
      };

      dispatch(addReceivedRequest(newRequest));

      Swal.fire({
        title: "¡Nueva solicitud!",
        text: `${data.from} quiere ser tu amigo`,
        icon: "info",
        toast: !isMobile,
        position: isMobile ? "top" : "top-end",
        showConfirmButton: false,
        timer: isMobile ? 1000 : 5000,
        timerProgressBar: true,
        background: "#fff",
        iconColor: "#39B54A",
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
    });

    socket.on("REQUEST_ACCEPTED", (data) => {
      dispatch(moveRequestToFriends(data));

      Swal.fire({
        title: "¡Solicitud aceptada!",
        text: `${data.friendName} ahora es tu amigo`,
        icon: "success",
        toast: !isMobile,
        position: isMobile ? "top" : "top-end",
        showConfirmButton: false,
        timer: isMobile ? 1000 : 5000,
        timerProgressBar: true,
        iconColor: "#39B54A",
      });
    });

    socket.on("PRIVATE_MESSAGE", (data) => {
      dispatch(receiveMessage(data));

      if (activeUserRef.current?._id !== data.senderId) {
        Swal.fire({
          title: "Nuevo mensaje",
          text: `${data.from}: ${data.content}`,
          icon: "info",
          toast: true,
          position: "top-end",
          timer: 3000,
          showConfirmButton: false,
          didOpen: (toast) => {
            toast.onclick = () => {
              dispatch(
                setActiveChat({ _id: data.senderId, fullname: data.from })
              );
              Swal.close();
            };
          },
        });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [userId]);
};

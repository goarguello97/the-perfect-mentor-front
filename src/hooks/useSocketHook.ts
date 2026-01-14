import { useEffect } from "react";
import { io } from "socket.io-client";
import Swal from "sweetalert2";
import { useAppDispatch } from "../app/hooks";
import {
  addReceivedRequest,
  moveRequestToFriends,
} from "../features/match/matchSlice";

export const useSocket = (userId: string | undefined) => {
  const dispatch = useAppDispatch();
  const isMobile = window.innerWidth < 768;

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

      console.log(`Nueva solicitud de ${data.from}`);
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

    return () => {
      socket.disconnect();
    };
  }, [userId]);
};

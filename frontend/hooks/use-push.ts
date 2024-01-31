import { useEffect } from "react";
import { useSelector } from "react-redux";
import { PushEvent } from "~/interface/interface";
import { RootState } from "~/redux/store";
import { emitter } from "~/utils/emitter";

let es: EventSource | undefined = undefined;

export const usePush = () => {
  const auth = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (es) es.close();
    if (auth.isAuthenticated)
      es = EventSourceFactory(
        process.env.NEXT_PUBLIC_BACKEND_LISTEN!,
        auth.jwt,
      );
  }, [auth.isAuthenticated]);
  const EventSourceFactory = (url: string, jwt?: string) => {
    try {
      let sessionId = sessionStorage.getItem("sessionId");
      if (!sessionId) {
        sessionId =
          Math.random().toString(36).substring(2, 15) +
          new Date().getTime().toString(36);
        sessionStorage.setItem("sessionId", sessionId);
      }

      const newEs = new EventSource(`${url}/sse?jwt=${jwt}&sid=${sessionId}`);

      newEs.onmessage = ({ data }) => {
        const event = JSON.parse(data) as PushEvent;
        emitter.emit("add-notification", event.data);
      };

      newEs.onerror = () => {
        let timer = setTimeout(() => {
          if (auth.isAuthenticated) {
            try {
              es = EventSourceFactory(
                process.env.NEXT_PUBLIC_BACKEND_LISTEN!,
                auth.jwt,
              );
            } catch (error) {}
          }
        }, 5000);
        if (timer) clearTimeout(timer);
      };

      return newEs;
    } catch (error) {}
  };
};

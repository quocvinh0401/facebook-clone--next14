import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AlarmUser } from "~/interface/interface";
import { setAlarm } from "~/redux/slices/alarm.slice";
import { useFetchWithCredentials } from "./use-fetch-with-credentials";

export const useAlarm = () => {
  const { data } = useFetchWithCredentials<AlarmUser>("alarm");
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) dispatch(setAlarm(data));
  }, [data]);
};

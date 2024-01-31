import axios, { AxiosRequestConfig } from "axios";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Query } from "~/interface/support.interface";
import { RootState } from "~/redux/store";
import { serialize } from "~/utils/utility";

export const useFetchWithCredentials = <T>(url: string, query?: Query) => {
  const auth = useSelector((state: RootState) => state.auth);
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    fetchData();
  }, []);

  const requestConfig: AxiosRequestConfig = {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      source: pathname,
    },
  };

  if (auth.jwt) {
    requestConfig.headers!.Authorization = `Bearer ${auth.jwt}`;
  }

  const urlWithQuery = query ? `${url}?${serialize(query)}` : url;

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios(
        `${process.env.NEXT_PUBLIC_BACKEND_LISTEN}/${urlWithQuery}`,
        requestConfig,
      );
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log("fetch error::::", error);
    }
  };

  const refresh = () => fetchData();

  return { data, isLoading, refresh };
  // const refresh = async () => fetchData();

  // return { data, refresh };
};

import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { Builder } from "builder-pattern";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";
import { serialize } from "~/utils/utility";
import { toast } from "react-toastify";
import { usePathname } from "next/navigation";

type Method = "get" | "post" | "put" | "patch" | "delete";

interface ApiOptions {
  loading?: boolean;
  alert?: {
    isUsed: boolean;
    success?: string;
    error?: string;
  };
}

export const useApi = (
  method: Method,
  options: ApiOptions,
  ..._paths: string[]
) => {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const auth = useSelector((state: RootState) => state.auth);

  const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_LISTEN;
  const requestConfig: AxiosRequestConfig = {
    method,
    headers: {
      "Content-Type": "application/json",
      source: pathname,
    },
  };
  if (auth.jwt) {
    requestConfig.headers!.Authorization = `Bearer ${auth.jwt}`;
  }

  const defaultOption = Builder<ApiOptions>().alert({ isUsed: true }).build();

  options = { ...defaultOption, ...options };
  return async (...pathsAndParams: (string | { [key: string]: any })[]) => {
    const paths =
      apiBaseUrl + (_paths && _paths.length > 0 ? "/" + _paths.join("/") : "");
    let url = paths;

    let data: any = {};
    pathsAndParams.forEach((element) => {
      if (element instanceof Object) {
        // Handle headers, body, or other configurations here
        if (Array.isArray(element)) {
          data = element;
        } else {
          data = { ...data, ...element };
        }
      } else {
        url += "/" + element;
      }
    });

    if (method === "get") {
      url += `?${serialize(data)}`;
      // data = undefined;
    }

    setLoading(true);
    try {
      const response = await axios(url, {
        ...requestConfig,
        data,
      });
      if (options.alert?.isUsed) {
        toast.success(options.alert.success || "Success!");
      }
      // Handle response, success, errors, etc.
      return response.data;
    } catch (error: any) {
      console.log({ error });
      if (options.alert?.isUsed) {
        toast.error(options.alert?.error || error.response.data.message);
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };
};

export const useGet = <T>(..._paths: (string | ApiOptions)[]) => {
  const paths = [] as string[];
  let options: ApiOptions = {};
  _paths.forEach((e) => {
    if (typeof e == "string") paths.push(e);
    else options = e;
  });
  const api = useApi("get", options, ...paths);

  return async (...pathsAndParams: (string | Partial<T>)[]): Promise<T> =>
    await api(...pathsAndParams);
};

export const usePost = <T>(..._paths: (string | ApiOptions)[]) => {
  const paths = [] as string[];
  let options: ApiOptions = {};
  _paths.forEach((e) => {
    if (typeof e == "string") paths.push(e);
    else options = e;
  });
  const api = useApi("post", options, ...paths);

  return async (...pathsAndParams: (string | Partial<T>)[]): Promise<T | {}> =>
    await api(...pathsAndParams);
};

export const usePatch = <T>(..._paths: (string | ApiOptions)[]) => {
  const paths = [] as string[];
  let options: ApiOptions = {};
  _paths.forEach((e) => {
    if (typeof e == "string") paths.push(e);
    else options = e;
  });
  const api = useApi("patch", options, ...paths);

  return async (...pathsAndParams: (string | Partial<T>)[]): Promise<T | {}> =>
    await api(...pathsAndParams);
};

export const useUploadFile = (..._paths: string[]) => {
  const auth = useSelector((state: RootState) => state.auth);

  const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_LISTEN;
  const requestConfig: AxiosRequestConfig = {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  if (auth.jwt) {
    requestConfig.headers!.Authorization = `Bearer ${auth.jwt}`;
  }

  const paths = apiBaseUrl + "/" + _paths.join("/");
  return async (data: FormData) => {
    const response = await axios(paths, { ...requestConfig, data });
    return response.data;
  };
};

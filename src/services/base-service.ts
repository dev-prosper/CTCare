import { AxiosHeaders, AxiosInstance, AxiosResponse, AxiosError } from "axios";
import {
  createAxiosInstance,
  createProtectedAxiosInstance,
} from "./axios-instance";
import { getAccessRefreshTokens } from "@/actions/utils.actions";

type BaseServiceConfig = {
  params?: Record<string, unknown>;
  headers?: AxiosHeaders;
  timeout?: number;
};

export abstract class BaseService {
  protected clientUrl: string;
  protected apiInstance: AxiosInstance;

  constructor(url: string, headers?: Record<string, string>) {
    this.clientUrl = url;
    this.apiInstance = createAxiosInstance(this.clientUrl, headers);
  }

  protected async handleRequest<TData>(
    request: Promise<AxiosResponse<TData>>,
  ): Promise<TData> {
    try {
      const response = await request;
      return response.data;
    } catch (e) {
      if (e instanceof AxiosError) {
        // Logger.log(e.response?.data)
        throw new Error(e.response?.data?.message || e.message);
      }
      throw new Error("Something went wrong while processing your request");
    }
  }

  public async get<TData>(
    url: string,
    config?: BaseServiceConfig & {
      responseType?: "json" | "blob" | "text" | "arraybuffer";
    },
  ): Promise<TData> {
    return this.handleRequest(
      this.apiInstance.get(url, {
        ...config,
        responseType: config?.responseType || "json",
      }),
    );
  }

  public async post<TResponse, TData>(
    url: string,
    data?: TData,
    config?: BaseServiceConfig,
  ): Promise<TResponse> {
    return this.handleRequest(this.apiInstance.post(url, data, config));
  }

  public async put<TResponse, TData>(
    url: string,
    data?: TData,
    config?: BaseServiceConfig,
  ): Promise<TResponse> {
    return this.handleRequest(this.apiInstance.put(url, data, config));
  }

  public async delete<TData>(
    url: string,
    config?: BaseServiceConfig,
  ): Promise<TData> {
    return this.handleRequest(this.apiInstance.delete(url, config));
  }
}

export abstract class ProtectedBaseService {
  protected clientUrl: string;
  protected apiInstance: AxiosInstance;

  constructor(url: string, headers?: Record<string, string>) {
    this.clientUrl = url;
    this.apiInstance = createProtectedAxiosInstance(this.clientUrl, headers);
  }

  protected async handleRequest<TData>(
    request: Promise<AxiosResponse<TData>>,
  ): Promise<TData> {
    try {
      const response = await request;
      return response.data;
    } catch (e) {
      if (e instanceof AxiosError) {
        // Logger.log(e.response?.data)
        throw new Error(e.response?.data?.message || e.message);
      }
      throw new Error("Something went wrong while processing your request");
    }
  }

  protected async addAuthorizationHeader(config?: Record<string, unknown>) {
    const { accessToken } = await getAccessRefreshTokens();

    if (!accessToken) {
      return config;
    }

    return {
      ...config,
      headers: {
        ...(config?.headers as object),
        Authorization: `Bearer ${accessToken}`,
      },
    };
  }

  public async makeRawRequest<TData>(args: {
    url: string;
    method: "get" | "post" | "put" | "delete" | "patch";
    params?: Record<string, unknown>;
    headers?: Record<string, unknown>;
    responseType?: "json" | "blob" | "text" | "arraybuffer";
    data?: unknown;
  }): Promise<TData> {
    const { url, params, headers, responseType, method, data } = args;
    try {
      const newHeaders = await this.addAuthorizationHeader({
        headers,
        params,
        responseType,
      });
      const response = await this.apiInstance.request({
        url,
        method,
        data,
        ...newHeaders,
      });
      return response.data;
    } catch (e) {
      if (e instanceof AxiosError) {
        // Logger.log(e.response?.data)
        throw new Error(e.response?.data?.message || e.message);
      }
      throw new Error("Something went wrong while processing your request");
    }
  }

  public async get<TData>(
    url: string,
    config?: BaseServiceConfig & {
      responseType?: "json" | "blob" | "text" | "arraybuffer";
    },
  ): Promise<TData> {
    const header = await this.addAuthorizationHeader({
      ...config,
      responseType: config?.responseType || "json",
    });
    return this.handleRequest(this.apiInstance.get(url, header));
  }

  public async post<TResponse, TData>(
    url: string,
    data?: TData,
    config?: BaseServiceConfig,
  ): Promise<TResponse> {
    const header = await this.addAuthorizationHeader(config);
    return this.handleRequest(this.apiInstance.post(url, data, header));
  }

  public async put<TResponse, TData>(
    url: string,
    data?: TData,
    config?: BaseServiceConfig,
  ): Promise<TResponse> {
    const header = await this.addAuthorizationHeader(config);
    return this.handleRequest(this.apiInstance.put(url, data, header));
  }

  public async delete<TResponse, TData>(
    url: string,
    config?: BaseServiceConfig & { data?: TData },
  ): Promise<TResponse> {
    const header = await this.addAuthorizationHeader(config);
    return this.handleRequest(this.apiInstance.delete(url, header));
  }
}

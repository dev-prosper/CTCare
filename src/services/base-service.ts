import { AxiosHeaders, AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { createAxiosInstance } from "./axios-instance";

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

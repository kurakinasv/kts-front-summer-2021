import qs from "qs";
import { ApiResponse, IApiStore, RequestParams, HTTPMethod, StatusHTTP } from "./types";

export default class ApiStore implements IApiStore {
    readonly baseUrl: string;           

    constructor(baseUrl: string) {      
        this.baseUrl = baseUrl;        
    }

    // формируем запрос, который хотим отправить
    private getReqData<ReqT>(params: RequestParams<ReqT>): [string, RequestInit] { 
        let endpoint = `${this.baseUrl}${params.endpoint}`   // шаблонная строка
        
        // формируем объект запроса 
        const req: RequestInit = {
            method: params.method,
            headers: { ...params.headers }
        }

        // формируем query-строку
        if (params.method === HTTPMethod.GET) {
            endpoint = `${endpoint}?${qs.stringify(params.data)}`
        }

        // формируем тело запроса
        if (params.method === HTTPMethod.POST) {
            req.body = JSON.stringify(params.data)
            req.headers = {
                ...req.headers,
                'Content-Type': 'application/json;charset=utf-8'
            }
        }

        return [endpoint, req]
    }

    async request<SuccessT, ErrorT = any, ReqT = {}>(params: RequestParams<ReqT>): Promise<ApiResponse<SuccessT, ErrorT>> {
        // TODO: Напишите здесь код, который с помощью fetch будет делать запрос

        try {
            const [endpoint, req] = this.getReqData(params)

            const response = await fetch(endpoint, req);

            // обрабатываем запрос, возвращаем данные из ApiResponse
            if (response.ok) {
                return {
                    success: true,
                    data: await response.json(),
                    status: response.status
                }
            }

            return {
                success: false,
                status: response.status,
                data: await response.json()
            }
        } catch (error) {
            return {
                success: false,
                data: error,
                status: StatusHTTP.ERROR
            }
        }
    }
}
import axios, {AxiosError, AxiosResponse} from "axios";

interface ApiResponse<T> {
    result?: T;
    error?: string;
    status: number;
}

const apiGet = async <T = {}>(url: string): Promise<ApiResponse<T>> => {
    try {
        return handleResult(await axios.get<T>(url, {withCredentials: true}));
    } catch (error) {
        return handleError(error);
    }
};

const apiPost = async <T = {}>(url: string, data?: any): Promise<ApiResponse<T>> => {
    try {
        return handleResult(await axios.post<T>(url, data, {withCredentials: true}));
    } catch (error) {
        return handleError(error);
    }
};

const apiPut = async <T = {}>(url: string, data: any): Promise<ApiResponse<T>> => {
    try {
        return handleResult(await axios.put<T>(url, data, {withCredentials: true}));
    } catch (error) {
        return handleError(error);
    }
};

const apiPatch = async <T = {}>(url: string, data: any): Promise<ApiResponse<T>> => {
    try {
        return handleResult(await axios.patch<T>(url, data, {withCredentials: true}));
    } catch (error) {
        return handleError(error);
    }
};

const apiDelete = async <T = {}>(url: string): Promise<ApiResponse<T>> => {
    try {
        return handleResult(await axios.delete<T>(url, {withCredentials: true}));
    } catch (error) {
        return handleError(error);
    }
};

const handleResult = <T>(result: AxiosResponse<T>) => {
    if(result.status / 100 === 2) {
        return {
            result: result.data,
            status: result.status
        };
    } else {
        return {
            status: result.status,
            error: result.statusText
        };
    }
};

const handleError = <T>(error: AxiosError<T>) => {
    return {
        status: error.response?.status || -1,
        error: error.message || error.response?.statusText || ""
    };
};

export {
    apiDelete,
    apiGet,
    apiPatch,
    apiPost,
    apiPut
};
interface requestResponse <DataType> {
    isLoading: Boolean,
    error: import('@angular/common/http').HttpErrorResponse | Error | null,
    data: DataType | null
  }
  
  interface systemUser {
    id:string, 
    accessToken:string, 
    role:string,
    email: string,
  }
  
  interface HttpRequestOptions {
    headers?: import('@angular/common/http').HttpHeaders;
    context?: import('@angular/common/http').HttpContext;
    reportProgress?: boolean;
    params?: import('@angular/common/http').HttpParams;
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
    withCredentials?: boolean;
  }
  
  type HttpMethods = 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'GET' | 'HEAD' | 'JSONP' | 'OPTIONS';  
  
  export interface UserInformation {
    email: string,
    role: string,
    id: number
  }
  
  export interface LoginResponse {
    accessToken: string,
    user: UserInformation
  }
  
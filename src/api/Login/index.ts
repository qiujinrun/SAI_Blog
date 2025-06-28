import  request  from "@/utils/request";
import type { LoginResponse,RegisterResponse } from "../Type/Login/type";
export function userlogin(user:any){
    return request<LoginResponse>({
        url:'/user/login',
        method:'post',
        data:user
    });
}
export function userregister(user:any){
    return request<RegisterResponse>({
        url:'/user/register',
        method:'post',
        data:user
    });
}
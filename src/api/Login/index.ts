import  request  from "@/utils/request";
export function userlogin(user:any){
    return request({
        url:'/user/login',
        method:'post',
        data:user
    })
}
export function userregister(user:any){
    return request({
        url:'/user/register',
        method:'post',
        data:user
    })
}
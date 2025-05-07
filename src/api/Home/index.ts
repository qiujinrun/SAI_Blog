import  request  from "@/utils/request";

export function getbloglist(key:string,page:string){
    return request({
        url:'/blog/list',
        method:'get',
        params:{key,page},
    })
}
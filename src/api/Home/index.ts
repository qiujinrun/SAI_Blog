import  request  from "@/utils/request";

export function getbloglist(key:string,page:string){
    return request({
        url:'/blog/list',
        method:'get',
        params:{key,page},
    })
}
//获取博客总数
export function getblogcount(){
    return request({
        url:'/blog/count',
        method:'get',

    })
}
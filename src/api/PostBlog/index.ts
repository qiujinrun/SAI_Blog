import  request  from "@/utils/request";

export function postblog(content:object){
    return request({
        url:'/blog/upload',
        method:'post',
        data:content
    })
}
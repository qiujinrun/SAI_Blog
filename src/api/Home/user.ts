import  request  from "@/utils/request";
export function userdetail(uid:any) {
    return request({
        url: `/user/${uid}`,
        method: 'get',
    })

}
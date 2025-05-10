import  request  from "@/utils/request";
import type { FollowResponse,UserDetailResponse } from "../Type/Home/type";
export function userdetail(uid:any) {
    return request<UserDetailResponse>({
        url: `/user/${uid}`,
        method: 'get',
    })

}
//关注用户
export function follow(uid:any) {
    return request<FollowResponse>({
        url: `/follow/${uid}`,
        method: 'post',
    })
}
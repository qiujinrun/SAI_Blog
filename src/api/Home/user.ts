import  request  from "@/utils/request";
import type { FollowResponse,UserDetailResponse,UnFollowResponse } from "../Type/Home/type";
import type { UserBloglistResponse } from "../Type/User/type";
export function userdetail(uid:any) {
    return request<UserDetailResponse>({
        url: `/user/${uid}`,
        method: 'get',
    });
}
//关注用户
export function follow(uid:any) {
    return request<FollowResponse>({
        url: `/follow/${uid}`,
        method: 'post',
    });
}
//取消关注
export function unfollow(uid:any) {
    return request<UnFollowResponse>({
        url: `/follow/${uid}`,
        method: 'delete',
    });
}

export function getuserbloglist(uid:any) {
    return request<UserBloglistResponse>({
        url: `/blog/userblog/${uid}`,
        method: 'get',
    });
}
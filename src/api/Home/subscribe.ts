import request from "@/utils/request";
import type {subscribeList} from "@/api/Type/Home/type";

export function Usersubscribe(page:string){
    return request<subscribeList>({
        url:"/blog/list/follow",
        params:page,
    });
}
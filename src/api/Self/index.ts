import  request  from "@/utils/request";
import type { MailResponse } from "@/api/Type/Self/type" 

export function updateMail(email:any) {
  return request<MailResponse>({
    url: "/user/bindmail",
    method: "post",
    data: { email },
  });
}
import  request  from "@/utils/request";
import type { MailResponse,AvaterResponse,ResetResponse } from "@/api/Type/Self/type" 

export function updateMail(email:any) {
  return request<MailResponse>({
    url: "/user/bindmail",
    method: "post",
    data: { email },
  });
}
//上传头像
export function uploadAvatar(file:any) {
  const formData = new FormData();
  formData.append("file", file); 
  return request<AvaterResponse>({
    url: "/user/ico-update",
    method: "post",
    data: formData, 
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

//发送邮件去修改密码
export function sendResetMail() {
  return request<ResetResponse>({
    url: "/user/reset/sendmail",
    method: "post",
  });
}
//修改密码
export function resetPassword(password:any) {
  return request({
    url: "/user/reset/admin",
    method: "post",
    data: { password }
  });
}
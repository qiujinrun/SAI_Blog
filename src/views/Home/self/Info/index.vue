<template>
    <div class="main-content">
        <el-card style="max-width: 480px">
            <template #header>
                <div class="card-header">
                    <span>创作者信息</span>
                </div>
            </template>
            <el-avatar :size="150" :src="userinfo.ico_url" />
            <div class="username">
                <span>{{ userinfo.name }}</span>
            </div>
            <div class="user-stats">
                <div><strong>{{ userinfo.follower }}</strong>
                    <div>关注数</div>
                </div>
                <div><strong>{{ userinfo.followed }}</strong>
                    <div>粉丝数</div>
                </div>
            </div>
            <template #footer>Footer content</template>
        </el-card>
    </div>
    <div class="basic-info">
        <div class="title">基本信息</div>
        <div class="content">
            <div class="name">
                <span>姓名：</span>
                <span>{{ userInfo.name }}</span>
            </div>
            <div class="account">
                <span>账号：</span>
                <span>{{ userInfo.account }}</span>
            </div>
            <div class="account">
                <span>密码：</span>
                <el-button type="primary" @click="SendResetMail">修改密码</el-button>
                <!-- <el-dialog v-model="dialogVisible" title="修改密码">
                    <el-form :model="form" label-width="100px">
                        <el-form-item label="新密码">
                            <el-input v-model="form.new_password" type="password" placeholder="请输入新密码"></el-input>
                        </el-form-item>
                    </el-form>
                    <template #footer>
                      <el-button @click="dialogVisible = false">关闭</el-button>
                      <el-button type="primary" @click="updatedPassword">提交</el-button>
                    </template>
                </el-dialog> -->                    
            </div>
            <div class="avater">
                <div>个人头像：</div>
                <el-avatar class="el-avater" :size="100" :src="userinfo.ico_url" />
                <!-- 做个实验 -->
                <input type="file" ref="fileInput" @change="handleFileChange" accept="image/*" style="display: none" />
                <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar" @click="triggerUpload" /> -->
                <el-button class="el-btn" type="success" @click="triggerUpload">选择头像</el-button>
                <!-- <el-button class="el-btn" type="success" @click="triggerUpload">选择头像</el-button> -->
                <div class="font">支持 jpg/jpeg/png 格式，大小不要超过 2MB
                    图片尺寸 1:1，推荐分辨率：256*256px
                </div>
            </div>
            <div class="mail">
                <div>邮箱：</div>
                <el-input class="mailinfo" v-model="userinfo.email" placeholder="请输入邮箱"></el-input>
                <el-button class="el-btn" type="success" @click="UpdateMail">修改邮箱</el-button>
            </div>
        </div>
    </div>
</template>

<script setup>
// const VITE_API_URL = import.meta.env.VITE_API_URL
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { useUserStore } from '@/store/modules/user';
import { userdetail } from '@/api/Home/user';
import { updateMail, uploadAvatar,sendResetMail } from "@/api/Self";
import axios from 'axios';

const dialogVisible = ref(false);
const userStore = useUserStore();
const userInfo = userStore.userInfo;
const uid = userStore.userInfo.ID;
// const form = ref({
//     // old_password: '',
//     new_password: '' 
// })
//修改密码跳转页面
const SendResetMail = async () => {
    const res = await sendResetMail();
    if (res.status_code === 1) {
        ElMessage.success(res.status_msg); 
    } else {
        ElMessage.error(res.status_msg); 
    }
};
//获取我的信息
const userinfo = ref({
    name: '',
    account: '',
    ico_url: '',
    email: ''
});
//获取用户信息
const getuserdetail = async () => {
    const res = await userdetail(uid);
    console.log(res);
    if (res.status_code === 1) {
        userinfo.value = res.user;
        userinfo.value.ico_url ="http://1.95.40.68:8081"+userinfo.value.ico_url;
        console.log(userinfo.value.ico_url);
    } else {
        ElMessage.error(res.status_msg);
    }
};
//修改邮箱
const UpdateMail = async () => {
    const res = await updateMail(userinfo.value.email);
    if (res.status_code === 1) {
        ElMessage.success(res.status_msg);
    } else {
        ElMessage.error(res.status_msg);
    }
};
//头像上传
const imageUrl = ref('');
const fileInput = ref(null);
const triggerUpload = () => {
    fileInput.value.click();
};
const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // 预览
    imageUrl.value = URL.createObjectURL(file);

    // 上传
    const formData = new FormData();
    formData.append('file', file);

    const res = await uploadAvatar(file);
    if (res.status_code === 1) {
        ElMessage.success(res.status_msg);
        getuserdetail();
    } else {
        ElMessage.error(res.status_msg);
    }
};
onMounted(() => {
    getuserdetail();
});
</script>
<style scoped lang="scss">
.main-content {
    color: black;
    margin-top: 40px;
    margin-left: -10px;

    .card-header {
        font-size: 18px;
    }

    .username {
        font-size: 30px;
        font-weight: bold;
    }

    .user-stats {
        display: flex;
        justify-content: space-around;
        margin: 12px 0;
        font-size: 22px;
    }

    .btn-group {
        .subscribe {
            font-size: 20px;
            width: 200px;
            height: 50px;
        }

        .message {
            margin-left: 30px;
            font-size: 20px;
            width: 200px;
            height: 50px;
        }
    }
}

.basic-info {
    // display: flex;
    text-align: left;
    margin-top: 40px;
    margin-left: -10px;
    font-size: 20px;
    background-color: white;
    border-radius: 8px;
    border: 1px solid #ccc;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 1000px;
    color: black;
    .title {
        font-size: 24px;
        margin-bottom: 20px;
        font-weight: bold;
        color: black;
    }

    .content {
        margin-left: 20px;
        margin-bottom: 20px;
        color: black;

        .name {
            margin-bottom: 10px;
            font-size: 20px;
            color: black;
        }

        .account {
            margin-bottom: 10px;
            font-size: 20px;
            color: black;
        }

        .avater {
            display: flex;
            margin-bottom: 10px;
            font-size: 20px;
            color: black;

            .el-avater {
                display: block;
                margin-left: 10px;
                flex-direction: column;
                align-self: flex-start;
                /* 避免撑满容器 */
            }

            .el-btn {
                margin-left: 30px;
                display: flex;

            }

            .font {
                width: 400px;
                display: block;
                margin-left: 20px;
                color: #ccc;
            }
        }

        .mail {
            margin-bottom: 10px;
            font-size: 20px;
            color: black;

            .mailinfo {
                //   margin-left: 10px;
                margin-top: 10px;
                width: 500px;
            }

            .el-btn {
                margin-left: 30px;
                margin-top: 10px;

            }

        }
    }

}
</style>
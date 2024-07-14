<template>
    <div class="change-password">
        <div class="ms-change">
            <el-card class="box1">
                    <div class="header" style="text-align: center; margin-bottom:40px"><span>修改密码</span></div>

                    <el-form class="ms-content" ref="passwordForm" :rules="rules" :model="dataForm" label-width="100px">
                        <el-form-item  label="原密码" prop="oldPassword">
                            <el-input type="password" v-model="dataForm.oldPassword" autocomplete="off"
                                @focus="input = true" @blur="input = false"></el-input>
                        </el-form-item>
                        <el-form-item  label="新密码" prop="newPassword">
                            <el-input  type="password" v-model="dataForm.newPassword" autocomplete="off"
                                @focus="input = true" @blur="input = false"></el-input>
                        </el-form-item>
                        <el-form-item  label="确认密码" prop="confirmPassword">
                            <el-input  type="password" v-model="dataForm.confirmPassword" autocomplete="off"
                                @focus="input = true" @blur="input = false"></el-input>
                        </el-form-item>
                    </el-form>
                    
                    <div style="text-align: center;">
                        <el-button type="primary" @click="submitForm">提交</el-button>
                    </div>
            </el-card>
            <img class="leftImg" src="../../assets/left1.png" v-show="!input">
            <img class="rightImg" src="../../assets/right1.png" v-show="!input">

            <img class="leftImg" src="../../assets/left2.png" v-show="input">
            <img class="rightImg" src="../../assets/right2.png" v-show="input">
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            dataForm: {
                oldPassword: '',
                newPassword: '',
                confirmPassword: '',
                id: JSON.parse(sessionStorage.getItem('loginUser')).id,
                tPassword: JSON.parse(sessionStorage.getItem('loginUser')).password
            },
            rules: {
                oldPassword: [
                    { required: true, message: '请输入原密码', trigger: 'blur' },
                    { validator: this.verifyOldPassword },
                ],
                newPassword: [
                    { required: true, message: '请输入新密码', trigger: 'blur' },
                ],
                confirmPassword: [
                    { required: true, message: '请确认密码', trigger: 'blur' },
                    { validator: this.confirmPasswordValidator },
                ],
            },
            input: false
        };
    },
    methods: {
        submitForm() {
            this.$refs.passwordForm.validate((valid) => {
                console.log(this.dataForm);
                if (valid) {
                    this.updatePassword();
                } else {
                    this.$message.error('密码更新失败,请按照规则填写!')
                }
            });
        },
        confirmPasswordValidator(rule, value, callback) {
            if (value !== this.dataForm.newPassword) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        },
        verifyOldPassword(rule, value, callback) {
            if (value !== this.dataForm.tPassword) {
                callback(new Error('原密码错误!'));
            } else {
                callback();
            }
        },
        updatePassword() {
            // const { oldPassword, newPassword } = this.dataForm;
            // 这里使用 axios 发送请求到 json-server 更新密码
            const userId = this.dataForm.id;
            console.log(userId);
            axios.patch(`http://localhost:8080/users/${userId}`, {
                password: this.dataForm.newPassword
            })
                .then(() => {
                    this.$message.success('密码更新成功');
                    // 可以在这里添加逻辑，如跳转回登录页面或刷新当前页面
                })
                .catch((error) => {
                    this.$message.error('密码更新失败');
                    console.error(error);
                });
        },
        changeImages() {
            this.first = !this.first;
            this.second = !this.second;
        },
    },
   mounted() {
   }
};
</script>

<style scoped>
.change-password {
    height: 100vh;
    background-size: cover;
    justify-content: center;
    align-items: center;
    display: flex;
}

.ms-change {
    width: 500px;
    height: 350px;
    border-radius: 5px;
    background: white;
    overflow: hidden;
    padding: 0;
    position: relative;
}

.box1 {
    width: 500px;
    height: 400px;
    position: relative;
}

.ms-content {
    padding-right: 30px;
}

.leftImg {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 90px;
    /* 设置图片宽度，根据实际情况调整 */
    height: auto;
}

.rightImg {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 90px;
    /* 设置图片宽度，根据实际情况调整 */
    height: auto;
}
</style>
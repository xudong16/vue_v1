<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">请登录</div>
      <el-form
        class="ms-content"
        ref="login"
        :model="dataForm"
        :rules="rules"
        label-width="0px"
      >
        <el-form-item prop="username">
          <el-input
            v-model="dataForm.username"
            placeholder="用户名"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="密码"
            v-model="dataForm.password"
            show-password
            @keyup.enter.native="submitForm()"
            @focus="changeImages()"
            @blur="changeImages()"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">登录</el-button>
        </el-form-item>
      </el-form>
            <img class="leftImg" src="../assets/left1.png" v-show="first">
            <img class="rightImg" src="../assets/right1.png" v-show="first">
            <img class="leftImg" src="../assets/left2.png" v-show="second">
            <img class="rightImg" src="../assets/right2.png" v-show="second">
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      dataForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      first: true,
      second: false
    };
  },
  methods: {
    submitForm() {
      // 表单验证
      this.$refs.login.validate((valid) => {
        if (valid) {
          // 登录：
          // this.login();
          this.$axios.get('/users', {
            params: {
              username: this.dataForm.username,
              password: this.dataForm.password,
            }
          }).then(({data}) => {
            if(data.length != 0) {
              this.$message.success(`登陆成功!欢迎您:${data[0].nickName}`);
              sessionStorage.setItem('loginUser', JSON.stringify(data[0]));
              this.$router.replace('/');
            }else {
              this.$message.error("账号或密码错误!!");
            }
          })
        } else {
          this.$message.error("账号或密码错误!!");
          return false;
        }
      });
    },
    changeImages() {
            this.first = !this.first;
            this.second = !this.second;
        },
    /* login() {
      let nickname;
      // 假设你已经从服务器获取了用户数据到 this.users
      const user = this.users.find((u) => {
        if (
          u.username === this.dataForm.username &&
          u.password === this.dataForm.password
        ) {
          this.nickname = u.nickName; // 更新昵称变量
          sessionStorage.setItem('nickName', this.nickname); // 保存到 sessionStorage
          return true; // 找到匹配项，返回 true 退出 find 方法
        }
        return false; // 默认返回 false 继续查找
      });
      if (user) {
        // 进行其他登录后操作，比如保存用户信息到 localStorage 或 vuex
        this.$router.push("/welcome");
        this.$message.success(`登陆成功!欢迎您:${this.nickname}`);
      } else {
        // 登录失败逻辑
        this.$message.error("账号或密码错误!!");
      }
    }, */
   /*  fetchUsers() {
      // 使用 axios 发送请求到 json-server 获取用户数据
      axios
        .get("http://localhost:8080/users")
        .then((response) => {
          this.users = response.data; // 将获取到的用户数据存储到 data 中
        })
        .catch(() => {});
    }, */
  },
  created() {
    // 组件创建时获取用户数据
  },
  components: {},
};
</script>

<style scoped>
.login-wrap {
  height: 100vh;
  background-image: url(~@/assets/bg.jpg);
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}

.ms-login {
  width: 500px;
  height: 350px;
  border-radius: 5px;
  background: rgb(255, 255, 255);
  overflow: hidden;
  position: relative;
  padding: 0;
}

.ms-title {
  font-size: 20px;
  line-height: 50px;
  text-align: center;
  color: #ddd;
  border-bottom: 1px solid #ddd;
  letter-spacing: 10px;
}

.ms-content {
  padding: 30px 30px 10px;
}

.el-button {
  width: 100%;
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

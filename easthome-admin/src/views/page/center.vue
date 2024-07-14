<template>
  <div>
    <el-page-header
      @back="() => this.$router.back()"
      :content="'个人中心'"
    ></el-page-header>
    <el-card shadow="never">
      <el-form ref="form" :value="user" label-width="80px">
        <header slot="header">基本信息</header>
        <el-form-item label="用户名" prop="username">
          <el-input
          :value="user.username"
            placeholder="用户名"
            readonly
          ></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" prop="nickName">
          <el-input
          :value="user.nickName"
            placeholder="用户昵称"
            readonly
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
          :value="user.password"
            placeholder="密码"
            show-password
            readonly
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input
          :value="user.mobile"
            placeholder="手机号"
            readonly
          ></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-input
            :value="genderText"
            placeholder="性别"
            readonly
          >
          </el-input>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "center",
  data() {
    return {
      visible: false,
      // 用户
      user: {
        id: undefined,
        username: undefined,
        nickName: undefined,
        password: undefined,
        mobile: undefined,
        gender: undefined,
      },
      // 校验
      /* rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          {
            min: 2,
            max: 15,
            message: "长度为 2 到 15 个字符",
            trigger: "blur",
          },
        ],
        nickName: [
          { required: true, message: "用户昵称不能为空", trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
        ],
      }, */
    };
  },
  computed: {
    genderText() {
      let gender = this.user.gender;
      if (gender == 1) {
        return "男性";
      } else if (gender == 2) {
        return "女性";
      } else if (gender == 3) {
        return "未知";
      } else {
        return "性别错误";
      }
    },
  },
  created() {
    this.user = JSON.parse(sessionStorage.getItem("loginUser"));
    // if (this.user.id) {
    //   this.$axios.get(`/users/${this.user.id}`).then(({ data }) => {
    //     this.user = data;
    //   });
    // }
  },
};
</script>

<style scoped>
.el-page-header {
  margin: 10px 0 30px;
}
</style>
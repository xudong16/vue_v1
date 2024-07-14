<template>
    <div>
        <el-container style="height: 100vh">
            <el-aside width="auto">
                <!-- logo -->
                <div :class="{ logo: !sidebarCollapse, 'logo-collapse': sidebarCollapse }" >
                    <img src="../assets/logo.jpg"><!---->
                    <div class="title" v-if="!sidebarCollapse">后台管理</div>
                </div>
                <!-- 导航菜单 -->
                <el-menu default-active="welcome" :collapse="sidebarCollapse" unique-opened router>
                    <el-menu-item class="line" index="welcome"><!---->
                        <i class="el-icon-s-home"></i>
                        <span slot="title">欢迎</span>
                    </el-menu-item>
                    <el-submenu class="line" index="system"><!---->
                        <template slot="title">
                            <i class="el-icon-s-tools"></i>
                            <span>系统中心</span>
                        </template>
                        <el-menu-item index="user">用户管理</el-menu-item>
                    </el-submenu>
                    <el-submenu class="line" index="clazz"><!---->
                        <template slot="title">
                            <i class="el-icon-s-management"></i>
                            <span>选课中心</span>
                        </template>
                        <el-menu-item index="course">课程管理</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-container>
                <el-header height="71px" class="nav">
                    <i :class="['icon', sidebarCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold']"
                        @click="sidebarCollapse = !sidebarCollapse"></i>
                    <el-dropdown @command="handleCommand">
                        <div class="el-dropdown-link user">
                            <i class="el-icon-s-custom"></i>&emsp;
                            <span>{{ nickName }}</span>
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </div>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="center">个人中心</el-dropdown-item>
                            <el-dropdown-item divided command="changepsd">修改密码</el-dropdown-item>
                            <el-dropdown-item divided command="logout">退出系统</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-header>
                <hr><!---->
                <el-main class="main">
                    <router-view />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import Login from './Login.vue';
export default {
    name: 'Index',
    data() {
        return {
            sidebarCollapse: false,
            nickName: ''
        }
    },
    methods: {
        handleCommand(command) {
            switch (command) {
                case 'center': {
                    this.$router.push('/center');
                    break;
                }
                case 'logout': {
                    this.$confirm('确认退出系统吗？', '提示', {
                type: 'warning'
               }).then(() =>{
                    // 退出登录 
                    this.$router.push('/login');
                    this.$message.success('退出成功!!')
               }).catch(() => {
                this.$message.info('取消退出')
               });
               break;
                }
                case 'changepsd': {
                    this.$router.push('/changepsd');
                    break;
            }
                default: break;
        }
    }
    },
    mounted() {
        let loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
        if (loginUser) {
            this.nickName = loginUser.nickName || '用户';
        }
    }
}
</script>

<style scoped>
.logo {
    height: 71px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e6e6e6;
}

.logo-collapse {
    height: 60px;
    border-bottom: 1px solid #e6e6e6;
}

.logo .title {
    color: #ffffff;
    font: bold 30px "楷体";
}

.logo-collapse .title {
    width: 0;
}

.logo img,
.logo-collapse img {
    margin: 5px;
    width: 50px;
    
}

.el-menu {
    border-right: 0 !important;
    background-color: #ffffff !important;/* */
}

.el-menu:not(.el-menu--collapse) {
    width: 200px;
}

.el-header {
    background-color: rgb(155, 209, 232);
}/* */
.el-aside {
    background-color:rgb(155, 209, 232);
}/* */
.el-aside:hover {
    background-color: rgb(135, 199, 222);
}

.el-aside:active {
    background-color: rgb(115, 189, 212);
}
.nav {
    /* border-bottom: 1px solid #e6e6e6; */
    display: flex;
    background-color: rgb(155, 209, 232);
    justify-content: space-between;
    border-left: 1px solid #000000;
}

.nav .icon {
    font-size: 30px;
    color: #000000;
    line-height: 61px;
    cursor: pointer;
}

.nav .user {
    color: #000000;
    line-height: 61px;
    cursor: pointer;
}

.main {
    background-color: rgb(248, 248, 240)  ;
    padding: 10px;
    border-left: 1px solid #000000;
    
}

hr {
    
    width: 100%;
    margin: 0;
}
.line {
   border-top: 1.5px solid #000000;
}
.line1 {
   border-top: 1.5px solid #6c6969;
}
</style>
<template>
    <div>
        <!-- 查询表单 -->
        <el-form inline>
            <el-form-item>
                <el-input v-model="searchForm.username" placeholder="用户名" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="searchForm.nickName" placeholder="昵称" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="searchForm.mobile" placeholder="手机号" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-select v-model="searchForm.gender" placeholder="性别" clearable>
                    <el-option label="男性" value="1"></el-option>
                    <el-option label="女性" value="2"></el-option>
                    <el-option label="未知" value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="queryUser">查询</el-button>
                <el-button type="primary" @click="addUpdateUser()">新增用户</el-button>
            </el-form-item>
        </el-form>
        <!-- 数据表格 -->
        <el-table :data="tableData" border stripe>
            <el-table-column prop="id" label="ID" header-align="center" width="70" fixed align="center"></el-table-column>
            <el-table-column prop="username" label="用户名" header-align="center" fixed align="center"></el-table-column>
            <el-table-column prop="nickName" label="昵称" header-align="center" align="center"></el-table-column>
            <el-table-column prop="mobile" label="手机号" header-align="center" align="center"></el-table-column>
            <el-table-column prop="gender" label="性别" header-align="center" :formatter="genderFormatter" align="center"></el-table-column>
            <el-table-column label="操作" header-align="center" align="center" width="150" fixed="right">
                <template slot-scope="scope">
                    <el-button type="warning" size="mini" @click="addUpdateUser(scope.row.id)">编辑</el-button>
                    <el-button type="danger" size="mini" @click="deleteUser(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
         <!-- 
        事件函数
        @current-change 自定义事件，页码变化时自动触发
         -->
        <el-pagination :current-page="pageData.current" :page-size="pageData.size" :total="pageData.total"
            :page-sizes="[5, 10, 20, 50]" layout="sizes, prev, pager, next, ->, total, jumper"
            @current-change="currentChangeHandle" @size-change="sizeChangeHandle">
        </el-pagination>
        <!-- 新增编辑页 -->
         <user-add-update ref="addUpdate" @refreshTable="queryUser"></user-add-update>
    </div>
</template>

<script>
import UserAddUpdate from './UserAddUpdate.vue';
export default {
    name: 'User',
    data() {
        return {
            // 查询表单数据
            searchForm: {
                username: undefined,
                nickName: undefined,
                mobile: undefined,
                gender: undefined
            },
            // 表格数据
            tableData: [],
            // 分页数据
            pageData: {
                current: 1,
                size: 5,
                total: 0
            }
        };
    },
    methods: {
        // 页码变化事件函数
        currentChangeHandle(page) {
            this.pageData.current = page;
            this.queryUser();
        },
        // 页码大小变化事件函数
        sizeChangeHandle(size) {
            this.pageData.size = size;  
            this.pageData.current = 1;
            this.queryUser();
        },
        // 查询用户
        queryUser() {
            this.$axios.get('/users',{
                params: {
                    // 分页相关
                    _page: this.pageData.current,
                    _limit: this.pageData.size,
                    // 查询条件
                    username: this.searchForm.username || undefined,
                    nickName: this.searchForm.nickName || undefined,
                    mobile: this.searchForm.mobile || undefined,
                    gender: this.searchForm.gender || undefined,
                }
            }).then(response => {
                this.tableData = response.data;
                // 分页时总记录数是在响应头中x-total-count字段中携带的
                this.pageData.total = parseInt(response.headers['x-total-count']);
                // console.log(response.headers['x-total-count']);
            });
        },
        // 性别列格式化
        genderFormatter(row, column, cellValue) {
            if (cellValue == 1) {
                return '男性';
            } else if (cellValue == 2) {
                return '女性';
            } else if (cellValue == 3){
                return '未知';
            } else {
                return '性别错误';
            }
        },
        // 新增编辑页
        addUpdateUser(id) {
        //    父调子函数
            this.$refs.addUpdate.initDialog(id);
        },
        // 删除用户
        deleteUser(id) {
            this.$confirm('确认删除该用户吗？', '提示', {type: 'warning'}).then(() => {
                this.$axios.delete(`/users/${id}`).then(response => {
                    this.$message.success('删除成功');
                    this.queryUser();
                });
            }).catch(() => {});
        }
    },
    mounted() {
        this.queryUser(); 
    },
    components: {
        UserAddUpdate
    }
}
</script>

<style scoped>
.el-form-item {
    margin: 20px 0px 20px 40px;
}
</style>
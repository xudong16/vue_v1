<template>
    <div>
        <!-- 头部 -->
        <el-page-header @back="() => this.$router.back()" :content="course.courseName">
        </el-page-header>
        <!-- 添加章节按钮 -->
        <div class="add-btn">
            <el-button type="primary" @click="addUpdateChapter()">添加章节</el-button>
        </div>
        <!-- 树形控件:展示课程对应的章节信息 -->
        <el-tree :data="chapters">
            <!-- slot-scope：代表当前树节点内容，有两个参数 data表示当前树节点, node表示当前节点状态 -->
            <div class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ data.chapterName }}</span>
                <span>
                    <el-button type="warning" size="small" icon="el-icon-edit" @click="addUpdateChapter(data.id)"></el-button>
                    <el-button type="danger" size="small" icon="el-icon-delete" @click="deleteChapter(data.id)"></el-button>
                </span>
            </div>
        </el-tree>

        <!-- <chapter-add-update ref="addUpdate" @refreshData="queryChapter"></chapter-add-update> -->
    </div>
</template>

<script>
// 导入新增修改页
import { _ } from "core-js";
export default {
    name: 'Chapter',
    data() {
        return {
            // 课程
            course: {
                id: undefined,
                courseName: undefined
            },
            // 课程章节数组
            chapters: []
        };
    },
    methods: {
        //获取章节列表，参数courseId

        //
        queryChapter(courseId) {
            this.$axios.get('/chapters', {
                params: {
                    courseId: this.course.id,
                    _sort: 'sortNum',
                }
            }).then(response => {
                this.chapters = response.data;
            });
        },
        addUpdateChapter(id) {
      if (id) {
        this.$router.push({ name: "ChapterAddUpdate", params: { id } });
      } else {
        this.$router.push({ name: "ChapterAddUpdate" });
      }
    },
        deleteChapter(id) {
            this.$confirm('确定要删除该课程吗?', '提示', {
                type: 'warning'
            }).then(() => {
                this.$axios.delete(`/chapters/${id}`).then(response => {
                    this.$message.success('课程删除成功');
                    this.queryChapter(this.course.id);
                });
            }).catch(()=> {
            })
        },
    },
    mounted() {
        let params = this.$route.params;
        
        if (params.courseName && params.courseId) {
            this.course.courseName = params.courseName;
            this.course.id = params.courseId;
            this.queryChapter(this.course.id)
        }
    },
};
</script>

<style scoped>
.el-page-header {
    margin: 10px 0 30px;
}

.add-btn {
    margin: 20px 0;
}

.el-tree /deep/ .el-tree-node__content {
    height: auto;
}

.custom-tree-node {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: auto;
    padding: 10px;
    border-bottom: 1px solid #e7e7e7;
}
</style>

<template>
  <div>
    <!-- 查询表单 -->
    <el-form inline>
      <el-form-item label="课程名称">
        <el-input
          v-model="searchForm.courseName"
          placeholder="课程名称"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="课程状态">
        <el-select v-model="searchForm.status" placeholder="课程状态" clearable>
          <el-option label="已发布" value="1"></el-option>
          <el-option label="草稿" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="queryCourse">查询</el-button>
        <el-button type="primary" @click="addUpdateCourse()">新建课程</el-button>
      </el-form-item>
    </el-form>

    <!-- 数据表格 -->
    <el-table :data="tableData" border stripe>
      <el-table-column prop="id" label="ID" header-align="center" width="70" fixed align="center"></el-table-column>
      <el-table-column prop="courseName" label="课程名称" header-align="center" fixed align="center"></el-table-column>
      <el-table-column prop="teacherName" label="授课讲师" header-align="center" align="center"></el-table-column>
      <el-table-column prop="price" label="价格" header-align="center" align="center">
        <template slot-scope="scope"> ¥{{ scope.row.price }} </template>
      </el-table-column>
      <el-table-column prop="sortNum" label="排序" header-align="center" width="70" align="center"></el-table-column>
      <el-table-column prop="status" label="状态" header-align="center" align="center" width="160">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status" active-text="已发布" inactive-text="草稿" active-value="1" inactive-value="0" @change="updateStatus(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        header-align="center"
        align="center"
        width="260"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button
            type="warning"
            size="mini"
            @click="addUpdateCourse(scope.row.id)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            size="mini"
            @click="deleteCourse(scope.row.id)">删除</el-button>
          <el-button size="mini" @click="showCourseChapter(scope.row)">课程章节</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :current-page="pageData.current"
      :page-size="pageData.size"
      :total="pageData.total"
      :page-sizes="[5, 10, 20, 50]"
      layout="sizes, prev, pager, next, ->, total, jumper"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { _ } from "core-js";

export default {
  name: "Course",
  data() {
    return {
      // 查询表单数据
      searchForm: {
        courseName: undefined,
        status: undefined,
      },
      // 表格数据
      tableData: [],
      // 分页数据
      pageData: {
        current: 1,
        size: 5,
        total: 0,
      },
    };
  },
  methods: {
    // 查询课程
    queryCourse() {
      this.$axios
        .get("/courses", {
          params: {
            // 分页相关
            _page: this.pageData.current,
            _limit: this.pageData.size,
            // 排序相关
            _sort: "sortNum",
            // 查询条件
            courseName: this.searchForm.courseName || undefined,
            status: this.searchForm.status || undefined,
          },
        })
        .then((response) => {
          this.tableData = response.data;
          // 分页时总记录数是在响应头中x-total-count字段中携带的
          this.pageData.total = parseInt(response.headers["x-total-count"]);
          // console.log(response.headers['x-total-count']);
        });
    },
    handleCurrentChange(page) {
      this.pageData.current = page;
      this.queryCourse();
    },
    handleSizeChange(size) {
      this.pageData.size = size;
      this.pageData.current = 1;
      this.queryCourse();
    },
    updateStatus(course) {
      this.$confirm("确定修改状态吗", "提示", { type: "warning" })
        .then(() => {
          this.$axios
            .patch(`/courses/${course.id}`, course)
            .then((response) => {
              this.$message.success("课程状态修改成功");
              this.queryCourse();
            });
        })
        .catch(() => {
          if (course.status == "0") {
            course.status = "1";
          } else if (course.status == "1") {
            course.status = "0";
          }
        });
    },
    addUpdateCourse(id) {
      if (id) {
        this.$router.push({ name: "CourseAddUpdate", params: { id } });
      } else {
        this.$router.push({ name: "CourseAddUpdate" });
      }
    },
    deleteCourse(id) {
      this.$confirm("确认删除该课程吗？", "提示", { type: "warning" })
        .then(() => {
          this.$axios.delete(`/courses/${id}`).then((response) => {
            this.$message.success("删除成功");
            this.queryCourse();
          });
        })
        .catch(() => {});
    },
    showCourseChapter(row) {
      this.$router.push({ name: "Chapter", params: { courseId: row.id, courseName: row.courseName } });
    },
  },
  mounted() {
    this.queryCourse();
  },
};
</script>

<style scoped>
.el-form-item {
    margin: 20px 0px 20px 40px;
}
</style>

<template>
    <div>
        <!-- 头部 -->
        <el-page-header @back="() => this.$router.push({ name: 'Chapter', params: { courseName: this.course.courseName, courseId: this.course.id } })" :content="course.id ? '编辑章节' : '新增章节'">
        </el-page-header>
        <!-- 表单 -->
        <el-form ref="form" :model="chapter" :rules="rules" label-width="80px">
          <el-card shadow="never">
          <el-form-item label="课程名称">
            <el-input v-model="course.courseName" readonly></el-input>
          </el-form-item>
          <el-form-item label="章节名称" prop="chapterName">
            <el-input v-model="chapter.chapterName"></el-input>
          </el-form-item>
          <el-form-item label="章节描述" prop="description">
            <el-input type="textarea" v-model="chapter.description"></el-input>
          </el-form-item>
          <el-form-item label="章节排序" prop="sortNum">
            <el-input-number v-model="chapter.sortNum" :min="1" controls-position="right"></el-input-number>
          </el-form-item>
          <el-form-item label="章节视频" prop="video">
            <el-upload
              name="file"
              class="upload-demo"
              action="http://localhost:3000/upload"
              accept="video/*"
              :limit="1"
              :before-upload="beforeUploadHandle"
              :file-list="videoFileList"
              :on-success="onSuccessHandle"
              :on-exceed="onExceedHandle"
              :on-remove="onRemoveHandle"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传视频文件</div>
            </el-upload>
          </el-form-item>
        </el-card>
          <div class="submit-btn">
                <el-button type="primary" round @click="submitChapter">保 存</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'ChapterAddUpdate',
    
    data() {
        return {
            // 课程
            course: {

            },
        chapter: {
          id: undefined,
          chapterName: undefined,
          description: undefined,
          sortNum: 1,
          courseId: undefined,
          uploadUrl: undefined,
        },
        videoFileList: [],
        rules: {
          chapterName: [
            { required: true, message: "章节名称不能为空", trigger: "blur" },
            { min: 2, max: 15, message: "长度为 2 到 15 个字符", trigger: "blur" },
          ],
        },
        };
    },
    methods: {
        // 单查数据回显课程
        getChapter(id) {
            this.$axios.get(`/chapters/${id}`).then(response => {
                
                this.chapter = response.data;
               this.$axios.get(`/courses/${this.chapter.courseId}`).then(response => {this.course = response.data});
                // 回显图片: 手动维护fileList,在数组中添加一个模拟的文件对象
                this.videoFileList.push({
                    // 文件对象属性: 文件名称name,文件路径url,response上传之后的响应数据
                    url: 'http://localhost:8080/' + this.chapter.uploadUrl,
                    name: this.chapter.uploadUrl,
                    response: {
                        msg: this.chapter.uploadUrl
                    }
                });
            });
        },
        // 提交课程信息
        submitChapter() {   
          let Id = this.chapter.courseId;
          let Name = this.course.courseName;
            this.$refs.form.validate(valid => {
                if (valid) {
                    if (this.chapter.id) {
                        this.$axios.patch(`/chapters/${this.chapter.id}`, this.chapter).then(response => {
                            // 提示用户
                            this.$message.success('编辑成功');
                            // 路由导航回列表页
                            this.$router.push({ name: "Chapter", params: { courseName: Name, courseId: Id } });
                        });
                    } else {
                        this.$axios.post('/chapters', this.chapter).then(response => {
                            // 提示用户
                            this.$message.success('新增成功');
                            // 路由导航回列表页
                            this.$router.push({ name: 'Chapter', params: { courseName,courseId }});
                        });
                    }
                }
            });
        },
        // 文件类型校验
        beforeUploadHandle(file) {
        const allowedTypes = ["video/mp4", "video/mpeg", "video/ogg", "video/webm"];
        if (allowedTypes.includes(file.type)) {
          return true;
        }
        this.$message.error("只能上传视频文件");
        return false;
      },
        // 上传之后处理
        onSuccessHandle(response) {
        this.chapter.uploadUrl = response.msg;
        this.$message.success("视频上传成功");
      },
        // 超出限制之后的处理
        onExceedHandle() {
        this.$message.warning("仅能上传一个视频");
      },
        // 文件删除之后的处理
        onRemoveHandle() {
            this.chapter.uploadUrl = undefined;
        },
    },
    mounted() {
        // 从路由中获取传递的课程ID
        this.chapter.id = this.$route.params.id

        // 判断id是否有值
        if (this.chapter.id) {
            // 有值就是编辑
            this.getChapter(this.chapter.id);
        }
    }
};
</script>

<style scoped>
.el-page-header {
    margin: 10px 0 30px;
}

.el-card {
    margin-bottom: 20px;
}

.el-select {
    display: block;
}

.el-input-number {
    width: 100%;
}

.el-date-editor.el-input {
    width: 100%;
}

.submit-btn {
    text-align: center;
}
</style>

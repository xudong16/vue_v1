<template>
    <div>
        <div>欢迎使用后台管理信息系统</div>
    </div>
</template>

<script>
export default {
    name: 'Welcome'
}
</script>

<style scoped>
div {
    background-image: url(~@/assets/welcome.jpg);
    background-size: cover;
    background-position: center; /* 新增代码 */
    height: 100vh;
    font: bold 100px "华文行楷";
    color: #000000;
    text-align: center;
    line-height: 200px;
}

</style>
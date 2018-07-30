<template>
    <div class="menu">
        <div class="log">
            <!-- <img :src="image" alt="" style="height: 50px"> -->
            尚洁科技logo
        </div>
        <div class="menu-list">
            <el-menu
                default-active="index"
                class="menu-list-el"
                text-color="#fff"
                :unique-opened="true"
                @select="select"
            >
                <el-submenu
                    class="sub"
                    v-for="menu in list"
                    :key="menu.id"
                    :index="menu.path"
                    v-if="menu.children.length > 0"
                >
                    <template slot="title">
                        <i :class="'el-icon ' + menu.icon"/>
                        <span>{{menu.name}}</span>
                    </template>
                    
                    <el-menu-item
                        v-for="submenu in menu.children"
                        :key="submenu.id"
                        :index="submenu.path"
                    >
                        <i :class="'el-icon ' + submenu.icon"/>
                        <span>{{submenu.name}}</span>
                    </el-menu-item>
                </el-submenu>
                <el-menu-item v-else :index="menu.path">
                    <i :class="'el-icon ' + menu.icon"/>
                    <span>{{menu.name}}</span>
                </el-menu-item>
            </el-menu>
        </div>
    </div>
</template>
<script>
    import list from './list';
    import Img from '~/static/images/logo.png'
    export default {
        data() {
            return {
                list: list,
                image:Img
            }
        },
        created() {
            this.getList();
        },
        methods: {
            // 获取导航列表
            getList() {
                // this.$api('get_menu');
            },
            // 选中事件,根据indexPath的路径匹配路由
            select(index, indexPath) {
                this.$router.push({ name: indexPath.join('-') });
            }
        }
    }
</script>
<style lang="less" scoped>
    .log {
        width: 100%;
        height: 50px;
        color: white;
        text-align:center;
        line-height: 50px;
    }
    .menu{
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 200px;
        background: #494f60;
        &-list{
            width: 100%;
            height: calc(100% - 62px);
            background-color: #494f60;
            position: relative;
            overflow: hidden;
            text-align: left;
            .menu-list-el{
                background-color: #494f60;
                border-right: none;
            }
            .el-submen:hover,
            .el-menu-item:hover{
                background: #67a4a5;
            }
        }
    }
    .home {
        background-image: url("~/static/images/home.png");
    }
</style>
<style lang="less">
    .el-submenu .el-menu,{
        background-color: #494f60;
    }
    .el-submenu__title:hover{
        background: #67a4a5;
    }
    .menu {
        .el-menu-item,
        .el-submenu__title {
            font-size: 12px;
            height: 40px;
            line-height: 40px;
        }
        .el-icon {
            width: 16px;
            height: 16px;
            margin-right: 8px;
        }
        .el-menu-item.is-active{
            background: #409eff;
            color: #fff;
        }
    }
    .el-icon {
        display: inline-block;
        width: 18px;
        height: 18px;
        background-size: cover;
        margin: 0 auto;
        &.home {
            background-image: url("./images/home.png");
        }
        &.resource {
            background-image: url("./images/resource.png");
        }
    }
    
</style>


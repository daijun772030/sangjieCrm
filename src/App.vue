<template>
    <router-view></router-view>
</template>

<script>
export default {
    data(){
        return {
            index : "login"
        }
    },
    created(){
        this.showPage();
    },
    methods : {
        async showPage(){
            // debugger;
            this.$api("typeFind",{id:'1'}).then(res => {
                if(res.data.retCode !== -200) this.index = "manager";
                this.$router.replace({ path: this.index });
            // const { token } = res;
            // localStorage.setItem('token', token);
            });
            this.$router.replace({ path : this.index });
        }
    }
}
</script>

<style lang="less" scoped>
    
</style>
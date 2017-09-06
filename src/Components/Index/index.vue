<template>
    <div class="container">
        <headCom />
        <Carouse />
        <NavList />
    </div>
</template>
<style lang="less">
</style>
<script>
    import headCom from './Header'
    import Carouse from './Carouse'
    import NavList from './NavList'
    export default {
        components:{
            headCom,Carouse,NavList
        }
    }
</script>
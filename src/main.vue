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
    import headCom from './Components/Header/index'
    import Carouse from './Components/Carouse'
    import NavList from './Components/NavList'
    export default {
        components:{
            headCom,Carouse,NavList
        }
    }
</script>
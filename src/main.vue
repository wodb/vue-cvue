<template>
    <div class="container">
        <headCom />
        <Carouse/>
    </div>
</template>
<style lang="less">
</style>
<script>
    import headCom from './Components/Header/index'
    import Carouse from './Components/carouse'
    export default {
        components:{
            headCom,Carouse
        }
    }
</script>
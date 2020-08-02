// 配置参数
require.config({
    // baseUrl:'lib',

    // 配置别名（虚拟路径）
    paths:{
        // 格式：别名:真实路径（基于baseUrl）
        jquery:'../js/jquery-3.2.1',
        common:'../js/common',
        lunbo:'../lib/lunbo',
        index:'../js/index',
        xiding:'../js/xiding',
        list:'../js/list',
        fdj:'../lib/magnifier',
        xiangqingye:'../js/xiangqingye',
        car:'../js/car',
        dl_zc:'../js/dl_zc'
    },

    // 配置依赖
    shim:{
        lunbo:['jquery'],
        index:['common','lunbo'],
        xiding:['jquery','common'],
        list:['common','jquery'],
        fdj:['jquery'],
        xiangqingye:['jquery','common'],
        car:['jquery','common'],
        dl_zc:['jquery','common']
    }
})
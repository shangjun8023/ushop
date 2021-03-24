// 使用其他文件方法，需要引入并解构
import {getGoodsList, goodsTotal} from '../../request/goods'

export default{
    // 命名空间
    namespaced: true,
    state(){
        return{
            // 存储商品列表数据
            goodsList:[],
            // 获取商品总数
            goodsTotal:0
        }
    },
    mutations:{
        // 初始化商品列表
        goodsInit(state,data){
            state.goodsList = data
        },
        // 修改商品总数
        setGoodsTotal(state,data){
            state.goodsTotal = data
        }
    },
    actions:{
        // 请求商品数据
        getGoodsListAction({commit,dispatch},params){
            // axios请求后台数据
            getGoodsList(params).then((res)=>{
                commit('goodsInit',res.list)
                dispatch('getGoodsTotalAction')
            })
        },
        // 请求商品 总数 数据
        getGoodsTotalAction({commit}){
            // axios请求后台数据
            goodsTotal().then((res)=>{
                commit('setGoodsTotal',res.list[0].total)
            })
        }
    }
}
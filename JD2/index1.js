Vue.filter('money',function(){
    return '￥'+(arguments[0]/100).toFixed(2)
})
let vm = new Vue({
    el:'#app',
    data:{
        tableData:[]
        // all:false
    },
    created(){
        this.getData()
    },
    methods:{
        getData(){
            axios.get('./data.json').then((data)=>{
                this.tableData=data.data
            }).catch({

            })
        },
        changeCount(item,e){
            let reg = /\D|^0/g
            item.count = (item.count+'').replace(reg,'')
        },
        del(index){
            this.tableData.splice(index,1)
        }
    },
    computed:{//计算属性 当依赖改变的时候才会触发它们执行
        totle(){
            return this.tableData.reduce((prev,next)=>{
                if(next.isSelect)
                {
                    return prev + next.price*next.count
                }
                else{
                    return prev
                }
            },0)
        },
        all:{
            get(){
                return this.tableData.every((item)=>{return item.isSelect})
            },
            set(val){
                this.tableData.forEach((item,index)=>{
                    item.isSelect = val;
                })
            }
        }
    }
})
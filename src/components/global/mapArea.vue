<template>
  <div id="all">
    <el-input type="text" id="suggestId" name="address_detail" placeholder="输入地址搜索" ref="inputBox" v-model="address_detail" style="margin-bottom: 30px"> </el-input>
    <div id="allmap"></div>
    <div class="box">
    <el-button type="primary" @click="save">保存</el-button>
    <el-button type="primary" @click="cancel">取消</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'mapArea',
    props: {
      xy: {
        default: {}
      }
    },
    data () {
      return {
        x: 112.94546987162249,
        y: 28.234890195551024,
        check: null,
        lng: null,
        lat: null,
        dialogVisible: true,
        address_detail: null, //详细地址
        userlocation: {lng: "", lat: ""},
        address: null
      }
    },
    methods: {
      cancel () {
        this.$emit('result', 'cancel')
      },
      save () {
        console.log(this.$refs.inputBox)
        let obj = {}
        if (!this.check) return this.$emit('result', 'cancel')
        if (this.check === 1) {
         obj = {
            lng: this.lng,
            lat: this.lat,
            address: this.address_detail
          }
        } else if (this.check === 2) {
          obj = {
            lng: this.lng,
            lat: this.lat,
            address: this.address
          }
        }
        this.$emit('result', obj)
        console.log(this.lng)
        console.log(this.lat)
        console.log(this.address)
        console.log(this.check)
      }
    },
    mounted(){
      console.log(this.xy)
      this.$nextTick(function () {

        var th = this
        // 创建Map实例
        var map = new BMap.Map("allmap");
        // 初始化地图,设置中心点坐标，
        var geoc = new BMap.Geocoder()
        var point = new BMap.Point(th.xy.lng|| th.x , th.xy.lat || th.y) // 创建点坐标，汉得公司的经纬度坐标
        if (th.xy.lng) {
          let maker = new BMap.Marker(th.xy)
          map.addOverlay(maker);
          maker.setAnimation(BMAP_ANIMATION_BOUNCE)
        }
        map.centerAndZoom(point, 15);
        map.enableScrollWheelZoom();
        var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
          {
            "input": "suggestId"
            , "location": map
          })
        var myValue
        ac.addEventListener("onconfirm", function (e) {    //鼠标点击下拉列表后的事件
          var _value = e.item.value;
          myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
          this.address_detail = myValue
          setPlace();
        });

        function setPlace() {
          map.clearOverlays();    //清除地图上所有覆盖物
          function myFun() {
            th.userlocation = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
            map.centerAndZoom(th.userlocation, 18);
            let maker = new BMap.Marker(th.userlocation)
            map.addOverlay(maker);    //添加标注
            maker.setAnimation(BMAP_ANIMATION_BOUNCE)
            th.lng = th.userlocation.lng
            th.lat = th.userlocation.lat
            th.address_detail = local.getResults().keyword
            console.log(th.address_detail)
            th.check = 1
          }
          var local = new BMap.LocalSearch(map, { // 智能搜索
            onSearchComplete: myFun
          });
          local.search(myValue);

          //测试输出坐标（指的是输入框最后确定地点的经纬度）
          map.addEventListener("click",function(e){
            console.log(0)
            console.log(e)
            //经度
             // th.lng = th.userlocation.lng
            //维度
            // th.lat = th.userlocation.lat

          })
        }//单击获取点击的经纬度
        map.addEventListener("click",function(e){
          map.clearOverlays()
          th.lng = e.point.lng
          th.lat = e.point.lat
          let maker = new BMap.Marker(e.point)
          var pt = e.point
          map.addOverlay(maker)
          maker.setAnimation(BMAP_ANIMATION_BOUNCE)
          geoc.getLocation(pt, function(rs){
            var addComp = rs.addressComponents;
            let res = addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber
            th.address = res
            th.check = 2
          })
        })
      })
    },
  }
</script>
<style scoped>
  .box {
    margin-top: 20px;
    text-align: center;
  }
  #allmap{
    width: 100%;
    height: 500px;
    font-family: "微软雅黑";
    border:1px solid green
  }
</style>

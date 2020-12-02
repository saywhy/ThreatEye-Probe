<template>
  <div class="home_overview"
       v-cloak>
    <div class="container">
      <!-- 第一排 -->
      <el-row class="container_bom  container_item"
              :gutter="10">
        <el-col :span="12">
          <div class="top_item">
            <div class="title">
              <p>
                <span class="title_left">系统状态监控</span>
              </p>
            </div>
            <div class="top_mid_content">
              <top-left :top_left="top_left"
                        v-if="top_left_show"></top-left>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="top_item">
            <div class="title">
              <p>
                <span class="title_left">协议统计</span>
              </p>
            </div>
            <div class="top_mid_content">
              <top-right :top_right="top_right"
                         v-if="top_right_show"></top-right>
            </div>
          </div>
        </el-col>
      </el-row>
      <!-- 第二排 -->
      <el-row class="container_bom  container_item"
              :gutter="10">
        <el-col :span="12">
          <div class="top_item">
            <div class="title">
              <p>
                <span class="title_left">流量监控</span>
                <span class="title_right">
                  <span class="title_right_icon color6"></span>
                  <span>流量(M/s)</span>
                </span>
              </p>
            </div>
            <div class="top_mid_content">
              <top-mid-flow :top_mid="top_mid"
                            v-if="top_mid_show"></top-mid-flow>
            </div>
          </div>
        </el-col>
        <el-col :span='12'>
          <div class="top_item">
            <div class="title">
              <p>
                <span class="title_left">文件监控</span>
                <span class="title_right">
                  <span class="title_right_icon color2"></span>
                  <span>文件(个/s)</span>
                </span>
              </p>
            </div>
            <div class="top_mid_content">
              <top-mid-file :top_mid="top_mid"
                            v-if="top_mid_show"></top-mid-file>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import topLeft from "./vm-home/top-left";


import topMidFlow from "./vm-home/top-mid-flow";
import topMidFile from "./vm-home/top-mid-file";
import topRight from "./vm-home/top-right";

import midLeft from "./vm-home/mid-left";
import midMid from "./vm-home/mid-mid";
import midRight from "./vm-home/mid-right";

import bomLeft from "./vm-home/bom-left";
import bomMid from "./vm-home/bom-mid";
import bomRight from "./vm-home/bom-right";

// import sysMonitor from "./vm-home/sys-monitor";
import imgUrl from "@/assets/images/home/common/img1.png"
import { eventBus } from '@/components/common/eventBus.js';
export default {
  name: "system_control_move",
  data () {
    return {
      top_left: {},
      top_left_show: false,

      top_mid: {},
      top_mid_show: false,

      top_right: {},
      top_right_show: false,
      ///////////

      mid_left: [],
      mid_left_show: false,

      mid_mid: [],
      mid_mid_show: false,

      mid_right: [],
      mid_right_show: false,

      ///////////
      bom_left: [],
      bom_left_show: false,

      bom_mid: [],
      bom_mid_show: false,

      bom_right: [],
      bom_right_show: false,
    };
  },
  created () {
    this.check_passwd();
    //第一排
    this.init_top_left()
    this.init_top_mid();
    this.init_top_right();
  },
  methods: {
    // 测试密码过期
    check_passwd () {
      this.$axios.get('/yiiapi/site/check-passwd-reset')
        .then((resp) => {
          let {
            status,
            msg,
            data
          } = resp.data;
          if (status == '602') {
            this.$message(
              {
                message: msg,
                type: 'warning',
              }
            );
            eventBus.$emit('reset')
          }
        })
    },
    //第一排（中）
    init_top_mid () {
      this.$axios.get('/yiiapi/alert/flow-file-statistics')
        .then((resp) => {
          // console.log(resp)
          this.top_mid = {};
          let {
            status,
            data
          } = resp.data;

          if (status == 0) {
            this.top_mid = data;
            this.top_mid_show = true;
          }
        })
    },
    //第一排（右）
    init_top_right () {
      this.$axios.get('/yiiapi/alert/protocol-flow-statistics')
        .then((resp) => {
          let {
            status,
            data
          } = resp.data;
          //console.log(data)
          if (status == 0) {
            this.top_right = data;
            this.top_right_show = true;
          }
        })
    },
    init_top_left () {
      this.$axios.get('/yiiapi/alert/dev-state', {
        params: {
          ip: '127.0.0.1'
        }
      })
        .then(response => {
          let {
            status,
            data
          } = response.data;
          this.top_left = data
          this.top_left_show = true
        })
        .catch(error => {
          console.log(error);
        })
    },
    flow () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("flow_echarts"));
      // 绘制图表
      myChart.setOption({
        grid: {
          top: "18%",
          left: '5%',
          right: "3%",
          bottom: "20%",
          containLabel: true
        },
        legend: {
          bottom: 5,
          left: 'center',
          orient: 'horizontal',
          textStyle: {
            fontSize: 12
          },
          selected: {
            // 选中'系列1'
            '流量': true,
          },
          data: ['流量']
        },
        tooltip: {
          trigger: "axis",
          borderColor: "rgba(187,120,247,0.3)",
          borderWidth: 2,
          backgroundColor: "#fff",
          textStyle: {
            color: "#ccc"
          },
          axisPointer: {
            lineStyle: {
              color: "#ccc"
            }
          }
        },
        color: ["rgba(187,120,247,0.9)"],
        xAxis: {
          boundaryGap: false,
          //网格样式
          splitLine: {
            show: true,
            lineStyle: {
              color: ["#F4F4F4"],
              width: 1,
              type: "solid"
            }
          },
          axisLine: {
            lineStyle: {
              color: "#ECECEC",
              width: 2
            }
          },
          axisLabel: {
            textStyle: {
              color: "#666666"
            }
          },
          axisTick: {
            show: false
          },
          data: this.equipment_detail.statistics_time
        },
        yAxis: [{
          name: '单位(Mbps)',
          nameTextStyle: {
            color: '#666'
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#F4F4F4",
              width: 1,
              type: "solid"
            }
          },
          axisLine: {
            lineStyle: {
              color: "#ECECEC",
              width: 2
            }
          },
          axisLabel: {
            textStyle: {
              color: "#666666"
            }
          },
          axisTick: {
            show: false
          }
        }],
        series: [
          {
            name: "流量",
            type: "line",
            symbol: "none",
            cursor: "pointer",
            smooth: true,
            data: this.equipment_detail.flow,
            lineStyle: {
              color: "rgba(187,120,247,0.9)"
            },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(187,120,247,0.3)" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(187,120,247,0.1)" // 100% 处的颜色
                  }
                ]
              }
            }
          }
        ]
      });
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    }
  },
  components: {
    topLeft,
    topMidFlow,
    topMidFile,
    topRight,

    midLeft,
    midMid,
    midRight,

    bomLeft,
    bomMid,
    bomRight,

    // sysMonitor
  },
};
</script>

<style scoped lang="less">
.home_overview {
  padding: 24px;
  .container {
    text-align: left;
    .container_item {
      .color1 {
        background: #f57c00;
      }
      .color2 {
        background: #0288d1;
      }
      .color3 {
        background: #47cad9;
      }
      .color4 {
        background: #dc5f5f;
      }
      .color5 {
        background: #cddc39;
      }
      .color6 {
        background: #4caf50;
      }
      .color7 {
        background: #47cad9;
      }
      .color8 {
        background: #e0c840;
      }
      margin-bottom: 10px;
      .top_item {
        background: #ffffff;
        height: 380px;
        border-radius: 4px;
        padding: 0 16px 20px 16px;
        .title {
          height: 60px;
          line-height: 60px;
          font-family: PingFangMedium;
          font-size: 18px;
          color: #333333;
          .title_left {
            float: left;
          }
          .title_right {
            float: right;
            font-size: 14px;
            color: #333333;
            .title_right_icon {
              margin-left: 12px;
              border-radius: 2px;
              height: 14px;
              width: 28px;
              vertical-align: unset;
              display: inline-block;
            }
          }
        }
        .legend {
          clear: both;
          height: 30px;
          text-align: left;
          font-size: 14px;
          .legend_icon {
            border-radius: 2px;
            height: 14px;
            width: 28px;
            vertical-align: middle;
            display: inline-block;
          }
          .legend_title {
            margin-right: 10px;
          }
        }
        // 第一个
        .top_left_content {
          height: 270px;
        }
        // 第二个
        .top_mid_content {
          height: 300px;
          .content_top {
            height: 150px;
          }
          .content_bom {
            height: 150px;
          }
          #cpu,
          #flow_echarts {
            height: 300px;
          }
        }
        .content_file {
          height: 270px;
        }
        // 第三个
        .top_right_content {
          height: 270px;
        }

        // 第四个
        .bom_left_content {
          height: 300px;
          .content_top {
            height: 300px;
          }
        }
        // 第五个
        .bom_mid_content {
          height: 270px;
        }
        // 第六个
        .bom_right_content {
          height: 300px;
        }
      }
    }
  }
}

.vm-move-threat {
  margin: 0;
  padding: 0 !important;
  /deep/ .common-table {
    width: 100%;
    font-family: PingFangMedium;
    /deep/ .el-table__header-wrapper {
      .el-table__header {
        thead.has-gutter {
          th {
            background: #f8f8f8;
            .cell {
              color: #333;
            }
          }
        }
      }
    }
  }
  /deep/ &.vm-move-threat-middle {
    .common-table {
      .el-table__header-wrapper {
        .el-table__header {
          th:nth-child(3) {
            /*.cell{
                          padding: 0!important;

                        }*/
          }
        }
      }
      .el-table__body-wrapper {
        .el-table__row {
          td:nth-child(3) {
            .cell {
              position: relative;
              height: 12px;
              .el-progress {
                .el-progress-bar {
                  vertical-align: super;
                  .el-progress-bar__outer {
                    height: 12px !important;
                    border-radius: 1px;
                    .el-progress-bar__inner {
                      border-radius: 1px;
                      background-color: #5389e0;
                    }
                  }
                }
              }
              /*.sc_index{
                            background: #5389E0;
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 40%;
                            height: 16px;
                          }*/
            }
          }
        }
      }
    }
  }
}
</style>

<style lang="less">
.home_overview {
  .sys_box {
    z-index: 9000 !important;
    .el-dialog {
      width: 842px;
      .el-dialog__header {
        display: none;
      }
      .el-dialog__body {
        width: 842px;
        height: 462px;
        padding: 30px;
        .closed_img {
          position: absolute;
          top: -18px;
          right: -18px;
          cursor: pointer;
          width: 46px;
          height: 46px;
        }
        .title {
          height: 24px;
          line-height: 24px;
          text-align: left;
          font-size: 0;
          .mask {
            width: 4px;
            height: 16px;
            display: inline-block;
            background: #0070ff;
            vertical-align: baseline;
          }
          .title_name {
            font-size: 16px;
            color: #333333;
            margin-left: 6px;
            display: inline-block;
            vertical-align: super;
            font-family: PingFangMedium;
          }
        }
        #graph {
          width: 100%;
          height: calc(100% - 24px);
          position: relative;
        }
      }
    }
  }
  .sys_detail {
    z-index: 99999 !important;
    .el-dialog {
      width: 840px;
      .el-dialog__header {
        display: none;
      }
      .el-dialog__body {
        width: 840px;
        padding: 30px;
        .closed_img {
          position: absolute;
          top: -18px;
          right: -18px;
          cursor: pointer;
          width: 46px;
          height: 46px;
        }
        .title {
          height: 24px;
          line-height: 24px;
          text-align: left;
          .title_name {
            font-size: 20px;
            color: #333333;
            line-height: 24px;
          }
          .mask {
            width: 24px;
            height: 0px;
            border-top: 0px;
            border-right: 2px solid transparent;
            border-bottom: 5px solid #0070ff;
            border-left: 2px solid transparent;
            transform: rotate3d(0, 0, 1, 90deg);
            display: inline-block;
            margin-right: -5px;
            margin-bottom: 4px;
            margin-left: -10px;
          }
        }
        .sys_detail_content {
          text-align: left;
          .detail_item {
            margin-top: 24px;
            p {
              font-size: 14px;
              color: #999999;
            }
          }
        }
      }
    }
  }
}
</style>

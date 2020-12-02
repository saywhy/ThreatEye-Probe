<template>
  <div id="sys"></div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "status",
  props: {
    top_left: {
      type: Array,
      default: () => { }
    }
  },
  data () {
    return {
      sys_state: [],
      equipment_detail: {
        show: false,
        cpu: [],
        mem: [],
        disk: [],
        statistics_time: [],
        flow: [],
      },
    }
  },
  created () {
    let data = this.top_left
    this.sys_state = data;
  },
  mounted () {
    this.sys();
  },
  methods: {
    sys () {
      console.log('11111');
      this.equipment_detail.cpu = []
      this.equipment_detail.mem = []
      this.equipment_detail.disk = []
      this.equipment_detail.statistics_time = []
      this.equipment_detail.flow = []
      this.sys_state.forEach(element => {
        this.equipment_detail.cpu.unshift(element.cpu)
        this.equipment_detail.mem.unshift(element.mem)
        this.equipment_detail.disk.unshift(element.disk)
        this.equipment_detail.statistics_time.unshift(element.statistics_time)
        this.equipment_detail.flow.unshift(element.flow)
      });
      console.log(this.sys_state);
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("sys"));
      // 绘制图表
      myChart.setOption({
        grid: {
          top: "15%",
          left: 20,
          right: "5%",
          bottom: "20%",
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          borderColor: "rgba(2,136,209,0.3)",
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
        legend: {
          bottom: 5,
          left: 'center',
          orient: 'horizontal',
          textStyle: {
            fontSize: 12
          },
          selected: {
            // 选中'系列1'
            'CPU': true,
            '内存': true,
            '硬盘': true,
          },
          data: ['CPU', '内存', '硬盘']
        },
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
          data: this.equipment_detail.statistics_time,
        },
        yAxis: [{
          name: '单位(%)',
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
        color: ["rgba(2,136,209,0.9)", "rgba(205,220,57,0.9)", "rgba(76,175,80,0.9)"],
        visualMap: [{
          show: false,
          type: 'piecewise',
          seriesIndex: 0,
          pieces: [{
            gt: 85,
            color: '#dc5f5f'
          }, {
            gt: 0,
            lte: 85,
            color: "rgba(2,136,209,0.9)"
          }]
        }, {
          show: false,
          type: 'piecewise',
          seriesIndex: 1,
          pieces: [{
            gt: 85,
            color: '#dc5f5f'
          }, {
            gt: 0,
            lte: 85,
            color: "rgba(205,220,57,0.9)"
          }]
        }, {
          show: false,
          type: 'piecewise',
          seriesIndex: 2,
          pieces: [{
            gt: 80,
            color: '#dc5f5f'
          }, {
            gt: 0,
            lte: 80,
            color: "rgba(76,175,80,0.9)"
          }]
        }],
        series: [
          {
            name: "CPU",
            type: "line",
            symbol: "none",
            cursor: "pointer",
            smooth: true,
            data: this.equipment_detail.cpu,
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
                    color: "rgba(2,136,209,0.3)" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(2,136,209,0.1)" // 100% 处的颜色
                  }
                ]
              }
            }
          },
          {
            name: "内存",
            type: "line",
            symbol: "none",
            cursor: "pointer",
            smooth: true,
            data: this.equipment_detail.mem,
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
                    color: "rgba(205,220,57,0.3)" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(205,220,57,0.1)" // 100% 处的颜色
                  }
                ]
              }
            }
          },
          {
            name: "硬盘",
            type: "line",
            symbol: "none",
            cursor: "pointer",
            smooth: true,
            data: this.equipment_detail.disk,
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
                    color: "rgba(76,175,80,0.3)" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(76,175,80,0.1)" // 100% 处的颜色
                  }
                ]
              }
            }
          },
        ]
      });
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    }
  }
};
</script>

<style scoped lang="less">
#sys {
  height: 100%;
}
</style>

<template>
  <div class="Risks">
    <transition name="slider">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "Risks",
  created () {
    this.check_passwd();
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
          if (status == '600') {
            this.$message(
              {
                message: msg,
                type: 'warning',
              }
            );
          }
        })
    }
  }
}
</script>

<style scoped>
.slider-enter {
  opacity: 0;
  transform: translateX(100px);
}
.slider-enter-active {
  transition: all 0.3s ease;
}
</style>

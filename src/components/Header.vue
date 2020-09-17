<template>
  <div class="avatar">
    <h1 class="avatar_name font-weight-bold">Hello, {{ name }}.</h1>
    <p class="avatar_tips">
      Looks like feel good.<br />You have
      <strong>{{ todayTasks.length }} tasks </strong> to do today.
    </p>
    <p class="avatar_date">TODAY : {{ today }}</p>
  </div>
</template>

<script>
import moment from "moment-mini";

export default {
  data() {
    return {
      today: moment(new Date()).format("dddd, D MMMM YYYY"),
    };
  },
  computed: {
    todayTasks() {
      return this.$store.state.categories[1].items;
    },

    name() {
      return this.$store.state.name;
    },
  },
};
</script>

<style lang="scss">
.avatar {
  display: flex;
  padding: 0 40px;
  height: 300px;
  justify-content: flex-end;
  flex-direction: column;
  transition: all 0.5s ease;
}

.avatar_name {
  margin-top: 32px;
  // color: #333;
  padding: 0 6px;
  font-size: 32px;
  letter-spacing: 1px;
  font-weight: 300;
}
.avatar_tips {
  margin-top: 16px;
  padding: 0 6px;
  font-size: 13px;
  font-weight: 100;
  opacity: 0.8;
  line-height: 1.6em;
}
.avatar_date {
  margin-top: 44px;
  margin-bottom: 16px;
  padding: 0 6px;
  font-size: 14px;
}
</style>

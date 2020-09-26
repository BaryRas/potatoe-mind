<template>
  <div class="avatar">
    <h1 class="avatar_name font-weight-bold">
      {{ $t("header.hello") }}, {{ name }}.
    </h1>
    <p class="avatar_tips">
      {{ $t("header.fellings") }}.<br />
      {{ $t("header.today-tasks")
      }}<strong>{{ todayTasks.length }} {{ $t("list-project.task") }} </strong>.
    </p>
    <p class="avatar_date">
      {{ $t("header.calendar") }} :
      {{ $d(new Date(), "short", `${dateLocale}`) }}
    </p>
  </div>
</template>

<script>
import moment from "moment-mini";
import i18n from "../i18n";

export default {
  computed: {
    todayTasks() {
      return this.$store.state.categories[1].items;
    },

    dateLocale() {
      return i18n.locale == "en" ? "en-US" : "fr-FR";
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

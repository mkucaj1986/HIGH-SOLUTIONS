<template>
    <div class="e-notification-controls e-center-block">
        <el-col :span="4">
            <el-checkbox v-model="inputChecked">{{ $t("user.notification-select-all")}}</el-checkbox>
        </el-col>
        <el-col :span="3">
            <confirm-popover v-if="inputChecked" @confirm-click="deleteAllNotifications()"></confirm-popover>
        </el-col>
    </div>
</template>
<script>
import ConfirmPopover from 'components/common/ConfirmPopover';

export default {
  props: ['selectAll'],
  components: {
    ConfirmPopover
  },
  computed: {
    deleteAllCtrl: {
      get: function () {
        return this.deleteAll;
      },
      set: function (value) {
        this.deleteAll = value;
      }
    },
    inputChecked: {
      get: function () {
        return this.selectAll;
      },
      set: function () {
        this.$emit('change-input');
      }
    }
  },
  methods: {
    deleteAllNotifications () {
      this.$emit('delete-all-notifications');
    }
  }
};
</script>

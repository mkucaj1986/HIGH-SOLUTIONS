<template>
    <div>
        <notification-controls
            :select-all="selectAllChecked"
            @delete-all-notifications="deleteAllUserNotify"
            @change-input="toggleSelection(userProfil.notifiCations)"
        ></notification-controls>
        <el-table
            ref="singleTable"
            :data="userProfil.notifiCations"
            border
            style="width: 100%;"
            @selection-change="handleSelectionChange"
        >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column type="index" width="100"></el-table-column>
            <el-table-column :label="$t('table.message')" width="700">
                <template slot-scope="scope">
                    <accordion
                        :accordion-header="scope.row.type"
                        :accordion-items-list="scope.row.notifyData.order"
                        :accordion-heading="scope.$index"
                    ></accordion>
                </template>
            </el-table-column>
            <el-table-column :formatter="dataFormatter" :label="$t('table.date')" width="100"></el-table-column>
            <el-table-column property="delete" :label="$t('table.remove')" width="140">
                <template slot-scope="scope">
                    <confirm-popover @confirm-click="deleteNotification(scope.row._id)" :scope-data="scope"></confirm-popover>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import Accordion from 'components/common/Accordion';
import UserNotifications from 'components/user/UserNotifications';
import { mapGetters, mapActions } from 'vuex';
import ConfirmPopover from 'components/common/ConfirmPopover';
import NotificationControls from 'components/user/NotificationControls';

export default {
  data () {
    return {
      selectAllChecked: false,
      multipleSelection: []
    };
  },
  components: {
    Accordion,
    ConfirmPopover,
    NotificationControls,
    UserNotifications
  },
  computed: {
    ...mapGetters(['userProfil'])
  },
  methods: {
    ...mapActions([
      'deleteUserNotification',
      'deleteAllNotifications',
      'getNotifications'
    ]),
    dataFormatter (row, column) {
      if (row.notifyData.orderDate) {
        return this.$moment(row.notifyData.orderDate).format('Do MMM YY');
      }
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.singleTable.toggleAllSelection(row);
          this.selectAllChecked = true;
        });
      } else {
        this.$refs.singleTable.clearSelection();
        this.selectAllChecked = false;
      }
    },
    handleSelectionChange (val) {
      const rows = this.userProfil.notifiCations.length;
      const currentRows = val.length;
      this.multipleSelection = val;
      if (currentRows < rows) {
        this.selectAllChecked = false;
      } else {
        this.selectAllChecked = true;
      }
    },
    async deleteAllUserNotify () {
      const action = await this.deleteAllNotifications();
      this.$clientRes(action);
      if (action.data.success) {
        await this.getNotifications();
      }
    },
    async deleteNotification (id) {
      const action = await this.deleteUserNotification(id);
      this.$clientRes(action);
      if (action.data.success) {
        await this.getNotifications();
      }
    }
  }
};
</script>

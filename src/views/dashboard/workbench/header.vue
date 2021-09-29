<template>
  <div class="workbench-header">
    <div class="des">
      <img class="avatar" src="@/assets/images/avatar.jpg" alt="avatar" />
      <div class="info">
        <div class="hello">
          早安, {{ userName }} {{ roles.toString() }}, 开始您一天的工作吧！
        </div>
        <div class="weather">今日晴，20℃ - 32℃！</div>
      </div>
    </div>
    <el-space wrap :size="50">
      <div class="upcoming">
        <div class="title">待办</div>
        <div class="num">2/10</div>
      </div>
      <div class="project">
        <div class="title">项目</div>
        <div class="num">3</div>
      </div>
      <div class="team">
        <div class="title">团队</div>
        <div class="num">400</div>
      </div>
    </el-space>
  </div>
</template>

<script>
import { useUser } from "@/hooks/user";
import { firstLetterToUpperCase } from "@/utils/utils";
export default {
  setup() {
    const { userName, roles } = useUser();

    return {
      userName: firstLetterToUpperCase(userName.value),
      roles,
    };
  },
};
</script>

<style lang="scss" scoped>
.workbench-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 88px;
  background-color: #fff;
  padding: 16px;
  .des {
    display: flex;
    flex-direction: row;
    align-items: center;
    .avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
    .info {
      padding-left: 10px;
      .hello {
        font-size: 22px;
        color: #333;
        line-height: 36px;
      }
      .weather {
        font-size: 16px;
        color: #666;
      }
    }
  }
  .upcoming,
  .project,
  .team {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    .title {
      font-size: 16px;
      color: #666;
    }
    .num {
      font-size: 22px;
      color: #333;
    }
  }
}
</style>
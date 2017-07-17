<template>
  <div>
    <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1">
        <router-link to="/">主页</router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link v-show="!user.name" to="/login">登录</router-link>
        <el-dropdown @command="loginOut">
          <span :style="{color:'#FFF'}" v-show="user.name">
            {{user.name}}
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command>登出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-menu-item>
    </el-menu>
    <el-card class="box-card">
      <p> Hello {{user.name}}</p>
    </el-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      activeIndex: '1',
      user: {
        name: ''
      }
    }
  },
  beforeCreate() {
    this.$http.get('/api')
      .then((res) => {
        console.log(res);
        if(res.data.error) {
          this.$message.error(res.data.error);
          this.user.name = null;
          return false;
        } else {
          let user = localStorage.getItem('user');
          if(user) {
            this.user.name = user;
          }
        } 
      })
      .catch((err) => {
        this.$message.error(`${err.message}`);
      })
  },
  methods: {
    ...mapActions(['userLoginOut']),
    loginOut(){
      this.userLoginOut();
      this.user.name = null;
      this.$http.get('/api/user')
        .then((res) => {
          if(res.data.message) {
            this.$message.success(res.data.message);
            return false;
          }
        })
        .catch((err) => {
          this.$message.error(`${err.message}`);
        })
    }
  }
}
</script>

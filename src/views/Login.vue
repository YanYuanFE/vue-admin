<template>
  <el-card class="box-card">
    <el-row type="flex" justify="center">
      <el-col :span="12">
        <el-form
          label-position="left"
          label-width="80px"
          :model="formLogin"
          :rules="rules"
          ref="formLogin">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="formLogin.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="formLogin.password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPassword">
            <el-input v-model="formLogin.checkPassword"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
            <el-button @click="resetForm">取消</el-button>            
          </el-form-item>
          <el-form-item>
            <router-link to="/register">
              <el-button>没有帐号，立即注册<i class="el-icon-arrow-right el-icon--right"></i></el-button>
            </router-link>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data(){
    let checkUserName = (rule,value,cb) => {
      if(!value) {
        return cb(new Error('账户不能为空!'));
      } else {
        cb();
      }
    }
    let checkPassword = (rule,value,cb) => {
      if(!value) {
        return cb(new Error('密码不能为空！'));
      } else {
        cb();
      }
    }
    let checkPasswordAgain = (rule,vlaue,cb) => {
      if(!value) {
        return cb(new Error('再次输入密码不能为空！'));
      } else if(value !== this.formLogin.password) {
        return cb(new Error('再次输入密码不一致!'));
      } else {
        cb();
      }
    }
    return{
      formLogin: {
        name: '',
        password: '',
        checkPassword: '',
      },
      rules:{
        name:[
          {validator:checkUserName,trigger: 'blur'}
        ],
        password:[
          {validator:checkPassword,trigger: 'blur'}
        ],
        checkPassword:[
          {validator:checkPasswordAgain,trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    login() {
      let user = this.formLogin;
      let formData = {
        name: user.name,
        password: user.password
      };

      this.$refs['formLogin'].validate((valid) => {
        if(valid) {
          this.$http.post('/api/login', formData)
            .then((res) => {
              console.dir(res);
              if(res.data.success) {
                this.userLogin(res.data);
                this.$message.success(`${res.data.message}`)
                this.$router.push('/');
              } else {
                this.$message.error(`${res.data.message}`);
                return false;
              }
            })
            .catch((err) => {
              this.$message.error(`${err.message}`, 'ERROR');
            })
        } else {
          this.$message.error('表单验证失败!');
          return false;
        }
      });

    },
    resetForm(){
      this.$refs['formLogin'].resetFields();
    }
  }
  
}
</script>

<template>
  <el-card class="box-card">
    <el-row type="flex" justify="center">
      <el-col :span="12">
        <el-form
          label-position="left"
          label-width="80px"
          :model="formRegister"
          :rules="rules"
          ref="formRegister">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="formRegister.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="formRegister.password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="password">
            <el-input v-model="formRegister.checkPassword"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="register">立即注册</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data() {
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
      formRegister: {
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
  methods:{
    register(){
      let user = this.formRegister;
      let formData = {
        name: user.name,
        password: user.password,
      };

      this.$refs['formRegister'].validate((valid) => {
        if(valid) {
          this.$http.post('/api/register', formData)
          .then((res) => {
            if(res.data.error) {
              this.$message.error(res.data.error);
              return false;
            } else {
              this.$message.success('注册成功');
              this.$router.push('/login');
            }
          })
          .catch((err) => {
            this.$message.error(`${err.message}`);
          })
        } else  {
          this.$message.error('表单验证失败');
          return false;
        }
      })

    }
  }
}
</script>


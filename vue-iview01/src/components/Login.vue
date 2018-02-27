<template>
  <div id="login">
    <div class="bk-box">
      <div class="login-box">
        <div class="form-box">
          <Form ref="formInline" :model="formInline" :rules="ruleInline" >
              <FormItem prop="user">
                  <Input type="text" v-model="formInline.user" placeholder="用户名" size="large">
                      <Icon type="ios-person-outline" slot="prepend"></Icon>
                  </Input>
              </FormItem>
              <FormItem prop="password">
                  <Input type="password" v-model="formInline.password" placeholder="密码" size="large">
                      <Icon type="ios-locked-outline" slot="prepend"></Icon>
                  </Input>
              </FormItem>
              <FormItem>
                  <Button type="primary" @click="handleSubmit('formInline')" size="large" style="width:100%">登 录</Button>
              </FormItem>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
      return {
          formInline: {
              user: '',
              password: ''
          },
          ruleInline: {
              user: [
                  { required: true, message: '请填写用户名', trigger: 'blur' }
              ],
              password: [
                  { required: true, message: '请填写密码', trigger: 'blur' },
                  { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
              ]
          }
      }
  },
  methods: {
      handleSubmit(name) {
          /*this.$refs[name].validate((valid) => {
              if (valid) {
                  this.$Message.success('登录成功!');
                  this.$router.push({ path: '/carControl' });
              } else {
                  this.$Message.error('登录失败!');
              }
          })*/
          if("admin"===this.formInline.user&&"123456"===this.formInline.password){
              this.$Message.success('登录成功!');
              this.$router.push({ path: '/dataQuery' });
          } else {
              this.$Message.error('登录失败!');
          }
      }
  }
}
</script>

<style scoped>
  .bk-box{
    position:fixed;
    top: 0;
    left: 0;
    width:100%;
    height:100%;
    background-image: linear-gradient(143deg,#2945cb 20%,#2b83f9 81%,#3a9dff);
  }
  .login-box{
    margin: 250px auto;
    width: 325px;
    height: 250px;
    background-color: rgba(255,255,255,0.85);
    border-radius: 5px;
  }
  .form-box{
    padding-top:47px;
    margin: 0 auto;
    width: 250px;
  }
</style>
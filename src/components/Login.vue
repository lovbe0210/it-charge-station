<template>
  <b-container class="container-fluid">
    <div class="row">
      <!-- IMAGE CONTAINER BEGIN -->
      <div class="col-lg-6 col-md-6 d-none d-md-block infinity-image-container"></div>
      <!-- IMAGE CONTAINER END -->

      <!-- FORM CONTAINER BEGIN -->
      <div class="col-lg-6 col-md-6 infinity-form-container">
        <div class="col-lg-9 col-md-12 col-sm-8 col-xs-12 infinity-form">
          <!-- Company Logo -->
          <div class="text-center mb-3 mt-5">
            <img src="@/assets/logo.png" width="150px">
          </div>
          <div class="text-center mb-4">
            <h5>及时充电，才能走得更远</h5>
          </div>
          <!-- Form -->
          <form class="px-3">
            <!-- Input Box -->
            <div class="form-input">
              <span><i class="fa fa-envelope"></i></span>
              <input type="email" name="" placeholder="手机/邮箱" tabindex="10" required>
            </div>
            <div class="form-input">
              <span><i class="fa fa-lock"></i></span>
              <input type="password" name="" placeholder="密码" required>
            </div>
            <div class="row mb-3">
              <!--Remember Checkbox -->
              <div class="col-auto d-flex align-items-center">
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input" id="cb1">
                  <label class="custom-control-label" for="cb1">Remember me</label>
                </div>
              </div>
            </div>

            <!-- Login Button -->
            <div class="mb-3">
              <button type="submit" class="btn btn-block">Login</button>
            </div>
            <!-- Forget Password -->
            <div class="text-right">
              <a href="reset.html" class="forget-link">忘记密码</a>
            </div>

            <div class="text-center mb-5" style="color: #777;">
              <a class="register-link" href="register.html">注册账号</a>
            </div>
          </form>
        </div>
        <!-- FORM END -->
      </div>
      <!-- FORM CONTAINER END -->
    </div>
  </b-container>
</template>

<script>
  export default {
    name: 'LoginOrRegist',
    data () {
      return {}
    }
  }
</script>

<style scoped lang="less">
  @import "./css/login-registe.less";
  /*@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&display=swap");*/
</style>

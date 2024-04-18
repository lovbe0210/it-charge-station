<template>
  <div class="fullscreen-wrapper">
    <b-container>
      <div class="form-box" ref="formBox">
        <!--        <b-row class="logo">-->
        <!--          <b-link to="/">-->
        <!--            <span class="iconfont icon-logo"></span>-->
        <!--          </b-link>-->
        <!--        </b-row>-->
        <b-row :class="['login-box', hidden ? 'hidden' : '']">
          <Tabs :animated="false">
            <TabPane label="密码登录">
              <Form :model="formdata" :rules="ruleValidate">
                <FormItem prop="username">
                  <Input type="text" size="large" placeholder="请输入用户名" v-model="formdata.username"
                         ref="inputWrapp1"></Input>
                </FormItem>
                <FormItem prop="passwd">
                  <Input type="password" size="large" placeholder="请输入密码" v-model="formdata.passwd"
                         ref="inputWrapp2"></Input>
                </FormItem>
                <FormItem>
                  <Button type="success" size="large" style="width: 300px;margin-top: 6px;" @click="loginSubmit(1)">登陆
                  </Button>
                </FormItem>
              </Form>
            </TabPane>
            <TabPane label="免密登陆">
              <Form :model="formdata" :rules="ruleValidate">
                <FormItem prop="phoneNum">
                  <Input type="text" style="width: 300px" size="large" placeholder="请输入手机号码" v-model="formdata.phoneNum"
                         ref="inputWrapp3"></Input>
                </FormItem>
                <FormItem prop="verifyCode">
                  <Row>
                    <Col>
                      <Input type="text" style="width: 135px;" size="large" placeholder="6位短信验证码"
                             v-model="formdata.verifyCode" ref="inputWrapp4"></Input>
                    </Col>
                    <Col offset="4">
                      <Button size="large" @click="getVerifyCode">获取验证码</Button>
                    </Col>
                  </Row>
                </FormItem>
                <FormItem class="login-btn">
                  <Button type="success" size="large" style="width: 300px;" @click="loginSubmit(0)">登陆</Button>
                </FormItem>
              </Form>
            </TabPane>
            <b-row class="login-foot">
              <div class="aggregate-login">
                <span class="iconfont icon-qq"></span>
                <span class="iconfont icon-wechat"></span>
                <span class="iconfont icon-github"></span>
              </div>
              <div class="forget">
                <b-link>
                  忘记密码
                </b-link>
                <b-link>
                  无法验证
                </b-link>
              </div>
            </b-row>
          </Tabs>
        </b-row>
        <b-row :class="['register-box', hidden ? '' : 'hidden']">
          <Form :model="formdata" :rules="ruleValidate">
            <FormItem>
              <div class="quick-register">快速注册</div>
            </FormItem>
            <FormItem prop="registerFlag">
              <Input type="text" size="large" style="width: 300px;box-shadow: none;" placeholder="手机号/用户名"
                     v-model="formdata.registerFlag" required ref="inputWrapp5"></Input>
            </FormItem>
            <FormItem prop="passwd">
              <Input type="password" size="large" style="width: 300px" placeholder="请输入密码" v-model="formdata.passwd"
                     ref="inputWrapp6"></Input>
            </FormItem>
            <FormItem prop="confirmPasswd">
              <Input type="password" size="large" style="width: 300px" placeholder="请确认密码"
                     v-model="formdata.confirmPasswd" ref="inputWrapp7"></Input>
            </FormItem>
            <FormItem>
              <Button type="success" size="large" style="width: 300px;" @click="registerSubmit">注册</Button>
            </FormItem>
          </Form>
        </b-row>
      </div>
      <div :class="['con-box', 'left', hidden ? 'hidden' : '']">
        <div class="logo-title">欢迎来到it充电站</div>
        <div class="blessL">——工作不息，充电不止</div>
        <div class="btn-foot">
          <span>没有账号？</span>
          <button @click="toRegister">快速注册</button>
        </div>
      </div>
      <div :class="['con-box', 'right', hidden ? '' : 'hidden']">
        <div class="logo-title">欢迎来到it充电站</div>
        <div class="blessR">——永远电量满满，永远激情澎湃</div>
        <div class="btn-foot">
          <span>已有账号？</span>
          <button @click="toLogin">去登录</button>
        </div>
      </div>


      <ul data-v-60554c86="">
        <li data-v-60554c86="" class="item selected"><span          >中国</span> <span >                     +86</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">中国澳门</span> <span data-v-60554c86="">+853</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">中国台湾</span> <span data-v-60554c86="">+886</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">中国香港</span> <span data-v-60554c86="">+852</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">阿尔巴尼亚</span> <span data-v-60554c86="">+355</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">阿尔及利亚</span> <span data-v-60554c86="">+213</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">阿富汗</span> <span data-v-60554c86="">   +93</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">阿根廷</span> <span data-v-60554c86="">   +54</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">阿拉伯联合酋长国</span> <span          >   +971</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">阿鲁巴岛</span> <span data-v-60554c86=""> +297</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">阿曼</span> <span data-v-60554c86="">     +968</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">阿塞拜疆</span> <span data-v-60554c86=""> +994</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">阿森松</span> <span data-v-60554c86="">   +247</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">埃及</span> <span data-v-60554c86=""     >+20</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">埃塞俄比亚</span> <span data-v-60554c86="">+251</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">爱尔兰</span> <span data-v-60554c86="">   +353</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">爱沙尼亚</span> <span data-v-60554c86=""> +372</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">安道尔</span> <span data-v-60554c86="">   +376</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">安哥拉</span> <span data-v-60554c86="">   +244</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">安圭拉</span> <span data-v-60554c86="">   +1264</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">安提瓜和巴布达</span> <span               >+1268</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">奥地利</span> <span data-v-60554c86="">   +43</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">奥兰群岛</span> <span data-v-60554c86=""> +358</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">澳大利亚</span> <span data-v-60554c86=""> +61</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">巴巴多斯</span> <span data-v-60554c86=""> +1246</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">巴哈马</span> <span data-v-60554c86="">   +1242</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">巴基斯坦</span> <span data-v-60554c86=""> +92</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">巴拉圭</span> <span data-v-60554c86="">  +595</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">巴勒斯坦</span> <span data-v-60554c86="">+970</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">巴林</span> <span data-v-60554c86="">   +973</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">巴拿马</span> <span data-v-60554c86=""> +507</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">巴西</span> <span data-v-60554c86="">   +55</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">白俄罗斯</span> <span                  >+375</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">百慕大</span> <span data-v-60554c86="">+1441</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">保加利亚</span> <span                 >+359</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">北马里亚纳群岛</span> <span            >+1670</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">贝宁</span> <span data-v-60554c86="">  +229</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">比利时</span> <span data-v-60554c86="">+32</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">冰岛</span> <span data-v-60554c86="">+354</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">波多黎各</span> <span data-v-60554c86="">+1787</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">波黑</span> <span data-v-60554c86="">+387</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">波兰</span> <span data-v-60554c86="">+48</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">玻利维亚</span> <span data-v-60554c86="">+591</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">伯利兹</span> <span data-v-60554c86="">+501</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">博茨瓦纳</span> <span data-v-60554c86="">+267</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">不丹</span> <span data-v-60554c86="">+975</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">布基拉法索</span> <span data-v-60554c86="">+226</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">布隆迪</span> <span data-v-60554c86="">+257</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">朝鲜</span> <span data-v-60554c86="">+850</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">赤道几内亚</span> <span data-v-60554c86="">+240</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">丹麦</span> <span data-v-60554c86="">+45</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">德国</span> <span data-v-60554c86="">+49</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">多哥</span> <span data-v-60554c86="">+228</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">多米尼加共和国</span> <span         >+1809</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">多米尼克</span> <span data-v-60554c86="">+1767</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">俄罗斯</span> <span data-v-60554c86="">+7</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">厄瓜多尔</span> <span data-v-60554c86="">+593</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">厄立特里亚</span> <span data-v-60554c86="">+291</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">法国</span> <span data-v-60554c86="">+33</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">法罗群岛</span> <span data-v-60554c86="">+298</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">法属波利尼西亚</span> <span data-v-60554c86="">+689</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">法属圭亚那</span> <span data-v-60554c86="">+594</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">梵蒂冈</span> <span data-v-60554c86="">+379</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">菲律宾</span> <span data-v-60554c86="">+63</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">斐济</span> <span data-v-60554c86="">+679</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">芬兰</span> <span data-v-60554c86="">+358</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">佛得角</span> <span data-v-60554c86="">+238</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">冈比亚</span> <span data-v-60554c86="">+220</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">刚果</span> <span data-v-60554c86="">+242</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">刚果民主共和国</span> <span data-v-60554c86="">+243</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">哥伦比亚</span> <span data-v-60554c86="">+57</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">哥斯达黎加</span> <span data-v-60554c86="">+506</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">格林纳达</span> <span data-v-60554c86="">+1473</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">格陵兰岛</span> <span data-v-60554c86="">+299</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">格鲁吉亚</span> <span data-v-60554c86="">+995</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">瓜德罗普</span> <span data-v-60554c86="">+590</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">关岛</span> <span data-v-60554c86="">+1671</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">圭亚那</span> <span data-v-60554c86="">+592</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">海地</span> <span data-v-60554c86="">+509</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">韩国</span> <span data-v-60554c86="">+82</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">荷兰</span> <span data-v-60554c86="">+31</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">荷属安的列斯</span> <span data-v-60554c86="">+599</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">洪都拉斯</span> <span data-v-60554c86="">+504</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">吉布提</span> <span data-v-60554c86="">+253</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">加拿大</span> <span data-v-60554c86="">+1</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">吉尔吉斯斯坦</span> <span data-v-60554c86="">+996</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">几内亚</span> <span data-v-60554c86="">+224</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">加那利群岛</span> <span data-v-60554c86="">+3491</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">加纳</span> <span data-v-60554c86="">+233</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">加蓬</span> <span data-v-60554c86="">+241</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">柬埔寨</span> <span data-v-60554c86="">+855</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">捷克</span> <span data-v-60554c86="">+420</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">喀麦隆</span> <span data-v-60554c86="">+237</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">卡塔尔</span> <span data-v-60554c86="">+974</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">开曼群岛</span> <span data-v-60554c86="">+1345</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">科摩罗</span> <span data-v-60554c86="">+269</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">科索沃</span> <span data-v-60554c86="">+883</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">科特迪瓦</span> <span data-v-60554c86="">+225</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">科威特</span> <span data-v-60554c86="">+965</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">克罗地亚</span> <span data-v-60554c86="">+385</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">肯尼亚</span> <span data-v-60554c86="">+254</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">拉脱维亚</span> <span data-v-60554c86="">+371</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">莱索托</span> <span data-v-60554c86="">+266</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">老挝</span> <span data-v-60554c86="">+856</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">黎巴嫩</span> <span data-v-60554c86="">+961</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">立陶宛</span> <span data-v-60554c86="">+370</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">利比里亚</span> <span data-v-60554c86="">+231</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">利比亚</span> <span data-v-60554c86="">+218</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">列支敦士登</span> <span data-v-60554c86="">+423</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">留尼旺岛</span> <span data-v-60554c86="">+262</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">卢森堡</span> <span data-v-60554c86="">+352</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">卢旺达</span> <span data-v-60554c86="">+250</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">罗马尼亚</span> <span data-v-60554c86="">+40</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">马达加斯加</span> <span data-v-60554c86="">+261</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">马尔代夫</span> <span data-v-60554c86="">+960</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">马耳他</span> <span data-v-60554c86="">+356</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">马拉维</span> <span data-v-60554c86="">+265</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">马来西亚</span> <span data-v-60554c86="">+60</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">马里</span> <span data-v-60554c86="">+223</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">马其顿</span> <span data-v-60554c86="">+389</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">马绍尔群岛</span> <span data-v-60554c86="">+692</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">马提尼克</span> <span data-v-60554c86="">+596</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">马约特</span> <span data-v-60554c86="">+262</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">毛里求斯</span> <span data-v-60554c86="">+230</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">毛里塔尼亚</span> <span data-v-60554c86="">+222</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">美国</span> <span data-v-60554c86="">+1</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">美属萨摩亚</span> <span data-v-60554c86="">+1684</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">美属维尔京群岛</span> <span
          data-v-60554c86="">+1340</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">蒙古</span> <span data-v-60554c86="">+976</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">蒙塞拉特岛</span> <span data-v-60554c86="">+1664</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">蒙特內哥羅</span> <span data-v-60554c86="">+382</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">孟加拉国</span> <span data-v-60554c86="">+880</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">秘鲁</span> <span data-v-60554c86="">+51</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">密克罗尼西亚联邦</span> <span
          data-v-60554c86="">+691</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">缅甸</span> <span data-v-60554c86="">+95</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">摩尔多瓦</span> <span data-v-60554c86="">+373</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">摩洛哥</span> <span data-v-60554c86="">+212</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">摩纳哥</span> <span data-v-60554c86="">+377</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">莫桑比克</span> <span data-v-60554c86="">+258</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">墨西哥</span> <span data-v-60554c86="">+52</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">纳米比亚</span> <span data-v-60554c86="">+264</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">南非</span> <span data-v-60554c86="">+27</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">尼泊尔</span> <span data-v-60554c86="">+977</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">尼加拉瓜</span> <span data-v-60554c86="">+505</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">尼日尔</span> <span data-v-60554c86="">+227</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">尼日利亚</span> <span data-v-60554c86="">+234</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">挪威</span> <span data-v-60554c86="">+47</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">帕劳</span> <span data-v-60554c86="">+680</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">葡萄牙</span> <span data-v-60554c86="">+351</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">千里达及托巴哥</span> <span
          data-v-60554c86="">+1868</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">日本</span> <span data-v-60554c86="">+81</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">瑞典</span> <span data-v-60554c86="">+46</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">瑞士</span> <span data-v-60554c86="">+41</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">圣诞岛</span> <span data-v-60554c86="">+61</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">圣基茨和尼维斯</span> <span
          data-v-60554c86="">+1869</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">圣卢西亚</span> <span data-v-60554c86="">+1758</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">圣马力诺</span> <span data-v-60554c86="">+223</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">圣马力诺</span> <span data-v-60554c86="">+378</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">圣皮埃尔和密克隆群岛</span> <span
          data-v-60554c86="">+508</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">圣文森特和格林纳丁斯</span> <span
          data-v-60554c86="">+1784</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">斯里兰卡</span> <span data-v-60554c86="">+94</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">斯洛伐克</span> <span data-v-60554c86="">+421</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">斯洛文尼亚</span> <span data-v-60554c86="">+386</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">斯威士兰</span> <span data-v-60554c86="">+268</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">苏丹</span> <span data-v-60554c86="">+249</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">苏里南</span> <span data-v-60554c86="">+597</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">索马里</span> <span data-v-60554c86="">+252</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">塔吉克斯坦</span> <span data-v-60554c86="">+992</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">沙特阿拉伯</span> <span data-v-60554c86="">+966</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">塞舌尔</span> <span data-v-60554c86="">+248</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">塞浦路斯</span> <span data-v-60554c86="">+357</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">塞内加尔</span> <span data-v-60554c86="">+221</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">塞拉利昂</span> <span data-v-60554c86="">+232</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">塞尔维亚</span> <span data-v-60554c86="">+381</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">萨尔瓦多</span> <span data-v-60554c86="">+503</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">萨尔瓦多</span> <span data-v-60554c86="">+503</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">汤加</span> <span data-v-60554c86="">+676</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">坦桑尼亚</span> <span data-v-60554c86="">+255</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">泰国</span> <span data-v-60554c86="">+66</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">特克斯和凯科斯群岛</span> <span >+1649</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">突尼斯</span> <span data-v-60554c86="">+216</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">图瓦卢</span> <span data-v-60554c86="">+688</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">土耳其</span> <span data-v-60554c86="">+90</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">土库曼斯坦</span> <span data-v-60554c86="">+993</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">乌兹别克斯坦</span> <span data-v-60554c86="">+998</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">乌拉圭</span> <span data-v-60554c86="">+598</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">乌克兰</span> <span data-v-60554c86="">+380</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">乌干达</span> <span data-v-60554c86="">+256</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">文莱</span> <span data-v-60554c86="">+673</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">委内瑞拉</span> <span data-v-60554c86="">+58</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">危地马拉</span> <span data-v-60554c86="">+502</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">叙利亚</span> <span data-v-60554c86="">+963</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">匈牙利</span> <span data-v-60554c86="">+36</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">新西兰</span> <span data-v-60554c86="">+64</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">新喀里多尼亚</span> <span data-v-60554c86="">+687</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">新加坡</span> <span data-v-60554c86="">+65</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">希腊</span> <span data-v-60554c86="">+30</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">西萨摩亚</span> <span data-v-60554c86="">+685</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">西撒哈拉</span> <span data-v-60554c86="">+212</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">西班牙</span> <span data-v-60554c86="">+34</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">越南</span> <span data-v-60554c86="">+84</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">约旦</span> <span data-v-60554c86="">+962</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">英属维尔京群岛</span> <span >+1284</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">英国</span> <span data-v-60554c86="">+44</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">印度尼西亚</span> <span data-v-60554c86="">+62</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">印度</span> <span data-v-60554c86="">+91</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">意大利</span> <span data-v-60554c86="">+39</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">以色列</span> <span data-v-60554c86="">+972</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">伊朗</span> <span data-v-60554c86="">+98</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">伊拉克</span> <span data-v-60554c86="">+964</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">也门</span> <span data-v-60554c86="">+967</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">亚美尼亚</span> <span data-v-60554c86="">+374</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">牙买加</span> <span data-v-60554c86="">+1876</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">中非</span> <span data-v-60554c86="">+236</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">智利</span> <span data-v-60554c86="">+56</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">直布罗陀</span> <span data-v-60554c86="">+350</span>
        </li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">乍得</span> <span data-v-60554c86="">+235</span></li>
        <li data-v-60554c86="" class="item"><span data-v-60554c86="">赞比亚</span> <span data-v-60554c86="">+260</span>
        </li>
      </ul>


    </b-container>
  </div>
</template>

<script>
  export default {
    name: 'LoginOrRegister',
    data() {
      return {
        hidden: false,
        formdata: {
          username: '',
          passwd: '',
          confirmPasswd: '',
          // 手机号登陆
          phoneNum: '',
          // 短信验证码
          verifyCode: '',
          // 注册标识，可能为手机号也可能为邮箱，也可能为其他用户名
          registerFlag: ''
        },
        // 验证规则
        ruleValidate: {
          username: [
            {
              required: true,
              pattern: /^[a-zA-Z0-9]{4,16}$/,
              message: ' ',
              trigger: 'change'
            }
          ],
          passwd: [
            {
              required: true,
              message: ' ',
              trigger: 'change'
            }
          ],
          phoneNum: [
            {
              required: true,
              message: ' ',
              trigger: 'change',
              pattern:
                /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
            }
          ],
          verifyCode: [
            {
              required: true,
              message: ' ',
              trigger: 'change'
            }
          ],
          interest: [
            {
              required: true,
              type: 'array',
              min: 1,
              message: 'Choose at least one hobby',
              trigger: 'change'
            },
            {
              type: 'array',
              max: 2,
              message: 'Choose two hobbies at best',
              trigger: 'change'
            }
          ],
          date: [
            {
              required: true,
              type: 'date',
              message: 'Please select the date',
              trigger: 'change'
            }
          ],
          time: [
            {
              required: true,
              type: 'string',
              message: 'Please select time',
              trigger: 'change'
            }
          ],
          desc: [
            {
              required: true,
              message: 'Please enter a personal introduction',
              trigger: 'blur'
            },
            {
              type: 'string',
              min: 20,
              message: 'Introduce no less than 20 words',
              trigger: 'blur'
            }
          ]
        }
      }
    },
    methods: {
      toLogin() {
        this.hidden = false
        this.$refs.formBox.style.setProperty('--translateX', 'translateX(0)')
      },
      toRegister() {
        this.hidden = true
        this.$refs.formBox.style.setProperty('--translateX', 'translateX(-110%)')
      },
      loginSubmit(flag) {
        if (flag) {
          this.$Message.success('用户名登陆成功!')
        } else {
          this.$Message.success('手机号登陆成功!')
        }
        // 保存token到store中
        let userInfo = {
          token: 'FKDMDK34D34DFGDFG45DE32DGH4G61AS',
          uid: 0,
          username: '张三'
        }

        // 延时跳转首页
        this.$store.commit('login', userInfo)
        setTimeout(() => {
          this.$router.replace('/')
        }, 1000)

      },
      registerSubmit() {
        this.$Message.success('注册成功!')
      },
      getVerifyCode() {
        this.$Message.success('验证码发送成功!')
      }
    },
    mounted() {
      // 去掉input输入框focus下的阴影
      let elArray = this.$refs
      for (let key in elArray) {
        if (key.indexOf('inputWrapp') !== -1) {
          elArray[key].$el.children[1].style.setProperty('box-shadow', 'none')
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import '../components/css/common-var.less';
  @import '../components/css/login-register.less';
</style>

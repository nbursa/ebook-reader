<template>
  <v-app toolbar>
    <v-dialog v-model="info" fullscreen @click.native.stop="info = !info">
      <v-card class="infoDialog">
        <div class="menuIns">
          <v-icon dark>ion-ios-more</v-icon>
        </div>
        <div class="menuInsTip"> <br>
          <strong>Chapters</strong><br>
          <small>Opens left navigation menu where you can skip book chapters</small>
        </div>
        <div class="socMenu">
          <v-icon dark>ion-social-linkedin</v-icon>
          <v-icon dark>ion-social-facebook</v-icon>
          <v-icon dark>ion-social-twitter</v-icon>
          <v-icon dark>ion-social-tumblr</v-icon>
          <v-icon dark>ion-social-pinterest</v-icon>
        </div>
        <div class="socMenuMob">
          <v-icon>ion-android-share-alt</v-icon>
        </div>
        <div class="socMenuTip"> <br>
          <strong>Social share buttons</strong><br>
          <small>Share book on your favorite social network</small>
        </div>
        <div class="resize-settings">
          <v-icon>ion-ios-gear-outline</v-icon>
        </div>
        <div class="resize-settings-tip"> <br>
          <strong>Settings button</strong><br>
          <small>Change visual settings</small>
        </div>
        <!-- <div class="info-button">
          <v-icon dark>ion-ios-information-outline</v-icon>
        </div>
        <div class="info-button-tip"> <br>
          <strong>Info button</strong><br>
          <small>Open/Close informational screen</small>
        </div> -->
        <div class="left-button">
          <v-icon dark>ion-ios-arrow-left</v-icon>
        </div>
        <div class="left-button-tip"> <br>
          <strong>Left/Previous</strong><br>
          <small>Navigate previous page or chapter in book view.<br>On touch screen swipe right.</small>
        </div>
        <div class="right-button">
          <v-icon dark>ion-ios-arrow-right</v-icon>
        </div>
        <div class="right-button-tip"> <br>
          <strong>Right/Next</strong><br>
          <small>Navigate next page or chapter in book view.<br>On touch screen swipe left.</small>
        </div>
        <div class="buy-buttons">
          <img src="/static/img/MB.svg"><br>
          <img src="/static/img/amazon.svg">
          <!-- {{#purchaseURLs}}
          <img src="{{literal}}">
          {{/purchaseURLs}} -->
        </div>
        <div class="buy-buttons-mob">
          <v-icon>ion-bag</v-icon>
        </div>
        <div class="buy-buttons-tip"> <br>
          <strong>Buy links</strong><br>
          <small>Choose an online store to buy this book</small>
        </div>
        <div class="headline">Instructions</div>
        <v-btn flat class="closeDialog" @click.native.stop="info = false" :ripple="false">Close</v-btn>
      </v-card>
    </v-dialog>
    <v-navigation-drawer class="menu" temporary hide-overlay @click.native.stop="drawer = !drawer" clipped v-model="drawer" enable-resize-watcher disable-route-watcher touchless>
      <v-list>
        <v-list-tile v-for="item in items" v-bind:href="item.path" :key="item.name" :to="item.path" exact :ripple="false" width="100%">
          <v-list-tile-action>
            <img height="55px" :src="item.image">
          </v-list-tile-action>
          <v-list-tile-content>
            <!-- {{=<% %>=}} -->
            <v-list-tile-title active>{{ item.name }}</v-list-tile-title>
            <!-- <%={{ }}=%> -->
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-navigation-drawer class="settings-drawer" temporary hide-overlay @click.native.stop="drawerRight = !drawerRight" clipped v-model="drawerRight" right enable-resize-watcher touchless>
      <v-list>
        <settings></settings>
      </v-list>
    </v-navigation-drawer>
    <v-navigation-drawer class="mini-bar" v-model="buyBar" mini-variant enable-resize-watcher touchless>
      <v-list :ripple="false">Shop:
        <v-list-tile v-for="buy in buys" v-bind:href="buy.url" :key="buy.title" target="_blank">
          <img :src="buy.img">
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar class="main-menu" fixed persistent>
      <v-btn flat class="main-menu-button" @click.native.stop="drawer = !drawer, info = false, buyMenu = false, socialMenu = false, drawerRight = false" :ripple="false">
        <v-icon>ion-ios-more-outline</v-icon>
      </v-btn>
      <v-toolbar class="desktop-social-btn" style="margin-left:5%">
        <v-btn flat v-for="social in socials" :key="social.title" v-bind:href="social.url" target="_blank" :ripple="false">
          <v-icon>{{ social.icon }}</v-icon>
        </v-btn>
      </v-toolbar>
      <v-btn flat class="mobile-buy-btn" @click.native.stop="buyMenu = !buyMenu, info = false, drawer = false, socialMenu = false, drawerRight = false">
        <v-icon>ion-bag</v-icon>
      </v-btn>
      <v-navigation-drawer class="buy-menu" width="100vw" height="auto" hide-overlay temporary clipped v-model="buyMenu" @click.stop="buyMenu = !buyMenu" disable-route-watcher touchless>
        <v-list>
          <span>Purchace this book: </span>
            <v-list-tile v-for="buy in buys" :key="buy.title" v-bind:href="buy.url" target="_blank">
            <v-list-tile-action>
              <img :src="buy.img">
            </v-list-tile-action>
            <v-list-tile-title v-text="buy.title"></v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-btn flat class="mobile-social-btn" @click.native.stop="socialMenu = !socialMenu, info = false, buyMenu = false, drawer = false, drawerRight = false">
        <v-icon>ion-android-share-alt</v-icon>
        <!-- <v-icon style="font-weight: 100 !important">ion-ios-share</v-icon> -->
      </v-btn>
      <v-navigation-drawer class="social-menu" width="100vw" height="auto" hide-overlay temporary clipped v-model="socialMenu" @click.stop="socialMenu = !socialMenu" disable-route-watcher persistent touchless>
      <v-list>
          <span>Share this book: </span>
          <v-list-tile v-for="social in socials" :key="social.title" v-bind:href="social.url" target="_blank">
            <v-list-tile-action>
              <img :src="social.img">
            </v-list-tile-action>
            <v-list-tile-title v-text="social.title"></v-list-tile-title>
          </v-list-tile>
        </v-list>
        </v-navigation-drawer>
      <v-spacer></v-spacer>
      <v-btn flat class="info-btn" @click.native.stop="info = !info, drawer = false, buyMenu = false, socialMenu = false, drawerRight = false" :ripple="false">
        <v-icon>ion-ios-information-outline</v-icon>
      </v-btn>
      <v-btn flat class="settings-button" @click.native.stop="drawerRight = !drawerRight, info = false, buyMenu = false, socialMenu = false, drawer = false" :ripple="false">
        <v-icon>ion-ios-gear-outline</v-icon>
      </v-btn>
    </v-toolbar>
    <v-container fluid>

      <reader></reader>

    <!-- <v-card class="pager">

      <span class="badge">{{pageNumber}}</span>
    </v-card>
    <v-card class="pager2">

      <span class="badge">{{totalPages}}</span>
    </v-card> -->

    </v-container>
  </v-app>
</template>

<script>
import Reader from "./components/Reader.vue";
import Settings from "./components/Settings.vue";
import eventHub from "./event-hub.js";

export default {
  props: {
    pageNum: {
      type: Number,
      default: 0
    },
    ttlPages: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      pageNumber: this.pageNum,
      totalPages: this.ttlPages,
      info: false,
      buyBar: true,
      buyMenu: false,
      socialMenu: false,
      focused: false,
      dialogBuy: false,
      dialogShare: false,
      notifications: false,
      sound: true,
      widgets: false,
      show: false,
      iSize: 50,
      selectBook: "Books",
      home: this.$route.path,
      drawer: false,
      drawerRight: false,
      items: [],
      socials: [
        // {{#templateData.linkedinSocialMessageToggle}}
        {
          title: "LinkedIn",
          img: "static/img/linkedin-logo.svg",
          url:
            "http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Ftextcafe.com&title=PWA%20Reader&summary=PWA%20book%20reader&source=https%3A%2F%2Ftextcafe.com",
          icon: "ion-social-linkedin"
        },
        // {{/templateData.linkedinSocialMessageToggle}}
        // {{#templateData.facebookSocialMessageToggle}}
        {
          title: "Facebook",
          img: "static/img/facebook-logo.svg",
          url:
            "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Ftextcafe.com&t=PWA%20Reader",
          icon: "ion-social-facebook"
        },
        // {{/templateData.facebookSocialMessageToggle}}
        // {{#templateData.twitterSocialMessageToggle}}
        {
          title: "Twitter",
          img: "static/img/twitter-logo-silhouette.svg",
          url:
            "https://twitter.com/intent/tweet?source=https%3A%2F%2Ftextcafe.com&text=PWA%20Reader:%20https%3A%2F%2Ftextcafe.com",
          icon: "ion-social-twitter"
        },
        // {{/templateData.twitterSocialMessageToggle}}
        // {{#templateData.tumblrSocialMessageToggle}}
        {
          title: "Tumblr",
          img: "static/img/tumblr-letter-logo.svg",
          url:
            "http://www.tumblr.com/share?v=3&u=https%3A%2F%2Ftextcafe.com&t=PWA%20Reader&s=",
          icon: "ion-social-tumblr"
        },
        // {{/templateData.tumblrSocialMessageToggle}}
        // {{#templateData.pinterestSocialMessageToggle}}
        {
          title: "Pinterest",
          img: "static/img/pinterest-logo.svg",
          url:
            "http://pinterest.com/pin/create/button/?url=https%3A%2F%2Ftextcafe.com&description=PWA%20book%20reader",
          icon: "ion-social-pinterest"
        }
        // {{/templateData.pinterestSocialMessageToggle}}
      ],
      buys: [
        // {{#purchaseURLs}}
        // { title: '', img: '{{faviconLink}}', url: '{{literal}}' },
        // {{/purchaseURLs}}
        {
          title: "MB",
          img: "static/img/MB.svg",
          url:
            "https://mascotbooks.com/mascot-marketplace/buy-books/nonfiction/crapload/"
        },
        {
          title: "Amazon",
          img: "static/img/amazon.svg",
          url:
            "https://www.amazon.com/How-Sell-Crapload-Books-Marketing/dp/1631777432?ie=UTF8&*Version*=1&*entries*=0"
        }
      ],
      right: null,
      left: null
    };
  },
  created: function() {
    this.$router.options.routes.forEach(route => {
      this.items.push({
        path: route.path,
        name: route.name,
        component: route.component,
        image: "static/img/ilG6Mf.jpg"
        // image: '{{coverImageURL}}'
      });
    });
    eventHub.$on("pageNum", newValue => {
      this.pageNum = newValue;
      // console.log(newValue)
    });
    eventHub.$on("ttlPages", newValue => {
      this.ttlPages = newValue;
      // console.log(newValue)
    });
  },
  watch: {
    $route(to, from) {
      if (to.path === "/") {
        this.home = this.$route.path;
      } else {
        this.home = null;
      }
    },
    iSize: newValue => {
      eventHub.$emit("iSizeChanged", newValue);
    }
  },
  methods: {
    resetScroll() {
      var page = this.$el.querySelector(".book-page");
      page.scrollLeft = 0;
    },
    onBlur() {
      if (this.show === true) {
        this.show = false;
        this.$emit("blur");
      }
    },
    onFocus() {
      if (this.show === false) {
        this.show = true;
        this.$el.querySelector(".book-page").$emit("focus");
      }
    }
  },
  components: {
    settings: Settings,
    reader: Reader
  }
};
</script>

<style lang="stylus">
@import '../node_modules/vuetify/src/stylus/main';
</style>

<style lang="sass" src="../static/style.sass"></style>

<style lang="sass">

.pager
  position: absolute
  left: 50%
  top: 0
  padding: 7px 10px 7px 20px
  z-index: 20 !important
  transform: translate(-100%, 0)
  background-color: #f3f3f3 !important
  box-shadow: none
  font-size: 12px
  @media screen and (max-width:768px)
    top: auto
    left: 0
    bottom: 0
    transform: translate(0)
  span.badge
    // color: #4BACB8
    color: #f3f3f3
    font-size: 18px
    text-align: center !important
    padding: 0 10px
    &:after
      // display: none
      content: ''
      width: 35px
      height: 30px
      background-color: transparentize(#4BACB8, .5)
      z-index: -1
      left: 2px
      top: -4px
      border-radius: 2px
.pager2
  position: absolute
  left: 50%
  top: 0
  padding: 7px 20px 7px 10px
  z-index: 20 !important
  background-color: #f3f3f3 !important
  box-shadow: none
  font-size: 12px
  @media screen and (max-width:768px)
    top: auto
    left: auto
    right: 0
    bottom: 0
    transform: translate(0)
  span.badge
    // color: #4BACB8
    color: #f3f3f3
    font-size: 18px
    text-align: center !important
    padding: 0 10px
    &:after
      // display: none
      content: ''
      width: 35px
      height: 30px
      background-color: transparentize(#4BACB8, .5)
      z-index: -1
      left: 2px
      top: -4px
      border-radius: 2px
</style>


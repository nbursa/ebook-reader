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
          <v-icon>ion-ios-gear</v-icon>
        </div>
        <div class="resize-settings-tip"> <br>
          <strong>Settings button</strong><br>
          <small>Change visual settings</small>
        </div>
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
        <!-- <div class="buy-buttons" v-for="buy in buys" :key="buy.title"> -->
        <div class="buy-buttons">
          <v-icon dark>ion-bag</v-icon>
          <!-- <img src="/static/img/MB.svg"><br>
          <img src="/static/img/amazon.svg"> -->
          <!-- <a v-bind:href="buy.url">
            <img :src="buy.img" alt="">
          </a> -->
          <!-- {{#purchaseURLs}}
          <a v-bind:href="buy.url">
            <img :src="buy.img" alt="">
          </a>
          {{/purchaseURLs}} -->
        </div>
        <div class="buy-buttons-mob">
          <v-icon>ion-bag</v-icon>
        </div>
        <div class="buy-buttons-tip"> <br>
          <strong>Buy links</strong><br>
          <small>Choose an online store to purchase this book</small>
        </div>
        <div class="headline">Instructions</div>
        <v-btn flat class="closeDialog" @click.native.stop="info = false" :ripple="false">Close</v-btn>
      </v-card>
    </v-dialog>
    <v-navigation-drawer class="menu" temporary hide-overlay @click.native.stop="drawer = !drawer" clipped v-model="drawer" enable-resize-watcher disable-route-watcher touchless>
      <v-list>
        <v-list-tile v-for="item in items" v-bind:href="item.path" :key="item.name" :to="item.path" exact :ripple="false" width="100%" @click="this.progress===0, this.pageNumber===1, getTtlPages()">
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

    <v-navigation-drawer class="otherBooks" temporary hide-overlay @click.native.stop="otherBooks = !otherBooks" clipped v-model="otherBooks" enable-resize-watcher disable-route-watcher touchless>
      <v-list>
        <h6>Other books you might like:</h6>
        <v-list-tile v-for="book in books" v-bind:href="book.url" :key="book.title" target="_blank" :ripple="false" width="100%">
          <v-list-tile-action>
            <img :src="book.img">
          </v-list-tile-action>
          <v-list-tile-content>
            <!-- {{=<% %>=}} -->
            <v-list-tile-title active>{{ book.title }}</v-list-tile-title>
            <!-- <%={{ }}=%> -->
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer class="settings-drawer" temporary hide-overlay clipped v-model="drawerRight" right enable-resize-watcher touchless>
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
      <div class="HC" v-if="this.HC === true">
        <v-btn flat class="HC-button" @click.native.stop="drawer = false, info = false, buyMenu = false, socialMenu = false, drawerRight = false, otherBooks = false" :ripple="false" tag="a" href="https://www.harpercollins.com/" target="_blank">
          <i><img src="static/img/harpercollinslogo-580x358.png"></i>
        </v-btn>
      </div>

      <v-btn flat class="main-menu-button" @click.native.stop="drawer = !drawer, info = false, buyMenu = false, socialMenu = false, drawerRight = false, otherBooks = false" :ripple="false">
        <v-icon>ion-ios-more-outline</v-icon>
      </v-btn>

      <v-btn v-if="books.length > 0" flat class="otherBooks-button" @click.native.stop="otherBooks = !otherBooks, info = false, buyMenu = false, socialMenu = false, drawerRight = false, drawer = false" :ripple="false" >
        <v-icon>ion-ios-browsers-outline</v-icon>
      </v-btn>
      
      <v-toolbar class="desktop-social-btn" style="margin-left:5%">
        <v-btn flat v-for="social in socials" :key="social.title" v-bind:href="social.url" target="_blank" :ripple="false">
          <v-icon>{{ social.icon }}</v-icon>
        </v-btn>
      </v-toolbar>
      <v-btn flat class="mobile-buy-btn" @click.native.stop="buyMenu = !buyMenu, info = false, drawer = false, socialMenu = false, drawerRight = false, otherBooks = false">
        <v-icon>ion-bag</v-icon>
      </v-btn>
      <v-navigation-drawer class="buy-menu" width="100vw" height="auto" hide-overlay temporary clipped v-model="buyMenu" @click.stop="buyMenu = !buyMenu" disable-route-watcher touchless>
        <v-list>
          <span>Purchase this book: </span>
            <v-list-tile v-for="buy in buys" :key="buy.title" v-bind:href="buy.url" target="_blank">
            <v-list-tile-action>
              <img :src="buy.img">
            </v-list-tile-action>
            <v-list-tile-title v-html="buy.title"></v-list-tile-title>
            <!-- <v-list-tile-title v-text="buy.title"></v-list-tile-title> -->
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-btn flat class="mobile-social-btn" @click.native.stop="socialMenu = !socialMenu, info = false, buyMenu = false, drawer = false, drawerRight = false, otherBooks = false">
        <v-icon>ion-android-share-alt</v-icon>
      </v-btn>
      <v-navigation-drawer class="social-menu" width="100vw" height="auto" hide-overlay temporary clipped v-model="socialMenu" @click.stop="socialMenu = !socialMenu" disable-route-watcher persistent touchless>
      <v-list>
          <span>Share this book: </span>
          <v-list-tile v-for="social in socials" :key="social.title" v-bind:href="social.url" target="_blank">
            <v-list-tile-action>
              <img :src="social.img">
            </v-list-tile-action>
            <v-list-tile-title v-html="social.title"></v-list-tile-title>
          </v-list-tile>
        </v-list>
        </v-navigation-drawer>

      <!-- <v-spacer></v-spacer> -->

      <!-- <div v-if="this.HC === true">
        <v-btn flat class="HC-button" @click.native.stop="drawer = false, info = false, buyMenu = false, socialMenu = false, drawerRight = false, otherBooks = false" :ripple="false">
          <i><img src="static/img/harpercollinslogo-580x358.png"></i>
        </v-btn>
      </div> -->

      <!-- <v-spacer></v-spacer> -->

      <v-btn flat class="info-btn" @click.native.stop="info = !info, drawer = false, buyMenu = false, socialMenu = false, drawerRight = false" :ripple="false">
        <v-icon>ion-ios-information-outline</v-icon>
      </v-btn>
      <v-btn flat class="settings-button" @click.native.stop="drawerRight = !drawerRight, info = false, buyMenu = false, socialMenu = false, drawer = false, otherBooks = false" :ripple="false">
        <v-icon>ion-ios-gear-outline</v-icon>
      </v-btn>
    </v-toolbar>
    <v-container fluid>
      <reader></reader>
    </v-container>
  </v-app>
</template>

<script>
import Reader from "./components/Reader.vue";
import Settings from "./components/Settings.vue";
import eventHub from "./event-hub.js";

export default {
  data() {
    return {
      pageNum: 0,
      pageNumber: 1,
      ttlPages: 0,
      totalPages: 0,
      progress: 0,
      info: false,
      buyBar: true,
      buyMenu: false,
      socialMenu: false,
      otherBooks: false,
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
      books: [
        // {{#templateData.similarBooks}}
        {
          title: "Testbook",
          img: "static/img/Books.jpg",
          url:
            "https://www.amazon.com/How-Sell-Crapload-Books-Marketing/dp/1631777432?ie=UTF8&*Version*=1&*entries*=0"
        },
        {
          title:
            "How to Sell a Crapload of Books & How to Sell a Crapload of Books",
          img: "static/img/ilG6Mf.jpg",
          url:
            "https://www.amazon.com/How-Sell-Crapload-Books-Marketing/dp/1631777432?ie=UTF8&*Version*=1&*entries*=0"
        },
        {
          title: "How to Sell a Crapload of Books",
          img: "static/img/ilG6Mf.jpg",
          url:
            "https://www.amazon.com/How-Sell-Crapload-Books-Marketing/dp/1631777432?ie=UTF8&*Version*=1&*entries*=0"
        },
        {
          title: "How to Sell a Crapload of Books",
          img: "static/img/ilG6Mf.jpg",
          url:
            "https://www.amazon.com/How-Sell-Crapload-Books-Marketing/dp/1631777432?ie=UTF8&*Version*=1&*entries*=0"
        },
        {
          title: "How to Sell a Crapload of Books",
          img: "static/img/amazon.svg",
          url:
            "https://www.amazon.com/How-Sell-Crapload-Books-Marketing/dp/1631777432?ie=UTF8&*Version*=1&*entries*=0"
        },
        {
          title: "How to Sell a Crapload of Books",
          img: "static/img/ilG6Mf.jpg",
          url:
            "https://www.amazon.com/How-Sell-Crapload-Books-Marketing/dp/1631777432?ie=UTF8&*Version*=1&*entries*=0"
        }
        // {{/templateData.similarBooks}}
      ],
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
      left: null,
      HC: false
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
    eventHub.$on("ttlPages", newValue => {
      this.ttlPages = newValue;
    });
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
    color: #f3f3f3
    font-size: 18px
    text-align: center !important
    padding: 0 10px
    &:after
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
    color: #f3f3f3
    font-size: 18px
    text-align: center !important
    padding: 0 10px
    &:after
      content: ''
      width: 35px
      height: 30px
      background-color: transparentize(#4BACB8, .5)
      z-index: -1
      left: 2px
      top: -4px
      border-radius: 2px
</style>


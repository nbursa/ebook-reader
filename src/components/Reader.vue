<template>
  <div class="wrap" :style="{ 'filter': 'brightness(' + brightness + '%)'}">
    <v-progress-linear v-model="progress"></v-progress-linear>
    <v-btn :style="{width: (100 - widthSize) + '%'}" class="nav-btn left" @click.stop="prev" v-shortkey="['arrowleft']" @shortkey="prev" :ripple="false">
      <v-icon :style="{'right': (widthSize * 7) + 'px'}">ion-ios-arrow-left</v-icon>
    </v-btn>
    <v-btn :style="{width: (100 - widthSize) * 2 + '%'}" class="nav-btn right" @click.stop="next" v-shortkey="['arrowright']" @shortkey="next" :ripple="false">
      <v-icon :style="{'right': (widthSize * 7) + 'px'}">ion-ios-arrow-right</v-icon>
    </v-btn>
    <div class="book-content" :style="{'width': widthSize + '%', 'background-color': currentColor}"  @mouseenter="over" @mouseleave="out">
      <v-touch :class="{active: hiddenEl}" class="touch-swipe" @swipeleft="next" @swiperight="prev" @tap="tapped"></v-touch>
      <div class="book-page" :class="fontFamily" :style="{ 'font-size': fontSize + 'px', 'columns': cols }" :key="div" enable-resize-watcher @tap="tappedIn" @swipe="tappedIn" @click="tappedIn">
          <transition :name="routeTransition" mode="out-in">
            <router-view class="view"></router-view>
          </transition>
      </div>
    </div>
  </div>
</template>

<script>
import eventHub from "../event-hub.js";
import Settings from "../components/Settings";

var SLIDE_TIME = document.documentElement.clientWidth > 480 ? 500 : 300;

export default {
  name: "reader",
  props: {
    value1: {
      type: Number,
      default: 22
    },
    selected: {
      type: String
    },
    ex8: {
      type: String,
      default: "Auto"
    },
    value2: {
      type: Number
    },
    value3: {
      type: Number,
      default: 100
    }
  },
  data() {
    return {
      pageNum: 0,
      ttlPages: 0,
      home: false,
      div: 0,
      prevX: null,
      xDownEnd: null,
      fontSize: this.value1,
      fontFamily: this.selected,
      columns: this.ex8,
      widthSize: this.value2,
      brightness: this.value3,
      currentColor: "#f3f3f3",
      cols: "2 220px",
      position: { scrollTop: 0, scrollLeft: 0 },
      // offset: null,
      // isOver: false,
      // routeNames: [
      //   "home",
      //     {{#routes}}
      //     {{#visible}}
      //   "{{name}}",
      //     {{/visible}}
      //     {{/routes}},
      //   "last"
      // ],
      routeNames: [],
      routeTransition: "slide-left",
      rest: true,
      selectedView: "Book1",
      progress: 0,
      hiddenEl: false
    };
  },
  created: function() {
    if(document.documentElement.offsetWidth >= 768) {
      this.hiddenEl = true;
    } else {
      this.hiddenEl = false;
    }

    document.addEventListener("mousewheel", this.onScroll, false);

    this.$router.options.routes.forEach(route => {
      this.routeNames.push(route.name);
    });
    eventHub.$on("fontSizeChanged", newValue => {
      this.fontSize = newValue;
    });
    eventHub.$on("fontFamilyChanged", newValue => {
      this.fontFamily = newValue;
    });
    eventHub.$on("columnsCountChanged", newValue => {
      this.columns = newValue;
      if (this.columns === "Single") {
        this.cols = "1 auto";
      } else if (this.columns === "Auto") {
        this.cols = "2 220px";
      }
    });
    eventHub.$on("widthChanged", newValue => {
      this.widthSize = newValue;
    });
    eventHub.$on("brightnessChanged", newValue => {
      this.brightness = newValue;
    });

    (function() {
      var throttle = function(type, name, obj) {
        obj = obj || window;
        var running = false;
        var func = function() {
          if (running) {
            return;
          }
          running = true;
          requestAnimationFrame(function() {
            obj.dispatchEvent(new CustomEvent(name));
            running = false;
          });
        };
        obj.addEventListener(type, func);
      };
      throttle("resize", "optimizedResize");
    })();

    // handle event
    window.addEventListener("optimizedResize", function() {
      // console.log("Resource conscious resize callback!");
    });

    var optimizedResize = (function() {
      var callbacks = [],
        running = false;
      function resize() {
        if (!running) {
          running = true;
          if (window.requestAnimationFrame) {
            window.requestAnimationFrame(runCallbacks);
          } else {
            setTimeout(runCallbacks, 66);
          }
        }
      }
      function runCallbacks() {
        callbacks.forEach(function(callback) {
          callback();
        });
        running = false;
      }
      function addCallback(callback) {
        if (callback) {
          callbacks.push(callback);
        }
      }
      return {
        add: function(callback) {
          if (!callbacks.length) {
            window.addEventListener("resize", resize);
          }
          addCallback(callback);
        }
      };
    })();

    // start process
    optimizedResize.add(function() {
      // console.log("Resource conscious resize callback!");
    });

    (function() {
      document.addEventListener("resize", resizeThrottler, false);

      var resizeTimeout;
      function resizeThrottler() {
        if (!resizeTimeout) {
          resizeTimeout = setTimeout(function() {
            resizeTimeout = null;
            actualResizeHandler();
          }, 66);
        }
      }
      function actualResizeHandler() {}
    })();
  },

  destroyed: function() {
    document.removeEventListener("mousewheel", this.onScroll, false);
  },
  mounted() {
    var page = this.$el.querySelector(".book-page");

    var gap = parseInt(
      window.getComputedStyle(page).getPropertyValue("column-gap"),
      10
    );

    var pageNum = Math.floor(page.scrollLeft / (page.offsetWidth + gap));

    var bgColor = document.getElementsByClassName("book-content")[0].style
        .backgroundColor,
      hexDigits = new Array(
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "a",
        "b",
        "c",
        "d",
        "e",
        "f"
      );
    function rgb2hex(rgb) {
      rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
      return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    }
    function hex(x) {
      return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
    }
    this.currentColor = rgb2hex(bgColor);
  },
  watch: {
    $route(to, from, next) {
      var toDepth = this.routeNames.indexOf(to.name);
      var fromDepth = this.routeNames.indexOf(from.name);
      this.routeTransition = toDepth < fromDepth ? "slide-right" : "slide-left";
    },
    pageNum: newValue => {
      eventHub.$emit("pageNum", newValue);
    },
    ttlPages: newValue => {
      eventHub.$emit("ttlPages", newValue);
    }
  },
  methods: {
    tapped() {
      var el = this.$el.querySelector('.touch-swipe');
      this.hiddenEl = !this.hiddenEl
    },
    tappedIn() {
      var el = this.$el.querySelector('.touch-swipe');
      this.hiddenEl = !this.hiddenEl
    },
    scrollIt(destination, duration = 200, easing = "linear", callback) {
      const easings = {
        linear(t) {
          return t;
        },
        easeInQuad(t) {
          return t * t;
        },
        easeOutQuad(t) {
          return t * (2 - t);
        },
        easeInOutQuad(t) {
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        },
        easeInCubic(t) {
          return t * t * t;
        },
        easeOutCubic(t) {
          return --t * t * t + 1;
        },
        easeInOutCubic(t) {
          return t < 0.5
            ? 4 * t * t * t
            : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        },
        easeInQuart(t) {
          return t * t * t * t;
        },
        easeOutQuart(t) {
          return 1 - --t * t * t * t;
        },
        easeInOutQuart(t) {
          return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
        },
        easeInQuint(t) {
          return t * t * t * t * t;
        },
        easeOutQuint(t) {
          return 1 + --t * t * t * t * t;
        },
        easeInOutQuint(t) {
          return t < 0.5
            ? 16 * t * t * t * t * t
            : 1 + 16 * --t * t * t * t * t;
        }
      };

      var page = this.$el.querySelector(".book-page");
      var gap = parseInt(
          window.getComputedStyle(page).getPropertyValue("column-gap"),
          10
        ),
        offset = page.offsetWidth + gap;

      const start = page.scrollLeft;

      const startTime =
        "now" in window.performance ? performance.now() : new Date().getTime();

      const documentWidth = Math.max(
        page.scrollWidth || page.offsetWidth || page.clientWidth
      );

      const windowWidth = window.innerWidth || window.clientWidth;

      const destinationOffsetToScroll = start + destination;

      function scroll() {
        // debugger;
        const now =
          "now" in window.performance
            ? performance.now()
            : new Date().getTime();
        const time = Math.min(1, (now - startTime) / duration);
        const timeFunction = easings[easing](time);
        page.scroll(
          Math.ceil(timeFunction * (destinationOffsetToScroll - start) + start),
          0
        );
        if (timeFunction === 1 || start === destinationOffsetToScroll) {
          if (callback) {
            callback();
          }
          return;
        }
        requestAnimationFrame(scroll);
      }
      scroll();
    },

    next: function(e) {
      
      var el = this.$el.querySelector('.touch-swipe');
      el.style.pointerEvents = 'auto';
      // console.log(el.style.pointerEvents)

      // debugger;
      var book = this.$el.querySelector(".book-content");
      var page = this.$el.querySelector(".book-page"),
        gap = parseInt(
          window.getComputedStyle(page).getPropertyValue("column-gap"),
          10
        ),
        offset = page.offsetWidth + gap,
        index = this.routeNames.indexOf(this.$route.name);

      const scrollArea = page.scrollWidth - page.offsetWidth;
      const windowWidth = window.innerWidth || window.clientWidth;
      var trackLength = scrollArea - (page.offsetWidth + gap);

      var pageNum = Math.floor(page.scrollLeft / (page.offsetWidth + gap));

      pageNum += 1;
      var ttlPages = Math.round(scrollArea / (page.offsetWidth + gap));

      if (
        page.scrollWidth - (page.scrollLeft + page.offsetWidth) !== 0 &&
        pctScrolled !== 100
      ) {
        var currentPage = Math.floor(pageNum * (page.offsetWidth + gap));

        var nextPage = Math.floor(pageNum * (page.offsetWidth + gap));

        var destination = nextPage - page.scrollLeft;

        this.scrollIt(destination, 300, "easeInOutQuint", () =>
          console.log(
            `Just finished scrolling to ${page.scrollLeft}px of ${page.scrollWidth}px remain ${page.scrollWidth -
              page.scrollLeft}px - percent ${pctScrolled}% pageNum ${pageNum} / ${ttlPages}`
          )
        );
      } else {
        this.$router.push({ name: this.routeNames[index + 1] });
        pageNum = 0;
        var pctScrolled = Math.floor(
          pageNum * (page.offsetWidth + gap) / scrollArea * 100
        );
        this.progress = pctScrolled;
      }
      var pctScrolled = Math.floor(
        pageNum * (page.offsetWidth + gap) / scrollArea * 100
      );
      this.progress = pctScrolled;
    },
    prev: function(e) {
      var el = this.$el.querySelector('.touch-swipe');
      el.style.pointerEvents = 'auto';

      var page = this.$el.querySelector(".book-page"),
        gap = parseInt(
          window.getComputedStyle(page).getPropertyValue("column-gap"),
          10
        ),
        offset = page.offsetWidth + gap,
        index = this.routeNames.indexOf(this.$route.name);

      const scrollArea = page.scrollWidth - page.offsetWidth;

      var pageNum = Math.round(page.scrollLeft / (page.offsetWidth + gap));
      var ttlPages = Math.round(scrollArea / (page.offsetWidth + gap));

      var currentPage = Math.floor(pageNum * (page.offsetWidth + gap));
      if (page.scrollLeft !== 0 && pageNum !== 0) {
        var pageNum = Math.round(page.scrollLeft / (page.offsetWidth + gap));
        var pageNumber = Math.floor(page.scrollLeft / (page.offsetWidth + gap));

        pageNum -= 1;
        var prevPage = Math.floor(pageNum * (page.offsetWidth + gap));

        var destination = -1 * (page.scrollLeft - prevPage);

        this.scrollIt(destination, 300, "easeOutQuad", () =>
          console.log(
            `Just finished scrolling to ${page.scrollLeft}px from ${page.scrollWidth}px remain ${page.scrollWidth -
              page.scrollLeft}px -  pageNum ${pageNum} / ${ttlPages}`
          )
        );
      } else {
        this.$router.push({ name: this.routeNames[index - 1] });
        pageNum = 0;
        var pctScrolled = Math.floor(
          pageNum * (page.offsetWidth + gap) / scrollArea * 100
        );
        this.progress = pctScrolled;
      }
      var pctScrolled = Math.floor(
        pageNum * (page.offsetWidth + gap) / scrollArea * 100
      );
      this.progress = pctScrolled;
    },
    over: function() {
      this.isOver = true;
      // console.log("over");
    },
    out: function() {
      this.isOver = false;
      // console.log("out");
    },
    onScroll: function(e, position) {
      this.position = position;
      if (this.isOver === true) {
        var page = this.$el.querySelector(".book-page"),
          gap = parseInt(
            window.getComputedStyle(page).getPropertyValue("column-gap"),
            10
          ),
          deltaX = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail)),
          end = page.scrollWidth - (page.scrollLeft + page.offsetWidth),
          offset = page.offsetWidth + gap;

        var pctScrolled = Math.floor(
          pageNum * (page.offsetWidth + gap) / scrollArea * 100
        );
        this.progress = pctScrolled;

        const scrollArea = page.scrollWidth - page.offsetWidth;
        var pageNum = Math.round(page.scrollLeft / (page.offsetWidth + gap));
        var ttlPages = Math.round(scrollArea / (page.offsetWidth + gap));

        if (deltaX === 1) {
          if (page.scrollLeft !== 0) {
            pageNum -= 1;
            var prevPage = Math.floor(pageNum * (page.offsetWidth + gap));

            var destination = -1 * (page.scrollLeft - prevPage);

            this.scrollIt(destination, 300, "easeOutQuad", () =>
              console.log(
                `Just finished scrolling to ${page.scrollLeft}px from ${page.scrollWidth}px remain ${page.scrollWidth -
                  page.scrollLeft}px -  pageNum ${pageNum} / ${ttlPages}`
              )
            );
            var pctScrolled = Math.floor(
              pageNum * (page.offsetWidth + gap) / scrollArea * 100
            );
            this.progress = pctScrolled;
          }
        } else if (deltaX === -1) {
          if (page.scrollWidth - (page.scrollLeft + page.offsetWidth) !== 0) {
            pageNum += 1;
            var nextPage = Math.floor(pageNum * (page.offsetWidth + gap));

            var destination = nextPage - page.scrollLeft;

            this.scrollIt(destination, 300, "easeOutQuad", () =>
              console.log(
                `Just finished scrolling to ${page.scrollLeft}px from ${page.scrollWidth}px remain ${page.scrollWidth -
                  page.scrollLeft}px -  pageNum ${pageNum} / ${ttlPages}`
              )
            );
            var pctScrolled = Math.floor(
              pageNum * (page.offsetWidth + gap) / scrollArea * 100
            );
            this.progress = pctScrolled;
          }
        }
      } else {
        return;
      }
    },
    fadeIn: function() {
      var page = this.$el.querySelector(".book-page");
      page.style.opacity = 0;
      var last = +new Date();
      var tick = function() {
        page.style.opacity = +page.style.opacity + (new Date() - last) / 400;
        last = +new Date();
        if (+page.style.opacity < 1) {
          (window.requestAnimationFrame && requestAnimationFrame(tick)) ||
            setTimeout(tick, 16);
        }
      };
      tick();
    },

    resetScroll: function() {
      var page = this.$el.querySelector(".book-page");
      page.scrollLeft = 0;
    }
  },
  computed: {},
  components: {
    Settings
  }
};
</script>

<style lang="sass">
.authorInfo p > span,
.authorInfo p > em
  font-size: 33px
  font-family: fontFamily
  font-style: italic
  background-color: #f3f3f3 !important

.toc span.black
  background-color: #f3f3f3 !important
  color: #2c3e50 !important

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active
  transition: transform 350ms cubic-bezier(1, 0, 0, 1)
  position: absolute
  column-count: 2
  column-width: 220px
  column-gap: 40px
  height: 100vh
  max-height: calc(100vh - 50px) !important
  overflow-x: scroll
  overflow-y: -moz-hidden-unscrollable
  padding: 0 20px 60px
  text-align: initial
  column-fill: auto
  h1,
  h2,
  h3,
  h4,
  h5,
  h6
    font-family: 'Cabin'
    float: left
  a
    display: inline-block !important
    width: 100%
    float: left
  p, li
    display: inline-block
    overflow: hidden
    float: left
  .coverImage, .seperator img, .inner_page img
    max-width: 100%
    max-height: calc(100vh - 145px) !important
    margin-bottom: 10px
    margin-left: 50%
    transform: translate3d(-50%, 0, 0)
    -webkit-transform: translate3d(-50%, 0, 0)
  .Inset
    width: 100%
  .subA
    font-weight: bold
    line-height: 3rem
  ol>li:last-child
    margin-bottom: 16px
  td
    border-right: 1px solid grey
    border-bottom: 1px solid grey
    padding: 10px
    &:first-child
      border-left: 1px solid grey
  .headerRow
    border: 1px solid grey
  .subheader
    font-size: .9em
    height: auto
    display: block
    width: 100%
    font-style: italic

.slide-right-enter,
.slide-left-leave-to
  transform: translate3d(-100%, 0, 0)

.slide-right-enter-to,
.slide-left-leave,
.slide-right-leave,
.slide-left-enter-to
  transform: translate3d(0, 0, 0)

.slide-left-enter,
.slide-right-leave-to
  transform: translate3d(100%, 0, 0)

.touch-swipe
  position: absolute
  top: 0
  left: 0
  right: 0
  bottom: 0
  z-index: 3
  display: block
.touch-swipe.active
  display: none

</style>

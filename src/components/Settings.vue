<template>
  <div class="settings">
    <ul class="settings-list">
      <li>
        <span>Reload book: </span>
        <v-btn flat id="reloadBookBtn" @click.native.stop="reloadBook()" :ripple="false">
            <v-icon>ion-ios-loop-strong</v-icon>
          </v-btn>
      </li>
      <li>
        <span>Font:</span>
        <v-select 
          :items="fonts" 
          v-model="selected" 
          overflow 
          single-line 
          return-objectauto
          append-icon="ion-ios-arrow-down"
          hide-details
          @click.native.stop="drawerRight=true"
        />
      </li>
      <li>
        <span>Font size:</span>
        <p class="bold-font" v-html="value1 + 'px' || null"></p>
        <v-slider v-model="value1" :min="17" :max="27" :step="1"></v-slider>
      </li>
      <li class="columns-setting">
        <span>Page columns:</span><br>
        <v-radio 
          v-model="ex8" 
          label="Auto" 
          value="Auto" 
          flat 
          :ripple="false"
          prepend-icon=""
        />
        <v-radio 
          v-model="ex8" 
          label="Single" 
          value="Single" 
          flat 
          :ripple="false"
          prepend-icon=""
        />
      </li>
      <li class="width-setting">
        <span>Page width:</span>
        <p class="bold-font" v-html="value2 + '%' || null"></p>
        <v-slider v-model="value2" :min="50" :max="90"></v-slider>
      </li>
      <li>
        <span>Brightness:</span>
        <p class="bold-font" v-html="(value3 - 100) + '%' || null"></p>
        <v-slider v-model="value3" :step="1" :min="0" :max="200"></v-slider>
      </li>
      <li>
        <span>Color mode:</span>
        <br><br>
        <div id="colors">
          <v-btn 
            flat 
            id="white" 
            @click.native.stop="changeClassWhite()" 
            :ripple="false"
          >
            White
          </v-btn>
          <v-btn flat id="black" @click.native.stop="changeClassBlack()" :ripple="false">
            Black
          </v-btn>
          <v-btn flat id="sepia" @click.native.stop="changeClassSepia()" :ripple="false">
            Sepia
          </v-btn>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import eventHub from "../event-hub.js";

export default {
  name: "settings",
  data() {
    return {
      events: [],
      value1: 22,
      value2: 70,
      value3: 100,
      ex8: "Auto",
      selected: "Old-Cabin",
      fonts: [
        "Old-Cabin",
        "Raleway-Bitter",
        "Ubuntu-Abel",
        "Droid-Abril",
        "Garamond-Clicker",
        "Alice-Playfair",
        "Judson-Quando"
      ],
      classes: ["white", "black", "sepia"]
    };
  },
  watch: {
    value1: newValue => {
      eventHub.$emit("fontSizeChanged", newValue);
    },
    selected: newValue => {
      eventHub.$emit("fontFamilyChanged", newValue);
    },
    ex8: newValue => {
      eventHub.$emit("columnsCountChanged", newValue);
    },
    value2: newValue => {
      eventHub.$emit("widthChanged", newValue);
    },
    value3: newValue => {
      eventHub.$emit("brightnessChanged", newValue);
    }
  },
  methods: {
    reloadBook () {
      window.location.reload(true)
    },
    changeClassWhite() {
      var el = document.getElementsByClassName("book-content")[0];
      var el2 = document.getElementsByClassName("nav-btn")[0];
      var el3 = document.getElementsByClassName("nav-btn")[1];
      var el4 = document.getElementsByTagName("footer")[0];
      console.log(document.getElementsByTagName("footer")[0])
      if (el.classList && el2.classList && el3.classList && el4.classList) {
        el.classList.remove("black");
        el2.classList.remove("black");
        el3.classList.remove("black");
        el4.classList.remove("black");
        el.classList.remove("sepia");
        el2.classList.remove("sepia");
        el3.classList.remove("sepia");
        el4.classList.remove("sepia");
        el.classList.add("white");
        el2.classList.add("white");
        el3.classList.add("white");
        el4.classList.add("white");
      } else {
        el.className += " white";
        el2.className += " white";
        el3.className += " white";
        el4.className += " white";
      }
    },
    changeClassBlack() {
      var el = document.getElementsByClassName("book-content")[0];
      var el2 = document.getElementsByClassName("nav-btn")[0];
      var el3 = document.getElementsByClassName("nav-btn")[1];
      var el4 = document.getElementsByTagName("footer")[0];
      if (el.classList && el2.classList && el3.classList && el4.classList) {
        el.classList.remove("white");
        el2.classList.remove("white");
        el3.classList.remove("white");
        el4.classList.remove("white");
        el.classList.remove("sepia");
        el2.classList.remove("sepia");
        el3.classList.remove("sepia");
        el4.classList.remove("sepia");
        el.classList.add("black");
        el2.classList.add("black");
        el3.classList.add("black");
        el4.classList.add("black");
      } else {
        el.className += " black";
        el2.className += " black";
        el3.className += " black";
        el4.className += " black";
      }
    },
    changeClassSepia() {
      var el = document.getElementsByClassName("book-content")[0];
      var el2 = document.getElementsByClassName("nav-btn")[0];
      var el3 = document.getElementsByClassName("nav-btn")[1];
      var el4 = document.getElementsByTagName("footer")[0];
      if (el.classList && el2.classList && el3.classList && el4.classList) {
        el.classList.remove("black");
        el2.classList.remove("black");
        el3.classList.remove("black");
        el4.classList.remove("black");
        el.classList.remove("white");
        el2.classList.remove("white");
        el3.classList.remove("white");
        el4.classList.remove("white");
        el.classList.add("sepia");
        el2.classList.add("sepia");
        el3.classList.add("sepia");
        el4.classList.add("sepia");
      } else {
        el.className += " sepia";
        el2.className += " sepia";
        el3.className += " sepia";
        el4.className += " sepia";
      }
    }
  }
};
</script>







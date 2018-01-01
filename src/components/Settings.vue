<template>
  <div class="settings">
    <ul class="settings-list">
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
      <hr>
      <li>
        <span>Font size:</span>
        <p class="bold-font">{{ (value1 + 'px') || 'null' }}</p>
        <v-slider v-model="value1" :min="17" :max="27" :step="1"></v-slider>
      </li>
      <hr>
      <li>
        <span>Page columns:</span><br>
        <!-- <v-radio-group :mandatory="false"> -->
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
        <!-- </v-radio-group> -->
      </li>
      <hr>
      <li>
        <span>Page width:</span>
        <p class="bold-font">{{ (value2 + '%') || 'null' }}</p>
        <v-slider v-model="value2" :min="50" :max="90"></v-slider>
      </li>
      <hr>
      <li>
        <span>Brightness:</span>
        <p class="bold-font">{{ (value3 - 100 + '%') || 'null' }}</p>
        <v-slider v-model="value3" :step="1" :min="0" :max="200"></v-slider>
      </li>
      <hr>
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
    changeClassWhite() {
      var el = document.getElementsByClassName("book-content")[0];
      if (el.classList) {
        el.classList.remove("black");
        el.classList.remove("sepia");
        el.classList.add("white");
      } else {
        el.className += " white";
      }
    },
    changeClassBlack() {
      var el = document.getElementsByClassName("book-content")[0];
      if (el.classList) {
        el.classList.remove("white");
        el.classList.remove("sepia");
        el.classList.add("black");
      } else {
        el.className += " black";
      }
    },
    changeClassSepia() {
      var el = document.getElementsByClassName("book-content")[0];
      if (el.classList) {
        el.classList.remove("black");
        el.classList.remove("white");
        el.classList.add("sepia");
      } else {
        el.className += " sepia";
      }
    }
  }
};
</script>







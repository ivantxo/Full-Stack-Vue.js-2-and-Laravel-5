import "core-js/library/fn/object/assign";
import Vue from 'vue';
import { populateAmenitiesAndPrices } from './helpers';

let model = JSON.parse(window.vuebnb_listing_model);
model = populateAmenitiesAndPrices(model);

var app = new Vue({
  el: '#app',
  // with no polyfill
  // data: {
  //   title: sample.title,
  //   address: sample.address,
  //   about: sample.about,
  //   headerImageStyle: {
  //     'background-image': 'url(images/header.jpg)'
  //   },
  //   amenities: sample.amenities,
  //   prices: sample.prices,
  //   contracted: true,
  //   modalOpen: false
  // },

  // with polyfill
  data: Object.assign(model, {
    headerImageStyle: {
      'background-image': `url(${model.images[0]})`
    },
    contracted: true,
    modalOpen: false
  }),
  methods: {
    escapeKeyListener(evt) {
      if (evt.keyCode === 27 && this.modalOpen) {
        this.modalOpen = false;
      }
    }
  },
  watch: {
    modalOpen() {
      var className = 'modal-open';
      if (this.modalOpen) {
        document.body.classList.add(className);
      } else {
        document.body.classList.remove(className);
      }
    }
  },
  created() {
    document.addEventListener('keyup', this.escapeKeyListener);
  },
  destroyed() {
    document.removeEventListener('keyup', this.escapeKeyListener);
  }
});

import "core-js/library/fn/object/assign";
import Vue from 'vue';
import sample from './data';

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
  data: Object.assign(sample, {
    headerImageStyle: {
      'background-image': `url(${model.images[0]})`
    },
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

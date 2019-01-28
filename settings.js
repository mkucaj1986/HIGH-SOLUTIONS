import Vue from 'vue';
import VueCookie from 'vue-cookie';

const activeLang = () => {
  const lang = VueCookie.get('locale') || 'pl';
  Vue.config.lang = VueCookie.get('locale') || 'pl';
  return lang;
};

const state = {
  activeLang: activeLang(),
  langs: ['pl', 'en']
};

const actions = {
  async changeLocale ({ commit }, lang) {
    commit('CHANGE_LANG', lang);
  }
};

const mutations = {
  CHANGE_LANG (state, lang) {
    state.activeLang = lang;
  }
};

const getters = {
  appSettings: state => state
};

export default {
  state,
  actions,
  mutations,
  getters
};

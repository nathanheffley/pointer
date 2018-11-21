import Vue from 'vue'
import SessionPage from '@/components/SessionPage'

describe('SessionPage.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(SessionPage)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.hello h1').textContent)
    .toEqual('Welcome to Your Vue.js App')
  })
})

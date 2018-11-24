import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import NotFound from '@/components/NotFound'

describe('NotFound.vue', () => {
  it ('should render a button to the home page', () => {
    const wrapper = shallowMount(NotFound, {
      stubs: {
        RouterLink: RouterLinkStub
      }
    })

    expect(wrapper.findAll(RouterLinkStub).at(0).props().to).toEqual('/')
  })

  it('should render disabled button without session', () => {
    const wrapper = shallowMount(NotFound, {
      stubs: {
        RouterLink: RouterLinkStub
      }
    })

    expect(wrapper.findAll('button').length).toBe(2)
    expect(wrapper.find('button:disabled').exists()).toBe(true)
  })

  it('should render disabled button with empty string session', () => {
    const wrapper = shallowMount(NotFound, {
      stubs: {
        RouterLink: RouterLinkStub
      }
    })
    wrapper.find('input#room').setValue('   ')

    expect(wrapper.findAll('button').length).toBe(2)
    expect(wrapper.find('button:disabled').exists()).toBe(true)
  })

  it('should render enabled button with session', () => {
    const wrapper = shallowMount(NotFound, {
      stubs: {
        RouterLink: RouterLinkStub
      }
    })
    wrapper.find('input#room').setValue('123')

    expect(wrapper.findAll('button').length).toBe(2)
    expect(wrapper.find('button:disabled').exists()).toBe(false)
  })

  it('should link the user to the session they typed in', () => {
    const wrapper = shallowMount(NotFound, {
      stubs: {
        RouterLink: RouterLinkStub
      }
    })
    wrapper.find('input#room').setValue('123')

    expect(wrapper.findAll(RouterLinkStub).at(1).props().to)
    .toEqual({
      name: 'SessionPage',
      params: {
        id: '123'
      }
    })
  })

  it('should trim the session the user typed in', () => {
    const wrapper = shallowMount(NotFound, {
      stubs: {
        RouterLink: RouterLinkStub
      }
    })
    wrapper.find('input#room').setValue('    123  ')

    expect(wrapper.findAll(RouterLinkStub).at(1).props().to)
    .toEqual({
      name: 'SessionPage',
      params: {
        id: '123'
      }
    })
  })
})

import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import LoginPage from '@/components/LoginPage'

describe('LoginPage.vue', () => {
  it('should render disabled button without name and session', () => {
    const wrapper = shallowMount(LoginPage, {
      stubs: {
        RouterLink: RouterLinkStub
      }
    })

    expect(wrapper.findAll('button').length).toBe(1)
    expect(wrapper.find('button:disabled').exists()).toBe(true)
  })

  it('should render disabled button with just name entered', () => {
    const wrapper = shallowMount(LoginPage, {
      stubs: {
        RouterLink: RouterLinkStub
      }
    })
    wrapper.find('input#name').setValue('John Doe')

    expect(wrapper.findAll('button').length).toBe(1)
    expect(wrapper.find('button:disabled').exists()).toBe(true)
  })

  it('should render disabled button with just session', () => {
    const wrapper = shallowMount(LoginPage, {
      stubs: {
        RouterLink: RouterLinkStub
      }
    })
    wrapper.find('input#room').setValue('123')

    expect(wrapper.findAll('button').length).toBe(1)
    expect(wrapper.find('button:disabled').exists()).toBe(true)
  })

  it('should render disabled button with empty string name and session', () => {
    const wrapper = shallowMount(LoginPage, {
      stubs: {
        RouterLink: RouterLinkStub
      }
    })
    wrapper.find('input#name').setValue('   ')
    wrapper.find('input#room').setValue('   ')

    expect(wrapper.findAll('button').length).toBe(1)
    expect(wrapper.find('button:disabled').exists()).toBe(true)
  })

  it('should render enabled button with name and session', () => {
    const wrapper = shallowMount(LoginPage, {
      stubs: {
        RouterLink: RouterLinkStub
      }
    })
    wrapper.find('input#name').setValue('John Doe')
    wrapper.find('input#room').setValue('123')

    expect(wrapper.findAll('button').length).toBe(1)
    expect(wrapper.find('button:disabled').exists()).toBe(false)
  })

  it('should link the user to the session they typed in', () => {
    const wrapper = shallowMount(LoginPage, {
      stubs: {
        RouterLink: RouterLinkStub
      }
    })
    wrapper.find('input#name').setValue('John Doe')
    wrapper.find('input#room').setValue('123')

    expect(wrapper.find(RouterLinkStub).props().to)
    .toEqual({
      name: 'SessionPage',
      params: {
        id: '123',
        name: 'John Doe'
      }
    })
  })
})

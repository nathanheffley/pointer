import LoginPage from '@/components/LoginPage'
import { shallowMount, RouterLinkStub } from '@vue/test-utils'

describe('LoginPage.vue', () => {
  const wrapper = shallowMount(LoginPage, {
    stubs: {
      RouterLink: RouterLinkStub
    }
  })

  it('should let the user enter their name', () => {
    expect(wrapper.vm.name).toBeNull()
    wrapper.find('input#name').setValue('John Doe')
    expect(wrapper.vm.name).toBe('John Doe')
  })

  it('should let the user enter a session ID', () => {
    expect(wrapper.vm.session).toBeNull()
    wrapper.find('input#room').setValue('123')
    expect(wrapper.vm.session).toBe('123')
  })

  it('should render disabled button without name and session', () => {
    wrapper.setData({
      session: null,
      name: null
    })
    expect(wrapper.find('button:disabled').exists()).toBe(true)
  })

  it('should render disabled button with just name', () => {
    wrapper.setData({
      session: null,
      name: 'John Doe'
    })
    expect(wrapper.find('button:disabled').exists()).toBe(true)
  })

  it('should render disabled button with just session', () => {
    wrapper.setData({
      session: '123',
      name: null
    })
    expect(wrapper.find('button:disabled').exists()).toBe(true)
  })

  it('should render enabled button with name and session', () => {
    wrapper.setData({
      session: '123',
      name: 'John Doe'
    })
    expect(wrapper.find('button:disabled').exists()).toBe(false)
  })

  it('should link the user to the session they typed in', () => {
    wrapper.setData({
      session: '123',
      name: 'John Doe'
    })
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

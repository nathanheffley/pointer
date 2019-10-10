import { mount, shallowMount } from '@vue/test-utils'
import UserItem from '@/components/UserItem'

describe('UserItem.vue', () => {
  const wrapper = shallowMount(UserItem, {
    propsData: {
      user: {
        username: 'John Doe',
        vote: null
      }
    }
  })

  it('should render the user\'s name', () => {
    expect(wrapper.find('span').text()).toBe('John Doe')
  })

  it('should render ellipsis with no vote', () => {
    expect(wrapper.find('img').attributes('src')).toContain('ellipsis')
  })

  it('should render check mark with a vote', () => {
    wrapper.setProps({
      user: {
        username: 'Jane Doe',
        vote: 3
      }
    })
    expect(wrapper.find('span').text()).toBe('Jane Doe')
    expect(wrapper.find('img').attributes('src')).toContain('check')
  })

  it('should render arrow when vote passed', () => {
    wrapper.setProps({
      user: {
        username: 'John Smith',
        vote: null,
        pass: true
      }
    })
    expect(wrapper.find('span').text()).toBe('John Smith')
    expect(wrapper.find('img').attributes('src')).toContain('arrow')
  })

  it('should not render the user as faded when hovering is null', () => {
    wrapper.setProps({
      user: {
        username: 'John Smith',
        vote: 5
      },
      hovering: null 
    })

    expect(wrapper.find('span').classes()).not.toContain('text-gray-400')
    expect(wrapper.find('img').classes()).not.toContain('opacity-50')
  })

  it('should render the user as faded when hovering a vote they did not vote for', () => {
    wrapper.setProps({
      user: {
        username: 'John Smith',
        vote: 5
      },
      hovering: "3"
    })

    expect(wrapper.find('span').classes()).toContain('text-gray-400')
    expect(wrapper.find('img').classes()).toContain('opacity-50')
  })

  it('should render the user as faded when they have not voted or passed', () => {
    wrapper.setProps({
      user: {
        username: 'John Smith',
        vote: null,
        pass: false
      },
      hovering: "3"
    })

    expect(wrapper.find('span').classes()).toContain('text-gray-400')
    expect(wrapper.find('img').classes()).toContain('opacity-50')
  })

  it('should render the user as faded when they passed', () => {
    wrapper.setProps({
      user: {
        username: 'John Smith',
        vote: null,
        pass: true
      },
      hovering: "3"
    })

    expect(wrapper.find('span').classes()).toContain('text-gray-400')
    expect(wrapper.find('span').classes()).not.toContain('text-gray-700')
    expect(wrapper.find('img').classes()).toContain('opacity-50')
  })

  it('should not render an edit button when user is not self', () => {
    wrapper.setProps({
      self: false
    })

    expect(wrapper.find('button').exists()).toBe(false)
  })

  it('should display the edit button when editing name', () => {
    wrapper.setProps({
      self: true
    })

    wrapper.find('button').trigger('click')

    expect(wrapper.find('button').classes()).not.toContain('opacity-0')
    expect(wrapper.find('button').classes()).toContain('opacity-100')
  })

  it('should display an input with the current name when editing', () => {
    const fullWrap = mount(UserItem, {
      propsData: {
        self: true,
        user: {
          username: 'John Smith'
        }
      }
    })

    fullWrap.find('button').trigger('click')

    expect(fullWrap.find('input').element.value).toBe('John Smith')
  })

  // Because of the $nextTick() used to focus the input I can't
  // get the button and input in this test to work properly.
  it('should emit the new username after saving', () => {
    wrapper.setProps({
      self: true,
      user: {
        username: 'John Smith'
      }
    })

    wrapper.setData({
      name: 'Jane Doe'
    })

    wrapper.vm.updateName()

    expect(localStorage.username).toBe('Jane Doe')
    expect(wrapper.emitted('usernameChange').length).toBe(1)
  })
})

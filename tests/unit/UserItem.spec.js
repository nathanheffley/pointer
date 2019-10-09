import { shallowMount } from '@vue/test-utils'
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
})

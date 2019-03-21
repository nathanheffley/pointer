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
})

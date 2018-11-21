import UserItem from '@/components/UserItem'
import { shallowMount } from '@vue/test-utils'

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
        username: 'John Doe',
        vote: 3
      }
    })
    expect(wrapper.find('img').attributes('src')).toContain('check')
  })
})

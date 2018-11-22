import { shallowMount } from '@vue/test-utils'
import ConditionalButton from '@/components/ConditionalButton'

describe('ConditionalButton.vue', () => {
  it('should not emit click event when disabled button is clicked', () => {
    const wrapper = shallowMount(ConditionalButton, {
      propsData: {
        enabled: false
      },
      slots: {
        default: 'No Clicks!'
      }
    })

    expect(wrapper.findAll('button').length).toBe(1)
    expect(wrapper.find('button').text()).toBe('No Clicks!')

    wrapper.find('button').trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })

  it('should emit click event when enabled button is clicked', () => {
    const wrapper = shallowMount(ConditionalButton, {
      propsData: {
        enabled: true
      },
      slots: {
        default: 'Click Me!'
      }
    })

    expect(wrapper.findAll('button').length).toBe(1)
    expect(wrapper.find('button').text()).toBe('Click Me!')

    wrapper.find('button').trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })
})

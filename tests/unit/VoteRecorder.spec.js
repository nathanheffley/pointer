import { shallowMount } from '@vue/test-utils'
import VoteRecorder from '@/components/VoteRecorder'

describe('VoteRecorder.vue', () => {
  it('should have all the buttons for voting', () => {
    const wrapper = shallowMount(VoteRecorder, {
      propsData: {
        value: null,
        showPassInstructional: false,
      }
    })

    expect(wrapper.findAll('button').at(0).text()).toContain('0')
    expect(wrapper.findAll('button').at(0).classes('btn-blue')).toBeTruthy()
    expect(wrapper.findAll('button').at(1).text()).toContain('1')
    expect(wrapper.findAll('button').at(1).classes('btn-blue')).toBeTruthy()
    expect(wrapper.findAll('button').at(2).text()).toContain('2')
    expect(wrapper.findAll('button').at(2).classes('btn-blue')).toBeTruthy()
    expect(wrapper.findAll('button').at(3).text()).toContain('3')
    expect(wrapper.findAll('button').at(3).classes('btn-blue')).toBeTruthy()
    expect(wrapper.findAll('button').at(4).text()).toContain('5')
    expect(wrapper.findAll('button').at(4).classes('btn-blue')).toBeTruthy()
    expect(wrapper.findAll('button').at(5).text()).toContain('8')
    expect(wrapper.findAll('button').at(5).classes('btn-blue')).toBeTruthy()
    expect(wrapper.findAll('button').at(6).text()).toContain('13')
    expect(wrapper.findAll('button').at(6).classes('btn-blue')).toBeTruthy()
    expect(wrapper.findAll('button').at(7).text()).toContain('?')
    expect(wrapper.findAll('button').at(7).classes('btn-blue')).toBeTruthy()

    expect(wrapper.findAll('button').at(8).text()).toContain('Pass')
    expect(wrapper.findAll('button').at(9).text()).toContain('Clear your vote...')
  })

  it('should highlight the current vote', () => {
    const wrapper = shallowMount(VoteRecorder, {
      propsData: {
        value: 3
      }
    })

    expect(wrapper.findAll('button').at(0).classes('btn-gray')).toBeTruthy()
    expect(wrapper.findAll('button').at(1).classes('btn-gray')).toBeTruthy()
    expect(wrapper.findAll('button').at(2).classes('btn-gray')).toBeTruthy()
    expect(wrapper.findAll('button').at(3).classes('btn-blue')).toBeTruthy()
    expect(wrapper.findAll('button').at(4).classes('btn-gray')).toBeTruthy()
    expect(wrapper.findAll('button').at(5).classes('btn-gray')).toBeTruthy()
    expect(wrapper.findAll('button').at(6).classes('btn-gray')).toBeTruthy()
    expect(wrapper.findAll('button').at(7).classes('btn-gray')).toBeTruthy()
  })

  it('should allow the user to vote for 0', () => {
    const wrapper = shallowMount(VoteRecorder)

    wrapper.findAll('button').at(0).trigger('click')
    expect(wrapper.emitted('pass')).toBeUndefined()
    expect(wrapper.emitted('dismiss-pass-instructional')).toBeUndefined()
    expect(wrapper.emitted('input').length).toBe(1)
    expect(wrapper.emitted('input')[0]).toEqual([0])
  })

  it('should allow the user to vote for 1', () => {
    const wrapper = shallowMount(VoteRecorder)

    wrapper.findAll('button').at(1).trigger('click')
    expect(wrapper.emitted('pass')).toBeUndefined()
    expect(wrapper.emitted('dismiss-pass-instructional')).toBeUndefined()
    expect(wrapper.emitted('input').length).toBe(1)
    expect(wrapper.emitted('input')[0]).toEqual([1])
  })

  it('should allow the user to vote for 2', () => {
    const wrapper = shallowMount(VoteRecorder)

    wrapper.findAll('button').at(2).trigger('click')
    expect(wrapper.emitted('pass')).toBeUndefined()
    expect(wrapper.emitted('dismiss-pass-instructional')).toBeUndefined()
    expect(wrapper.emitted('input').length).toBe(1)
    expect(wrapper.emitted('input')[0]).toEqual([2])
  })

  it('should allow the user to vote for 3', () => {
    const wrapper = shallowMount(VoteRecorder)

    wrapper.findAll('button').at(3).trigger('click')
    expect(wrapper.emitted('pass')).toBeUndefined()
    expect(wrapper.emitted('dismiss-pass-instructional')).toBeUndefined()
    expect(wrapper.emitted('input').length).toBe(1)
    expect(wrapper.emitted('input')[0]).toEqual([3])
  })

  it('should allow the user to vote for 5', () => {
    const wrapper = shallowMount(VoteRecorder)

    wrapper.findAll('button').at(4).trigger('click')
    expect(wrapper.emitted('pass')).toBeUndefined()
    expect(wrapper.emitted('dismiss-pass-instructional')).toBeUndefined()
    expect(wrapper.emitted('input').length).toBe(1)
    expect(wrapper.emitted('input')[0]).toEqual([5])
  })

  it('should allow the user to vote for 8', () => {
    const wrapper = shallowMount(VoteRecorder)

    wrapper.findAll('button').at(5).trigger('click')
    expect(wrapper.emitted('pass')).toBeUndefined()
    expect(wrapper.emitted('dismiss-pass-instructional')).toBeUndefined()
    expect(wrapper.emitted('input').length).toBe(1)
    expect(wrapper.emitted('input')[0]).toEqual([8])
  })

  it('should allow the user to vote for 13', () => {
    const wrapper = shallowMount(VoteRecorder)

    wrapper.findAll('button').at(6).trigger('click')
    expect(wrapper.emitted('pass')).toBeUndefined()
    expect(wrapper.emitted('dismiss-pass-instructional')).toBeUndefined()
    expect(wrapper.emitted('input').length).toBe(1)
    expect(wrapper.emitted('input')[0]).toEqual([13])
  })

  it('should allow the user to vote for ?', () => {
    const wrapper = shallowMount(VoteRecorder)

    wrapper.findAll('button').at(7).trigger('click')
    expect(wrapper.emitted('pass')).toBeUndefined()
    expect(wrapper.emitted('input').length).toBe(1)
    expect(wrapper.emitted('input')[0]).toEqual(['?'])
  })

  it('should allow the user to pass', () => {
    const wrapper = shallowMount(VoteRecorder, {
      propsData: {
        value: null,
        showPassInstructional: false,
      }
    })

    wrapper.findAll('button.italic').at(0).trigger('click')
    expect(wrapper.emitted('pass').length).toBe(1)
    expect(wrapper.emitted('dismiss-pass-instructional')).toBeUndefined()
    expect(wrapper.emitted('input')).toBeUndefined()
  })

  it('should dismiss the pass instructional if user passes while it is shown', () => {
    const wrapper = shallowMount(VoteRecorder, {
      propsData: {
        value: null,
        showPassInstructional: true,
      }
    })

    wrapper.findAll('button.italic').at(0).trigger('click')
    expect(wrapper.emitted('pass').length).toBe(1)
    expect(wrapper.emitted('dismiss-pass-instructional').length).toBe(1)
    expect(wrapper.emitted('input')).toBeUndefined()
  })

  it('should dismiss the pass instructional if user clicks the close button', () => {
    const wrapper = shallowMount(VoteRecorder, {
      propsData: {
        value: null,
        showPassInstructional: true,
      }
    })

    wrapper.findAll('[data-test="pass-instructional-dismiss-button"]').at(0).trigger('click')
    expect(wrapper.emitted('pass')).toBeUndefined()
    expect(wrapper.emitted('dismiss-pass-instructional').length).toBe(1)
    expect(wrapper.emitted('input')).toBeUndefined()
  })

  it('should allow the user to clear their vote', () => {
    const wrapper = shallowMount(VoteRecorder)

    wrapper.findAll('button.italic').at(1).trigger('click')
    expect(wrapper.emitted('input').length).toBe(1)
    expect(wrapper.emitted('input')[0]).toEqual([null])
    expect(wrapper.emitted('dismiss-pass-instructional')).toBeUndefined()
  })
})

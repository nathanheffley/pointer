import { shallowMount } from '@vue/test-utils'
import VoteRecorder from '@/components/VoteRecorder'

describe('VoteRecorder.vue', () => {
  it('should have all the buttons for voting', () => {
    const wrapper = shallowMount(VoteRecorder, {
      propsData: {
        value: null
      }
    })

    expect(wrapper.findAll('button').at(0).text()).toContain('0')
    expect(wrapper.findAll('button').at(0).classes('btn-blue')).toBeTruthy()
    expect(wrapper.findAll('button').at(1).text()).toContain('1')
    expect(wrapper.findAll('button').at(1).classes('btn-blue')).toBeTruthy()
    expect(wrapper.findAll('button').at(2).text()).toContain('3')
    expect(wrapper.findAll('button').at(2).classes('btn-blue')).toBeTruthy()
    expect(wrapper.findAll('button').at(3).text()).toContain('5')
    expect(wrapper.findAll('button').at(3).classes('btn-blue')).toBeTruthy()
    expect(wrapper.findAll('button').at(4).text()).toContain('8')
    expect(wrapper.findAll('button').at(4).classes('btn-blue')).toBeTruthy()
    expect(wrapper.findAll('button').at(5).text()).toContain('13')
    expect(wrapper.findAll('button').at(5).classes('btn-blue')).toBeTruthy()
    expect(wrapper.findAll('button').at(6).text()).toContain('20')
    expect(wrapper.findAll('button').at(6).classes('btn-blue')).toBeTruthy()
    expect(wrapper.findAll('button').at(7).text()).toContain('?')
    expect(wrapper.findAll('button').at(7).classes('btn-blue')).toBeTruthy()

    expect(wrapper.findAll('button').at(8).text()).toContain('Clear your vote...')
  })

  it('should highlight the current vote', () => {
    const wrapper = shallowMount(VoteRecorder, {
      propsData: {
        value: 3
      }
    })

    expect(wrapper.findAll('button').at(0).classes('btn-grey')).toBeTruthy()
    expect(wrapper.findAll('button').at(1).classes('btn-grey')).toBeTruthy()
    expect(wrapper.findAll('button').at(2).classes('btn-blue')).toBeTruthy()
    expect(wrapper.findAll('button').at(3).classes('btn-grey')).toBeTruthy()
    expect(wrapper.findAll('button').at(4).classes('btn-grey')).toBeTruthy()
    expect(wrapper.findAll('button').at(5).classes('btn-grey')).toBeTruthy()
    expect(wrapper.findAll('button').at(6).classes('btn-grey')).toBeTruthy()
    expect(wrapper.findAll('button').at(7).classes('btn-grey')).toBeTruthy()
  })

  it('should allow the user to vote for 0', () => {
    const wrapper = shallowMount(VoteRecorder)

    wrapper.findAll('button').at(0).trigger('click')
    expect(wrapper.emitted('input').length).toBe(1)
    expect(wrapper.emitted('input')[0]).toEqual([0])
  })

  it('should allow the user to vote for 1', () => {
    const wrapper = shallowMount(VoteRecorder)

    wrapper.findAll('button').at(1).trigger('click')
    expect(wrapper.emitted('input').length).toBe(1)
    expect(wrapper.emitted('input')[0]).toEqual([1])
  })

  it('should allow the user to vote for 3', () => {
    const wrapper = shallowMount(VoteRecorder)

    wrapper.findAll('button').at(2).trigger('click')
    expect(wrapper.emitted('input').length).toBe(1)
    expect(wrapper.emitted('input')[0]).toEqual([3])
  })

  it('should allow the user to vote for 5', () => {
    const wrapper = shallowMount(VoteRecorder)

    wrapper.findAll('button').at(3).trigger('click')
    expect(wrapper.emitted('input').length).toBe(1)
    expect(wrapper.emitted('input')[0]).toEqual([5])
  })

  it('should allow the user to vote for 8', () => {
    const wrapper = shallowMount(VoteRecorder)

    wrapper.findAll('button').at(4).trigger('click')
    expect(wrapper.emitted('input').length).toBe(1)
    expect(wrapper.emitted('input')[0]).toEqual([8])
  })

  it('should allow the user to vote for 13', () => {
    const wrapper = shallowMount(VoteRecorder)

    wrapper.findAll('button').at(5).trigger('click')
    expect(wrapper.emitted('input').length).toBe(1)
    expect(wrapper.emitted('input')[0]).toEqual([13])
  })

  it('should allow the user to vote for 20', () => {
    const wrapper = shallowMount(VoteRecorder)

    wrapper.findAll('button').at(6).trigger('click')
    expect(wrapper.emitted('input').length).toBe(1)
    expect(wrapper.emitted('input')[0]).toEqual([20])
  })

  it('should allow the user to vote for ?', () => {
    const wrapper = shallowMount(VoteRecorder)

    wrapper.findAll('button').at(7).trigger('click')
    expect(wrapper.emitted('input').length).toBe(1)
    expect(wrapper.emitted('input')[0]).toEqual(['?'])
  })

  it('should allow the user to clear their vote', () => {
    const wrapper = shallowMount(VoteRecorder)

    wrapper.find('button.italic').trigger('click')
    expect(wrapper.emitted('input').length).toBe(1)
    expect(wrapper.emitted('input')[0]).toEqual([null])
  })
})

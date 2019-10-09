import { shallowMount } from '@vue/test-utils'
import VoteResults from '@/components/VoteResults'

describe('VoteResults.vue', () => {
  const wrapper = shallowMount(VoteResults)

  it('should render waiting message with no votes and no show', () => {
    wrapper.setProps({
      votes: [],
      show: false
    })

    expect(wrapper.findAll('li').length).toBe(0)
    expect(wrapper.text().toLowerCase()).toContain('waiting')
  })

  it('should render waiting message with votes and no show', () => {
    wrapper.setProps({
      votes: [3, 2, 3],
      show: false
    })

    expect(wrapper.findAll('li').length).toBe(0)
    expect(wrapper.text().toLowerCase()).toContain('waiting')
  })

  it('should render waiting message with no votes and show', () => {
    wrapper.setProps({
      votes: [],
      show: true
    })

    expect(wrapper.findAll('li').length).toBe(0)
    expect(wrapper.text().toLowerCase()).toContain('waiting')
  })

  it('should display votes in order', () => {
    wrapper.setProps({
      votes: [3, 5, 8, 1, 8, 3, 3, 5, 8],
      show: true
    })

    expect(wrapper.findAll('li').length).toBe(4)
    expect(wrapper.findAll('li').at(0).text()).toContain('1 1 vote')
    expect(wrapper.findAll('li').at(1).text()).toContain('5 2 votes')
    expect(wrapper.findAll('li').at(2).text()).toContain('3 3 votes')
    expect(wrapper.findAll('li').at(3).text()).toContain('8 3 votes')
  })

  it('should pluralize the word vote properly', () => {
    wrapper.setProps({
      votes: [1, 3, 3, 3, 5],
      show: true
    })

    expect(wrapper.text()).toContain('1 1 vote')
    expect(wrapper.text()).toContain('5 1 vote')
    expect(wrapper.text()).toContain('3 3 votes')
  })

  it('should emit the vote being hovered over', () => {
    const emitWrapper = shallowMount(VoteResults)

    emitWrapper.setProps({
      votes: [3, 5, 5],
      show: true
    })

    emitWrapper.findAll('li').at(0).trigger('mouseover')
    expect(emitWrapper.emitted('hovering').length).toBe(1)
    expect(emitWrapper.emitted('hovering')[0]).toEqual(["3"])
  })

  it('should emit null when hovering stops', () => {
    const emitWrapper = shallowMount(VoteResults)

    emitWrapper.setProps({
      votes: [3, 5, 5],
      show: true
    })

    const result = emitWrapper.findAll('li').at(1)

    result.trigger('mouseover')
    expect(emitWrapper.emitted('hovering').length).toBe(1)
    expect(emitWrapper.emitted('hovering')[0]).toEqual(["5"])

    result.trigger('mouseleave')
    expect(emitWrapper.emitted('hovering').length).toBe(2)
    expect(emitWrapper.emitted('hovering')[1]).toEqual([null])
  })

  it('should emit the vote only once while being hovered over', () => {
    const emitWrapper = shallowMount(VoteResults)

    emitWrapper.setProps({
      votes: [3, 5, 5],
      show: true
    })

    const result = emitWrapper.findAll('li').at(0)

    result.trigger('mouseover')
    result.trigger('mouseover')
    result.trigger('mouseover')
    expect(emitWrapper.emitted('hovering').length).toBe(1)
    expect(emitWrapper.emitted('hovering')[0]).toEqual(["3"])

    result.trigger('mouseleave')
    expect(emitWrapper.emitted('hovering').length).toBe(2)
    expect(emitWrapper.emitted('hovering')[1]).toEqual([null])

    result.trigger('mouseover')
    expect(emitWrapper.emitted('hovering').length).toBe(3)
    expect(emitWrapper.emitted('hovering')[2]).toEqual(["3"])
  })
})

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import NsasBox from '../nsas-box.vue'

describe('NsasBox', () => {
  it('should render the component', () => {
    const wrapper = mount(NsasBox)
    expect(wrapper.html()).toMatchSnapshot()
  })
})

import React from 'react'
import { Icon } from 'react-native-elements'

const Chevron = ({name}) => (
  <Icon
    name={name}
    type="entypo"
    color={'#000'}
    containerStyle={{ marginLeft: 0, width: 20 }}
  />
)

export default Chevron
import React from 'react';

import { CheckBox } from '@rneui/base';

type TProps = {
  title: string
  checked: boolean
  onPress: () => void
}

export const AppCheckbox: React.FC<TProps> = ({ title, checked, onPress }) => {
  return (
    <CheckBox
      title={title}
      checkedIcon="dot-circle-o"
      uncheckedIcon="circle-o"
      checked={checked}
      onPress={onPress}
    />
  )
}

import React from 'react'
import { ActivityIndicator } from 'react-native'
import { colors } from '../config'
import CentreContainer from './CentreContainer'

const FullScreenLoading = () =>
  <CentreContainer>
    <ActivityIndicator size="large" color={colors.primary}/>
  </CentreContainer>


export default FullScreenLoading
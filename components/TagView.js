import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { View } from 'react-native'
import { colors } from '../config'
import { MaterialIcons } from '@expo/vector-icons'

const TagView = ({selectedTags, availableTags, filterString, addTag, removeTag, lightBg}) =>
  <View>
    <Outer horizontal={true} key={1} lightBg={lightBg}>
      {selectedTags.map((tag, i) =>
        <Tag activeOpacity={0.8} key={i} onPress={() => removeTag(tag)} active>
          <TagText active>{tag}
          </TagText>
          <MaterialIcons name="close" size={22} color="black"/>
        </Tag>
      )}
    </Outer>
    <Outer horizontal={true} key={2} lightBg={lightBg}>
      {availableTags
        .filter(item => item.slug.toLowerCase().includes(filterString.toLowerCase()))
        .map((item, i) =>
          <Tag activeOpacity={0.8} key={i} onPress={() => addTag(item.slug)}>
            <TagText>{item.slug}</TagText>
          </Tag>
        )}
    </Outer>
  </View>

const Outer = styled.ScrollView`
  background: ${props => props.lightBg ? colors.primary : 'black'};
`

const Tag = styled.TouchableOpacity`
  margin: 10px 5px 0;
  padding: 10px;
  border: 2px dotted ${colors.primary};
  border-radius: 5px;
  height: 45px;
  background: ${props => props.active ? colors.primary : 'black'};
  flex-direction: row;
  align-items: center;
`

const TagText = styled.Text`
  color: ${props => props.active ? 'black' : colors.primary};
`


TagView.propTypes = {
  selectedTags: PropTypes.array.isRequired,
  availableTags: PropTypes.array.isRequired,
  filterString: PropTypes.string.isRequired,
  addTag: PropTypes.func.isRequired,
  removeTag: PropTypes.func.isRequired,
  lightBg: PropTypes.bool,
}

export default TagView
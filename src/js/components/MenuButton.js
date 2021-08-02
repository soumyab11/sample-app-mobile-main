import React, { Component } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { testProperties } from '../config/TestProperties';
import I18n from '../config/I18n';

export default class MenuButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View { ...testProperties(I18n.t('menu.label')) }>
        <TouchableOpacity onPress={ () => this.props.navigation.openDrawer() }>
          <Image
            style={ styles.menu_image }
            resizeMode="contain"
            source={ require('../../img/menu-button.png') }
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  menu_image: {
    height: 40,
    width: 40,
  },
});

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { testProperties } from '../config/TestProperties';
import { Button } from 'react-native-elements';
import { colors } from '../utils/colors';
import { MUSEO_SANS_BOLD } from '../config/Constants';

export default class ActionButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { containerStyle, onPress, title } = this.props;

    return (
      <Button
        buttonStyle={ styles.button_style }
        containerStyle={ containerStyle || styles.button_container_style }
        titleStyle={ styles.button_title_style }
        onPress={ onPress }
        title={ title }
        { ...testProperties(title) }
      />
    );
  }
}

const styles = StyleSheet.create({
  button_container_style: {
    width: '100%',
  },
  button_style: {
    backgroundColor: colors.white,
    borderColor: colors.slRed,
    borderWidth: 3,
    borderRadius: 0,
    paddingBottom: 10,
    paddingTop: 10,
    elevation: 0,
  },
  button_title_style: {
    color: colors.slRed,
    fontSize: 18,
    fontFamily: MUSEO_SANS_BOLD,
  },
});

import React from "react";
import { View } from "react-native";
import { ConfirmDialog } from 'react-native-simple-dialogs';
import colors from './../styles/colors';

const AlertDialog = ({visible, headerText, desciptionText, firstButtonLabel, secondButtonlabel,
  handleSecondButtonPress, handleFirstButtonPress}) => {
  return (
    <View>

        <ConfirmDialog
    title={headerText}
    message={desciptionText}
    visible={visible}
    //onTouchOutside={() => this.setState({dialogVisible: false})}
    positiveButton={{
        title: firstButtonLabel,
        titleStyle: {color: colors.violet},
        onPress: handleFirstButtonPress 
    }}
    negativeButton={{
        title: secondButtonlabel,
        titleStyle: {color: colors.violet},
        onPress: handleSecondButtonPress 
    }}
/>
      </View>
  );
};

export default AlertDialog;


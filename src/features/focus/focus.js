import React, {useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from "../../component/RoundedButton";
import { fontSize, spacing } from "../../utils/sizes";
import { colors } from "../../utils/colors";

export const Focus = ({addSubject}) => {
  const [subject, setSubject] = useState(null)
  return(
    <View style= {styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}> What would you like to focus on? </Text>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputPostion} 
            onSubmitEditing = {
              ({nativeEvent}) => 
              {
                setSubject(nativeEvent.text)
              }}/>
          <RoundedButton size={70} title="start" onPress = {()=>
            {
              addSubject(subject)
              }
          }/>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
  },
  titleContainer:{
    flex: 1,
    padding: spacing.md,
    justifyContent: 'center',
  },
  title:{
    color: colors.white,
    fontWeight: 'bold',
    fontSize: fontSize.lg
  },
  inputContainer:{
    paddingTop: spacing.md,
    flexDirection: "row",
    alignItems: 'center'
  },
  inputPostion:{
    flex: 1,
    marginRight: 20,
   
  }
});
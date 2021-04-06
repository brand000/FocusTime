import React, {useState} from 'react';
import { View, Text, StyleSheet, Vibration, Platform } from 'react-native';

import { colors } from "../../utils/colors";
import { spacing } from "../../utils/sizes";
import { Countdown } from "../../component/countdown";
import { RoundedButton } from "../../component/RoundedButton";
import { ProgressBar } from "react-native-paper";
import { Timing } from "./Timing";

const DEFAULT_TIME =5;
export const Timer = ({ addSubject, onTimerEnd, clearSubject }) => {
  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  const onProgress = (progress)=> {
    setProgress(progress)
  }

  const vibrate = ()=> {
      if(Platform.OS === 'ios'){
        const interval = setInterval(()=> Vibration.vibrate(), 1000);
        setTimeout(()=> clearInterval(interval), 1000);
      } else{
        Vibration.vibrate(10000);
      }
    }
    
  const changeTime = (min) =>{
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
    
  }
  
  
  
  const onEnd = ()=> {
    vibrate();
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  }

  return (
    <View style={styles.container}>
      <View style={styles.clock}>
       <Countdown minutes={minutes} isPaused={!isStarted} onProgress={onProgress} onEnd={onEnd} />
      </View>
      <View style={styles.focusList}>
        <Text style={styles.title}> focusing on:</Text>
        <Text style={styles.task}> {addSubject} </Text>
      </View>
      <View style={styles.progressWrapper}>
        <ProgressBar color="#5E84E2" style={styles.progressBar} progress={progress}/>
      </View>
      <View style={styles.buttonWrapper}>
        <Timing onChangeTime={changeTime} />
      </View>
      <View style={styles.buttonWrapper}>
      { isStarted ? (
        < RoundedButton title= "pause" onPress={()=> setIsStarted(false)}/> 
      ) : (
        < RoundedButton title= "start" onPress={()=> setIsStarted(true)}/>
      )}
      </View>
      <View style={styles.clearSubject}>
        <RoundedButton title='stop' size={60} onPress={()=> clearSubject()}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title :{
    color: colors.white,
    textAlign: 'center'
  },
  task:{
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  focusList:{
    marginTop: spacing.xxl
  },
  clock:{
   alignItems: "center",
   justifyContent: "center"
  },
  buttonWrapper:{
    flex: 0.3,
    flexDirection: 'row', 
    padding:15,
    justifyContent: "center",
    alignItems: "center"
  },
  progressBar:{
    height: 10,
  },
  progressWrapper:{
    paddingTop: spacing.sm 
  },
  clearSubject:{
    paddingBottom: 25,
    paddingLeft: 25
  }
});

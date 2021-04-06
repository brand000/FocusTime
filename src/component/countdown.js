import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet} from "react-native";
import { useKeepAwake } from "expo-keep-awake";

import { fontSize, paddingSize, size, spacing } from "../utils/sizes";
import { colors } from "../utils/colors";

const minToMills =(minutes)=> minutes * 1000 * 60;
const formatTime =(time)=> time<10 ? `0${time}` : time;

export const Countdown =({
  minutes = 0.5,
  isPaused,
  onProgress,
  onEnd
})=>{
  const interval = React.useRef(null);
  const [millis, setMillis] = useState(minToMills(minutes));

  const minute = Math.floor(millis / 1000 / 60) % 60;
  const second = Math.floor(millis / 1000) % 60;

  

  const countdown = () => { 
    setMillis((time)=>{
      if(time === 0) {
        clearInterval(interval.current);    
        return time;
      }
      const  timeleft = time - 1000;
      
      return timeleft;
    })
  }

  useEffect(()=>{
    onProgress(millis / minToMills(minutes))
    if(millis === 0 ) onEnd();
  },[millis])

  useEffect(()=>{
    setMillis(minToMills(minutes));
  },[minutes])

  useEffect(() => {
      if(isPaused){
        if (interval.current) clearInterval(interval.current);
        return;
      }
      interval.current = setInterval(countdown, 1000);

      return ()=> clearInterval(interval.current)
    },[isPaused])

    return (
      <Text style={styles.text}>{formatTime(minute)} : {formatTime(second)}</Text>
    );
  }

  const styles = StyleSheet.create({
    text:{
      fontSize: fontSize.xxl,
      fontWeight: 'bold',
      color: colors.white,
      padding: spacing.lg,
      backgroundColor: 'rgba(94,132,226,0.3)'
    }
})
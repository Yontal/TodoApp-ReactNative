import React, { useEffect, useState } from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { loginAnonymously } from "../store/actions/auth";
import * as firebase from "firebase";

const AuthScreen = (props) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(loginAnonymously());
    const subscriber = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setLoading(false);
      } else {
        console.log("user null");
      }
    });
  }, []);

  useEffect(() => {
    if (!loading) {
      props.navigation.navigate("App");
    }
  }, [loading]);
  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <ActivityIndicator size="large" color="#000000" />
    </View>
  );
};

export default AuthScreen;

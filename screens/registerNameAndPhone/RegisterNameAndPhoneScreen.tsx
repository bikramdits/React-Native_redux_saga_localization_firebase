import React, { useState, useCallback, useEffect } from "react";
import {
  Text,
  View,
  Keyboard,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { Options } from "react-native-navigation";
import FastImage from "react-native-fast-image";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import i18n from "i18n-js";
import messaging from "@react-native-firebase/messaging";

import styles from "./styles";
import { waitForRenderOptions } from "../../utils/navigationUtils";
import imgs from "../../assets/imgs/imgs";
import LoadingButton from "../../components/LoadingButton/LoadingButton";

import { getFirebasePhoneAuth } from "../../store/firebase/actions";
import DismissKeyboard from "../../components/DismissKeyboard/DismissKeyboard";
import PhoneInput from "../../components/PhoneInput/PhoneInput";
import { onInputChange } from "./utils";
import Agreement from "../../components/Agreement/Agreement";
import { phoneNumberLoadingSelector } from "../../store/firebase/selectors";
import { ThrottleNavigation } from "../../utils/ThrottleNavigation";
import { REGISTER_NAME_AND_PHONE } from "../names";
import { registration } from "../../store/auth/actions";

async function requestUserPermission() {
  await messaging().requestPermission();
  if (!messaging().isDeviceRegisteredForRemoteMessages) {
    await messaging().registerDeviceForRemoteMessages();
  }
}

const PHONE_NUMBER_LENGTH = 12;

interface PropsType {
  componentId?: string;
}

const defaultProps: PropsType = {};

function RegisterNameAndPhoneScreen({ componentId }: PropsType) {
  const [{ phoneNumber, phoneNumberFormat }, setPhoneNumber] = useState({
    phoneNumber: "",
    phoneNumberFormat: "+1",
  });
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [isAgree, setIsAgree] = useState(false);
  const onAgreeHandler = useCallback(() => {
    setIsAgree((prevState) => !prevState);
  }, []);
  const dispatch = useDispatch();
  const loading = useSelector(phoneNumberLoadingSelector);

  const phoneUS = parsePhoneNumberFromString(phoneNumber, "US");
  const phoneUA = parsePhoneNumberFromString(phoneNumber, "UA");

  useEffect(() => {
    dispatch(registration.start());
  }, []);

  const isValidPhoneNumber =
    (phoneUS && phoneUS.isValid()) || (phoneUA && phoneUA.isValid()); //hardcoded true
  const maxLength = //hardcoded UA
    phoneNumberFormat.toString().startsWith("1") ||
    phoneNumberFormat.toString().startsWith("3")
      ? 18
      : 16;

  const showMessage =
    phoneNumber.length >= PHONE_NUMBER_LENGTH && !isValidPhoneNumber;

  const onButtonPressHandler = useCallback(() => {
    Keyboard.dismiss();
    requestUserPermission().then(() => {
      dispatch(
        getFirebasePhoneAuth.request({
          phoneNumber: phoneNumberFormat,
          componentId,
          isRegister: true,
          first_name: fName,
          last_name: lName,
        })
      );
    });
  }, [phoneNumberFormat, fName, lName]);

  const onInputChangeHandler = useCallback(
    (phone) => onInputChange(phone, setPhoneNumber),
    [setPhoneNumber]
  );

  const nexPossible = !isValidPhoneNumber || !isAgree || !fName || !lName;


   
  return (
    <KeyboardAvoidingView style={styles.keyboard} behavior="padding">
      <DismissKeyboard>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => ThrottleNavigation.pop(componentId)}
          >
            <FastImage
              source={imgs.backButton}
              style={styles.backButtonImage}
              resizeMode={FastImage.resizeMode.contain}
            />
          </TouchableOpacity>
          <ScrollView>
            <Text style={styles.title}>{"Enter your name and phone"}</Text>
            <View style={styles.inputContainer}>
              <TextInput
                value={fName}
                onChangeText={setFName}
                style={styles.textInput}
                placeholder={"First name"}
              />
              <View style={styles.separator} />
            </View>
            <View style={[styles.inputContainer, { marginTop: 24 }]}>
              <TextInput
                value={lName}
                onChangeText={setLName}
                style={styles.textInput}
                placeholder={"Last name"}
              />
              <View style={styles.separator} />
            </View>

            <View style={styles.phoneInputContainer}>
              <Text style={styles.subTitlePhoneInput}>
                {"Your phone number"}
              </Text>
              <PhoneInput
                value={phoneNumberFormat}
                onChangeText={onInputChangeHandler}
                placeholder={"Your phone number"}
                message={
                  showMessage && i18n.t("phone_number_validation_error_unvalid")
                }
                maxLength={maxLength}
              />
            </View>
          </ScrollView>

          <View style={styles.buttonContainer}>
            <Agreement
              componentId={componentId}
              isCheck={isAgree}
              onAgree={onAgreeHandler}
            />
            <LoadingButton
              loading={loading}
              isInactive={nexPossible}
              onPress={onButtonPressHandler}
              disabled={nexPossible}
            >
              <Text style={styles.buttonText}>{i18n.t("next")}</Text>
            </LoadingButton>
          </View>
        </View>
      </DismissKeyboard>
    </KeyboardAvoidingView>
  );
}

RegisterNameAndPhoneScreen.defaultProps = defaultProps;
RegisterNameAndPhoneScreen.options = (): Options => ({
  ...waitForRenderOptions(),
  topBar: {
    visible: false,
  },
  statusBar: {
    backgroundColor: "white",
    style: "dark",
  },
});

export function openRegisterNameAndPhoneScreen({
  componentId,
}: {
  componentId: string;
}) {
  ThrottleNavigation.push(componentId, {
    component: { name: REGISTER_NAME_AND_PHONE },
  }).catch();
}

export default RegisterNameAndPhoneScreen;

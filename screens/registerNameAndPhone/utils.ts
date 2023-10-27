import { Dispatch, SetStateAction } from "react";

export function onInputChange(
  phoneNumberFormat: string,
  setPhoneNumber: Dispatch<
    SetStateAction<{
      phoneNumber: string;
      phoneNumberFormat: string;
    }>
  >
) {
  const phoneNumber = phoneNumberFormat.toString().replace(/[\D+]/g, "");
  if (phoneNumberFormat === "+1 000") {
    return setPhoneNumber({ phoneNumber: "", phoneNumberFormat: "+3" });
  }
  if (phoneNumberFormat === "+3 000") {
    return setPhoneNumber({ phoneNumber: "", phoneNumberFormat: "+1" });
  }
  setPhoneNumber((prevState) => {
    if (
      prevState.phoneNumberFormat.length === 2 &&
      phoneNumberFormat.length < 2
    ) {
      return prevState;
    }
    return {
      ...prevState,
      phoneNumber,
      phoneNumberFormat,
    };
  });
}

import { post } from "./axiosBase";
import { SIGNUP_PATIENT } from "./endpoints";
import { IRegistrationRequest, IPatient } from "./data/IRegistration";

export const authAPI = {
  register: (data: IRegistrationRequest) =>
    post<IRegistrationRequest, IPatient>(SIGNUP_PATIENT, data),

};

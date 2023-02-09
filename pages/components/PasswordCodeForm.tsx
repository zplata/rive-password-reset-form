import { useEffect, useState } from "react";
import OTPInput from "./OTPInput";
import styles from "@/styles/Form.module.css";
import { type StateMachineInput } from "@rive-app/react-canvas";

interface PasswordCodeFormProps {
  setHasSubmittedPasscode: (value: boolean) => void;
  riveInputs?: StateMachineInput[];
}

const PasswordCodeForm = ({
  setHasSubmittedPasscode,
  riveInputs,
}: PasswordCodeFormProps) => {
  const [val, setVal] = useState("");
  const onChange = (value: string) => setVal(value);
  const [notVerifyInput, setNotVerifyInput] = useState<StateMachineInput>();

  useEffect(() => {
    if (!notVerifyInput) {
      setNotVerifyInput(
        riveInputs?.find((input) => input.name === "notVerified")!
      );
    }
  }, [riveInputs, notVerifyInput]);

  useEffect(() => {
    if (val.trim().length === 4) {
      // Shh...secret code
      if (parseInt(val) === 1234) {
        setHasSubmittedPasscode(true);
      } else {
        notVerifyInput!.fire();
      }
    }
  }, [val, setHasSubmittedPasscode, notVerifyInput]);
  return (
    <>
      <p className={styles.otpPrompt}>Enter One Time Password</p>
      <OTPInput value={val} valueLength={4} onChange={onChange} />
    </>
  );
};

export default PasswordCodeForm;

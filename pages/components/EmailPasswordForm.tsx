import React, { useEffect, useState } from "react";
import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import Button from "@mui/material/Button";
import { isEmail } from "../utils/email-validator";
import { FieldError } from "react-hook-form";
import { styled } from "@mui/material/styles";
import { type StateMachineInput } from "@rive-app/react-canvas";

import styles from "@/styles/Form.module.css";

interface EmailPasswordFormProps {
  setHasSubmittedEmail: (value: boolean) => void;
  riveInputs?: StateMachineInput[];
}

const CssTextField = styled(TextFieldElement)({
  "&.MuiFormControl-root": {
    borderColor: "white",
    color: "white",
    "& label": {
      color: "white",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "& > .MuiOutlinedInput-root:hover:not(.Mui-error) fieldset": {
      borderColor: "white",
    },
    "& input": {
      color: "white",
    },
  },
});

const EmailPasswordForm = ({
  setHasSubmittedEmail,
  riveInputs,
}: EmailPasswordFormProps) => {
  const [email, setEmail] = useState("");
  const [typingInput, setTypingInput] = useState<StateMachineInput>();
  const [rejectedEmailInput, setRejectedEmailInput] =
    useState<StateMachineInput>();
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = () => {
    if (isEmail(email)) {
      setHasSubmittedEmail(true);
    } else {
      rejectedEmailInput!.fire();
    }
  };

  const parseError = (error: FieldError) => {
    if (error.message === errorMessage) {
      return error.message;
    } else {
      const errMsg = error.message || "";
      setErrorMessage(errMsg);
      rejectedEmailInput!.fire();
      return errMsg;
    }
  };

  useEffect(() => {
    if (!typingInput) {
      setTypingInput(riveInputs?.find((input) => input.name === "isTyping")!);
      setRejectedEmailInput(
        riveInputs?.find((input) => input.name === "rejectEmail")!
      );
    }
  }, [riveInputs, typingInput]);

  return (
    <FormContainer onSuccess={() => validateEmail()}>
      <p className={styles.promptText}>
        Get a one-time passcode to reset your password
      </p>
      <CssTextField
        type="email"
        parseError={parseError}
        required
        value={email}
        onFocus={() => {
          if (!typingInput?.value) {
            typingInput!.value = true;
          }
        }}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        margin="dense"
        label="Email"
        name="name"
        fullWidth
      />
      <Button
        className={styles.sendButton}
        type="submit"
        color="primary"
        variant="contained"
      >
        Send Email
      </Button>
    </FormContainer>
  );
};

export default EmailPasswordForm;

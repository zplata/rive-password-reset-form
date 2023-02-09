import { useEffect } from "react";
import Head from "next/head";
import {
  EmailPasswordForm,
  PasswordCodeForm,
  RiveBackground,
} from "./components";

import { useRiveWrapper } from "./hooks";

import styles from "@/styles/Home.module.css";
import Button from "@mui/material/Button";
import { useState } from "react";
import { type StateMachineInput } from "@rive-app/react-canvas";

export default function Home() {
  // State variables to display certain parts of the form
  const [hasStarted, setHasStarted] = useState(false);
  const [hasSubmittedEmail, setHasSubmittedEmail] = useState(false);
  const [hasSubmittedPasscode, setHasSubmittedPasscode] = useState(false);

  // Rive API object, React component, and state machine inputs
  const { rive, RiveComponent } = useRiveWrapper();
  const [smInputs, setSMInputs] = useState<StateMachineInput[]>();

  useEffect(() => {
    if (rive && !smInputs) {
      const inputs = rive.stateMachineInputs(
        "Forget Machine"
      ) as StateMachineInput[];
      const signInInput = inputs.find((input) => input.name === "signIn");
      signInInput?.fire();
      setSMInputs(inputs);
    }
  }, [rive, smInputs]);

  useEffect(() => {
    if (!rive || !smInputs?.length) {
      return;
    }
    if (hasStarted) {
      const startInput = smInputs.find((input) => input.name === "forget");
      startInput?.fire();
    }
  }, [hasStarted, rive, smInputs]);

  useEffect(() => {
    if (!rive || !smInputs?.length) {
      return;
    }
    if (hasSubmittedEmail) {
      const acceptEmailInput = smInputs.find(
        (input) => input.name === "acceptEmail"
      );
      acceptEmailInput?.fire();
    }
  }, [hasSubmittedEmail, rive, smInputs]);

  useEffect(() => {
    if (!rive || !smInputs?.length) {
      return;
    }
    if (hasSubmittedPasscode) {
      const verifiedInput = smInputs.find((input) => input.name === "verified");
      verifiedInput?.fire();
    }
  }, [hasSubmittedPasscode, rive, smInputs]);

  return (
    <>
      <Head>
        <title>Reset Password Form</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <RiveBackground className={styles.riveBackground} />
        <div className={styles.center}>
          <div className={styles.riveHead}>
            <RiveComponent />
          </div>
          {!hasStarted && (
            <div className={styles.startResetForm}>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                onClick={() => setHasStarted(true)}
              >
                Reset Password
              </Button>
            </div>
          )}
          {hasStarted && !hasSubmittedEmail && (
            <EmailPasswordForm
              riveInputs={smInputs}
              setHasSubmittedEmail={setHasSubmittedEmail}
            />
          )}
          {hasStarted && hasSubmittedEmail && !hasSubmittedPasscode && (
            <PasswordCodeForm
              riveInputs={smInputs}
              setHasSubmittedPasscode={setHasSubmittedPasscode}
            />
          )}
          {hasStarted && hasSubmittedEmail && hasSubmittedPasscode && (
            <p className={styles.endMessage}>
              All good to go! Lets reset that password
            </p>
          )}
        </div>
      </main>
    </>
  );
}

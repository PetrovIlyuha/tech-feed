import React, { useState, useContext } from "react";
import { FirebaseContext } from "../../firebase";

function ForgotPassword() {
  const { firebase } = useContext(FirebaseContext);
  const [resetPasswordEmail, setResetPasswordEmail] = useState("");
  const [isPasswordResetSuccess, setIsPasswordResetSuccess] = useState(false);
  const [passResetErr, setPassResetErr] = useState(null);
  const handleResetPassword = async () => {
    try {
      await firebase.resetPassword(resetPasswordEmail);
      setIsPasswordResetSuccess(true);
      setPassResetErr(null);
    } catch (err) {
      setPassResetErr(err);
      setIsPasswordResetSuccess(false);
      console.error("Error sending email", err);
    }
  };
  return (
    <div>
      <input
        style={{ marginTop: 20 }}
        type="email"
        className="custom-input"
        placeholder="Where to send reset link?"
        value={resetPasswordEmail}
        onChange={(e) => setResetPasswordEmail(e.target.value)}
      />
      <div>
        <button
          style={{ marginTop: 20 }}
          className="button custom-button"
          onClick={handleResetPassword}
        >
          Reset Password
        </button>
      </div>
      {isPasswordResetSuccess && (
        <p>Check your inbox for the link to reset password!</p>
      )}
      {passResetErr && <p className="error-text">{passResetErr.message}</p>}
    </div>
  );
}

export default ForgotPassword;

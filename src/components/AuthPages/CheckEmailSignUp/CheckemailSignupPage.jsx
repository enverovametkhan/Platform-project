import React, { useEffect } from "react";

function CheckemailSignupPage() {
  useEffect(() => {
    console.log("CheckemailSignupPage component mounted");

    return () => {
      console.log("CheckemailSignupPage component unmounted");
    };
  }, []);

  return (
    <div>
      <p>Check your email.</p>
      <p>A link has been sent to your email to Sign up.</p>
    </div>
  );
}

export default CheckemailSignupPage;

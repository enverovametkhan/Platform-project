import React, { useEffect } from "react";

function CheckEmailPassPage() {
  useEffect(() => {
    console.log("CheckEmailPassPage component mounted");

    return () => {
      console.log("CheckEmailPassPage component unmounted");
    };
  }, []);
  return (
    <div>
      <p>Check your email.</p>
      <p>A link has been sent to your email to reset your password.</p>
    </div>
  );
}

export default CheckEmailPassPage;

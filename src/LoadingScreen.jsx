import React from "react";
import { Audio } from "react-loader-spinner";

export default function LoadingScreen() {
  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Audio
          height="80"
          width="80"
          radius="9"
          color="wheat"
          ariaLabel="loading"
          wrapperStyle
          wrapperClass
        />
      </div>
    </>
  );
}

/* eslint-disable react/prop-types */
import { Alert } from "@mui/material";

const AlertCard = ({ message }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "300px",
        width: "100%",
      }}
    >
      <Alert
        variant="filled"
        severity="success"
        sx={{
          maxWidth: "200px",
          height: "80px",
          marginLeft: "auto",
          marginRight: "auto",
          zIndex: 999,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {message}
      </Alert>
    </div>
  );
};

export default AlertCard;

import * as mui from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function Achievements() {
  const [exerciseName, setExerciseName] = useState("");

  return (
    <>
      <div className="h-[425px]  flex items-center justify-center">
        <mui.FormControl
          sx={{ width: "50ch", flex: "flex", alignItems: "center" }}
        >
          <div className="flex items-center justify-center">
            <mui.TextField
              label="ExerciseName"
              variant="outlined"
              type="text"
              sx={{ margin: 1, width: "30ch" }}
              onChange={(e) => setExerciseName(e.target.value)}
              value={exerciseName}
            />
            <mui.Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              sx={{
                margin: 1,
                height: "50px",
                width: "20ch",
                fontSize: "16px",
              }}
            >
              Upload files
              <VisuallyHiddenInput
                type="file"
                onChange={(event) => console.log(event.target.files)}
                multiple
              />
            </mui.Button>
          </div>

          <mui.Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            sx={{
              margin: 1,
              height: "50px",
              width: "45ch",
              fontSize: "18px",
            }}
          >
            Submit
          </mui.Button>
        </mui.FormControl>
      </div>
    </>
  );
}

export default Achievements;

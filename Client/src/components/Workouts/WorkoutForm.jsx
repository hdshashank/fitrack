import { useState } from "react";
import * as mui from "@mui/material";
import { useWorkoutsContext } from "../../hooks/useWorkoutsContext";
import { useAuthContext } from "../../hooks/useAuthContext";

function WorkoutForm() {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [reps, setReps] = useState("");
  const [sets, setSets] = useState("");
  const [weight, setWeight] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!user) {
      setError("You must be logged in");
      return;
    }

    if (!title || !reps || !sets || !weight) {
      setError("Please fill in all fields");
      return;
    }

    const workout = { title, reps, sets, weight };
    const response = await fetch("http://localhost:4000/workouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(workout),
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setEmptyFields([]);
      setTitle("");
      setReps("");
      setSets("");
      setWeight("");
      setError(null);
      dispatch({ type: "CREATE_WORKOUT", payload: json });
      setSnackbarOpen(true);
      setLoading(false);
    }
  };

  return (
    <div className="h-[425px] w-[400px] bg-snowWhite rounded-2xl shadow-5xl">
      <div className="h-[425px] flex items-center justify-center">
        <mui.FormControl sx={{ width: "40ch" }}>
          <mui.TextField
            label="Exercise Title"
            variant="outlined"
            type="text"
            sx={{ margin: 1 }}
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className={emptyFields.includes("title") ? "error" : ""}
          />
          <mui.TextField
            label="Reps"
            variant="outlined"
            type="number"
            sx={{ margin: 1 }}
            onChange={(e) => setReps(e.target.value)}
            value={reps}
            className={emptyFields.includes("reps") ? "error" : ""}
          />
          <mui.TextField
            label="Sets"
            variant="outlined"
            type="number"
            sx={{ margin: 1 }}
            onChange={(e) => setSets(e.target.value)}
            value={sets}
            className={emptyFields.includes("sets") ? "error" : ""}
          />
          <mui.TextField
            label="Weight"
            variant="outlined"
            type="number"
            sx={{ margin: 1 }}
            onChange={(e) => setWeight(e.target.value)}
            value={weight}
            className={emptyFields.includes("weight") ? "error" : ""}
          />

          <mui.Button
            variant="contained"
            sx={{ margin: 2.5, height: 42, fontSize: "18px" }}
            onClick={handleSubmit}
            disabled={loading}
          >
            Add Workout
          </mui.Button>
          {error && (
            <p className="bg-red-200 rounded-md border-2 relative left-20 bottom-2 flex items-center justify-center border-red-700 w-[200px] h-[40px] p-2 tracking-wider">
              {error}
            </p>
          )}
        </mui.FormControl>
        <mui.Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          message="Workout added successfully"
        />
      </div>
    </div>
  );
}

export default WorkoutForm;

import WorkoutForm from "../components/Workouts/WorkoutForm";
import WorkoutDetails from "../components/Workouts/WorkoutDetails";
import { useEffect, useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import error from "../assets/pictures/error.svg";
import ExerciseForm from "../components/WorkoutPlan/ExerciseForm";
import ExercisesPage from "../components/ExercisesList/ExercisesPage";

function Workouts() {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
  };
  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch(
        "https://vultr-fitrack.onrender.com/workouts",
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };

    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]);

  const filteredWorkouts = workouts
    ? workouts.filter((workout) => {
        const workoutDate = dayjs(workout.date).format("YYYY-MM-DD");
        return workoutDate === selectedDate.format("YYYY-MM-DD");
      })
    : [];
  return (
    <>
      <div className="flex items-center justify-center h-[93vh] bg-transparent gap-8">
        <div className="bg-snowWhite h-[825px] w-[1400px] rounded-xl flex flex-col items-center shadow-5xl">
          <div className="flex flex-col items-center bg-transparent w-[400px] h-[150px] justify-evenly relative top-6">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Date picker"
                inputFormat="MM/DD/YYYY"
                value={selectedDate}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} />}
                sx={{ width: "40ch" }}
              />
            </LocalizationProvider>
            <p className="text-xl font-black tracking-wide text-frenchBlue">
              Workouts logged on {selectedDate.format("MM/DD/YYYY")}
            </p>
          </div>
          <div className="flex flex-wrap gap-6 mt-10 ml-7">
            {filteredWorkouts.length > 0 ? (
              filteredWorkouts.map((workout) => (
                <WorkoutDetails key={workout._id} workout={workout} />
              ))
            ) : (
              <div className="relative flex flex-col gap-16 top-16">
                <p className="text-3xl font-black tracking-wider">
                  No workouts found for the selected date.
                </p>
                <img src={error} alt="" style={{ height: "200px" }} />
              </div>
            )}
          </div>
        </div>
        <WorkoutForm />
      </div>
      <div className="flex items-center justify-center w-full h-full">
        <ExerciseForm />
      </div>

      <ExercisesPage />
    </>
  );
}

export default Workouts;

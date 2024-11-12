/* eslint-disable no-unused-vars */

import NutritionPlan from "./NutritionPlan";
import { useState } from "react";
import * as mui from "@mui/material";
import Loader2 from "../Loaders/Loader2";
import Loader1 from "../Loaders/Loader1";
import Loader from "../ExercisesList/Loader";

function NutritionForm() {
  const [nutritionPlan, setNutritionPlan] = useState(null);
  const [showResult, setShowResult] = useState("hidden");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [dietaryPreferences, setDietaryPreferences] = useState("");
  const [foodtype, setFoodtype] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [fitnessGoal, setFitnessGoal] = useState("");
  const [allergies, setAllergies] = useState("");
  const [region, setRegion] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [loading, setLoading] = useState(false);

  const gen = [
    {
      value: "male",
      label: "MALE",
    },
    {
      value: "female",
      label: "FEMALE",
    },
  ];

  const dietPref = [
    {
      value: "high-protien",
      label: "High-Protien",
    },
    {
      value: "keto",
      label: "Keto",
    },
    {
      value: "high-carb",
      label: "High-Carb",
    },
    {
      value: "balanced",
      label: "Balanced",
    },
  ];

  const foodTyp = [
    {
      value: "vegetarian",
      label: "Vegetarian",
    },
    {
      value: "vegan",
      label: "Vegan",
    },
    {
      value: "non-vegetarian",
      label: "Non-Vegetarian",
    },
  ];

  const actLvl = [
    {
      value: "sedentary",
      label: "Sedentary",
    },
    {
      value: "light",
      label: "Light",
    },
    {
      value: "moderate",
      label: "Moderate",
    },
    {
      value: "active",
      label: "Active",
    },
    {
      value: "very-active",
      label: "Very Active",
    },
  ];

  const fitGoal = [
    {
      value: "muscle-gain",
      label: "Muscle Gain",
    },
    {
      value: "weight-loss",
      label: "Weight Loss",
    },
    {
      value: "maintain",
      label: "Maintain",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (
      !height ||
      !weight ||
      !age ||
      !gender ||
      !dietaryPreferences ||
      !foodtype ||
      !activityLevel ||
      !fitnessGoal ||
      !allergies ||
      !region
    ) {
      setError("Please fill in all fields");
      return;
    }

    const values = {
      height,
      weight,
      age,
      gender,
      dietaryPreferences,
      foodtype,
      activityLevel,
      fitnessGoal,
      allergies,
      region,
    };
    const response = await fetch(
      "http://localhost:4000/nutrition/recommendations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );
    if (!response.ok) {
      setError(result.error);
      setEmptyFields(result.emptyFields);
    }

    const result = await response.json();
    console.log(result);
    setNutritionPlan(result);
    setShowResult("block");
    setLoading(false);
  };
  return (
    <>
      <div className="flex items-center justify-center w-[70%] h-full my-4">
        <div
          className={`w-[500px] bg-snowWhite shadow-5xl h-[850px] flex flex-col items-center ${
            showResult == "block" ? "rounded-tl-xl rounded-bl-xl" : "rounded-xl"
          }`}
        >
          <h1 className="pt-2 text-3xl font-bold text-frenchBlue">
            Generate Nutrition Plan
          </h1>
          <div className="flex flex-col items-center justify-center w-full h-full ">
            <mui.FormControl className="flex h-[790px] w-[350px] justify-evenly ">
              <mui.TextField
                label="Height (cm)"
                variant="outlined"
                type="number"
                InputProps={{
                  inputProps: { min: 0 },
                }}
                onChange={(e) => setHeight(e.target.value)}
                value={height}
                name="height"
              />

              <mui.TextField
                label="Weight (kg)"
                variant="outlined"
                type="number"
                InputProps={{
                  inputProps: { min: 0 },
                }}
                onChange={(e) => setWeight(e.target.value)}
                value={weight}
                name="weight"
              />

              <mui.TextField
                label="Age"
                variant="outlined"
                type="number"
                InputProps={{
                  inputProps: { min: 0 },
                }}
                onChange={(e) => setAge(e.target.value)}
                value={age}
                name="age"
              />

              <mui.TextField
                select
                label="Gender"
                onChange={(e) => setGender(e.target.value)}
              >
                {gen.map((option) => (
                  <mui.MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </mui.MenuItem>
                ))}
              </mui.TextField>

              <mui.TextField
                select
                label="Dietary Preferences"
                onChange={(e) => setDietaryPreferences(e.target.value)}
              >
                {dietPref.map((option) => (
                  <mui.MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </mui.MenuItem>
                ))}
              </mui.TextField>

              <mui.TextField
                select
                label="Food Type"
                onChange={(e) => setFoodtype(e.target.value)}
              >
                {foodTyp.map((option) => (
                  <mui.MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </mui.MenuItem>
                ))}
              </mui.TextField>

              <mui.TextField
                select
                label="Activity Level"
                onChange={(e) => setActivityLevel(e.target.value)}
              >
                {actLvl.map((option) => (
                  <mui.MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </mui.MenuItem>
                ))}
              </mui.TextField>

              <mui.TextField
                select
                label="Fitness Goal"
                onChange={(e) => setFitnessGoal(e.target.value)}
              >
                {fitGoal.map((option) => (
                  <mui.MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </mui.MenuItem>
                ))}
              </mui.TextField>

              <mui.TextField
                label="Allergies"
                variant="outlined"
                onChange={(e) => setAllergies(e.target.value)}
                value={allergies}
                name="allergies"
              />

              <mui.TextField
                label="Region"
                variant="outlined"
                onChange={(e) => setRegion(e.target.value)}
                value={region}
                name="region"
              />

              <mui.Button
                variant="contained"
                onClick={handleSubmit}
                sx={{ height: 42, fontSize: "18px", fontWeight: "bold" }}
                disabled={loading}
              >
                Generate Plan
              </mui.Button>
            </mui.FormControl>
          </div>
        </div>
        <div
          className={`${
            loading
              ? "block h-[94vh] absolute z-50 w-screen bg-black bg-opacity-20 "
              : "hidden"
          }`}
        >
          <div className="flex items-center justify-center h-full">
            <Loader2 />
          </div>
        </div>
        <div
          className={`${
            showResult == "block"
              ? "bg-snowWhite w-[500px] rounded-tr-lg rounded-br-lg shadow-5xl h-[850px] flex justify-center"
              : "hidden"
          }`}
        >
          {nutritionPlan && <NutritionPlan plan={JSON.parse(nutritionPlan)} />}
        </div>
      </div>
    </>
  );
}

export default NutritionForm;

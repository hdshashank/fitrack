import { Link, useLocation } from "react-router-dom";
import * as mui from "@mui/material";
import { useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const tabs = [
    { label: "Home", path: "/", value: 0 },
    { label: "Calculators", path: "/calculators", value: 1 },
    { label: "Nutrition", path: "/nutrition", value: 2 },
    { label: "Workouts", path: "/workouts", value: 3 },
    { label: "Pose Detection", path: "/poseDetection", value: 4 },
  ];

  const activeStyle = {
    fontWeight: "bold",
  };

  const [colorChange, setColorchange] = useState(false);
  const scrolled = () => {
    if (window.scrollY >= 80) {
      setColorchange(true);
    } else {
      setColorchange(false);
    }
  };
  window.addEventListener("scroll", scrolled);

  const currentTabValue =
    tabs.find((tab) => tab.path === location.pathname)?.value ?? false;

  return (
    <>
      <div>
        <mui.Tabs
          centered
          value={currentTabValue}
          TabIndicatorProps={{
            sx: {
              height: "3px",
              bottom: 6,
            },
          }}
        >
          {tabs.map((tab) => (
            <mui.Tab
              key={tab.value}
              label={tab.label}
              component={Link}
              to={tab.path}
              value={tab.value}
              style={location.pathname === tab.path ? activeStyle : {}}
              sx={{
                fontSize: "22px",
                padding: "6px 16px",
                ...(colorChange ? { color: "black" } : { color: "gray" }),
                transition: "0.5s",
                transitionBehavior: "smooth",
                minHeight: "20px",
              }}
            />
          ))}
        </mui.Tabs>
      </div>
    </>
  );
}

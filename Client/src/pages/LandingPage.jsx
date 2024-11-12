import HeroSlider from "../components/HeroSlider";
import { Link } from "react-router-dom";
import about from "../assets/pictures/about.jpg";
import { useAuthContext } from "../hooks/useAuthContext";

function LandingPage() {
  const { user } = useAuthContext();

  return (
    <>
      <div className="h-[93vh] w-full ">
        <HeroSlider />
        <div
          className="h-[500px] w-[1400px] bg-white bg-opacity-10 left-[50%]
        top-[50%] -translate-x-2/4 -translate-y-2/4 absolute flex flex-col gap-8 
        items-center justify-center rounded-lg  backdrop-blur-md"
        >
          <h1 className="font-black text-center uppercase text-9xl text-frenchBlue">
            {!user && <Link to="/signup">JOIN US NOW!!</Link>}
            {user && (
              <Link>
                Welcome Aboard,{"\n"} {user.name}!
              </Link>
            )}
          </h1>
          <p className="text-4xl font-bold text-russet">
            {!user && <q>Unlock your true potential!!!</q>}
            {user && <q>Let&apos;s make it happen.</q>}
          </p>
        </div>
      </div>
      <div className="h-[55vh] w-full  bg-black">
        <section className="h-[52vh] w-full bg-snowWhite p-10 gap-24 flex items-center justify-center">
          <div className="h-[500px] w-[750px]  p-4 flex flex-col items-start justify-center">
            <h2 className="text-[50px] max-w-[700px] text-frenchBlue font-black mb-2">
              WELCOME TO FITRACK
            </h2>
            <p className="text-2xl max-w-[730px] text-russet font-semibold">
              Welcome to FITRACK, your personal fitness companion! Customize
              your workout plans, track your progress, and achieve your fitness
              goals with ease. Our platform ensures that your data is securely
              stored and accessible only to you. Sign up today to start your
              fitness journey and take control of your health with tailored
              workout routines and detailed logging features. Let&apos;s get fit
              together!{" "}
            </p>
          </div>
          <div>
            <img
              src={about}
              alt="pic"
              className="rounded-3xl h-[400px] shadow-4xl"
            />
          </div>
        </section>
      </div>
    </>
  );
}

export default LandingPage;

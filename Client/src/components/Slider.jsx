import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";
import login1 from "../assets/hero/hero2.jpg";
import login2 from "../assets/login/login2.avif";
import login3 from "../assets/login/login3.jpg";

function HeroSlider() {
  const AutoplaySlider = withAutoplay(AwesomeSlider);
  return (
    <div className="min-h-full min-w-[100vw] bottom-0 -z-10 absolute brightness-[.2] ">
      <AutoplaySlider
        play={true}
        cancelOnInteraction={false} // should stop playing on user interaction
        interval={2500}
        bullets={false}
        buttons={false}
      >
        <div data-src={login1} />
        <div data-src={login2} />
        <div data-src={login3} />
      </AutoplaySlider>
    </div>
  );
}

export default HeroSlider;

import { useState, useEffect, useCallback } from "react";
import { Container, Row, Col } from "react-bootstrap";
import profile from "../assets/img/profile.png";
import { ArrowRightCircle } from "react-bootstrap-icons";
import "animate.css";
import TrackVisibility from "react-on-screen";

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(300 - Math.random() * 100);

  const toRotate = ["ML Engineer", "Data Analyst", "AI Developer"];
  const period = 2000;

  // ✅ useCallback ensures 'tick' doesn't cause unnecessary re-renders
  const tick = useCallback(() => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(500);
    }
  }, [isDeleting, loopNum, text, toRotate, period]);

  // ✅ useEffect handles typing loop cleanly
  useEffect(() => {
    const ticker = setInterval(() => tick(), delta);
    return () => clearInterval(ticker);
  }, [tick, delta]);

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__fadeIn" : ""
                  }
                >
                  <span className="tagline">Welcome to my Portfolio</span>
                  <h1>
                    {`Hi! I'm Afreen - `}
                    <span className="txt-rotate">
                      <span className="wrap">{text}</span>
                    </span>
                  </h1>
                  <p>
                    I am a passionate developer with an interest in Artificial
                    Intelligence, Machine Learning, and Robotics. I love
                    exploring the intersection of AI, design, and usability,
                    crafting solutions that are not only smart but also
                    intuitive and visually engaging.
                  </p>
                  <button onClick={() => console.log("connect")}>
                    Let’s Connect <ArrowRightCircle size={25} />
                  </button>
                </div>
              )}
            </TrackVisibility>
          </Col>

          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__zoomIn" : ""
                  }
                >
                  <img src={profile} alt="Afreen Kazi" />
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

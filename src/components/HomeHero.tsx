import { Container } from "./Container";
import BrowserWindow from "./BrowserWindow";
import { FadeIn } from "./FadeIn";
import { Overline } from "./Overline";
import { Heading } from "./Heading";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useStore } from "@nanostores/react";
import { headerHeight } from "~/store";
import { useRef } from "react";
import { cn } from "~/utils/misc";
import { useMeasure } from "@uidotdev/usehooks";
import { TextBlock } from "./TextBlock";

export const HomeHero = () => {
  const $headerHeight = useStore(headerHeight);
  const [ref, { width }] = useMeasure();
  const [heroRef, { height: heroHeight }] = useMeasure();
  const target = useRef<HTMLDivElement>(null);
  const { scrollY, scrollYProgress } = useScroll({
    target,
    offset: ["start start", "end end"],
  });

  const zIndex = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.501, 1],
    [99, 99, 99, 0, 0]
  );
  const position = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.51, 1],
    ["initial", "initial", "initial", "relative", "relativce"]
  );
  const y = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 1],
    ["0%", "0%", "0%", "-100%"]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.64, 0.65],
    [1, 1, 1, 1, 0]
  );

  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 1],
    [1, 0, 0, 0]
  );
  const imgOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 1],
    [1, 1, 0, 0]
  );
  const imgScale = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 1],
    [1, 0.9, 0.9, 0.9]
  );
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.6, 0.61, 1],
    [
      "rgb(0 0 0 / 0.05)",
      "rgb(0 0 0 / 0.05)",
      "rgb(0 0 0 / 1)",
      "rgb(0 0 0 / 1)",
    ]
  );
  //   const windowScale = useTransform(
  //     scrollYProgress,
  //     [0, 0.5, 0.6, 1],
  //     [1, 1, 1.3125, 1.3125]
  //   );
  //   const windowHeight = useTransform(
  //     scrollYProgress,
  //     [0, 0.25, 0.5, 0.8, 1],
  //     [768, 768, 768, 768, 800]
  //   );
  const paddingTop = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.6, 1],
    [16, 16, 16, 0, 0]
  );

  const numItems = 8;
  return (
    <motion.div
      ref={ref}
      className=""
      style={{
        zIndex,
        position,
        // backgroundColor,
        // height: `calc(200vh - ${$headerHeight}px)`,
      }}
    >
      <div ref={target} className="relative z-50 h-[150vh]">
        <div
          className="sticky"
          style={{
            top: $headerHeight,
          }}
        >
          <motion.div
            ref={heroRef}
            className="max-md:[&>div]:!px-0 md:pt-4 max-md:overflow-hidden origin-top mx-auto"
            style={{
              //   opacity,
              //   y,
              paddingTop,
              //   scale: windowScale,
              //   height: windowHeight,
            }}
          >
            <Container>
              <BrowserWindow
                // stacked={false}
                className="max-md:rounded-t-none"
                {...{ scrollY, scrollYProgress }}
              >
                <motion.div
                  style={{
                    opacity: contentOpacity,
                  }}
                >
                  <div className="w-full min-[480px]:w-4/5 xs:w-1/2 mt-16">
                    <FadeIn>
                      <Overline>Full-Stack Web Development</Overline>
                    </FadeIn>
                    <FadeIn delay={2}>
                      <Heading
                        level={1}
                        className="md:max-w-full mb-6 text-5xl lg:text-6xl fade-in"
                      >
                        Bring your ideas to{" "}
                        <LettersPullUp
                          text="life."
                          {...{
                            delay: 2,
                            duration: 0.3,
                          }}
                        />
                      </Heading>
                    </FadeIn>
                    <FadeIn delay={4}>
                      <p className="text-background dark:text-foreground text-lg md:text-xl fade-in font-light">
                        Helping today's visionaries <em>(psst—that's you)</em>{" "}
                        build a better tomorrow by turning ideas into online
                        interactive experiences.
                      </p>
                    </FadeIn>
                  </div>
                  <FadeIn delay={5}>
                    <div className="grid gap-2 my-6 md:mt-12 sm:mb-0 self-start fade-in [--item-width:100px] md:[--item-width:160px] max-w-2xl">
                      <div
                        className="marquee fadeout-horizontal -mx-8 sm:-mx-16"
                        style={
                          {
                            "--speed": "60s",
                            "--num-items": numItems,
                          } as React.CSSProperties
                        }
                      >
                        <div className="track">
                          {Array.from({ length: numItems }).map((_, i) => (
                            <div
                              key={i}
                              className="track-item"
                              style={
                                {
                                  "--item-position": i + 1,
                                } as React.CSSProperties
                              }
                            >
                              <div className="track-item-content  px-4 animate-fade-in-out text-white bg-glass rounded-lg grid place-items-center">
                                <svg
                                  viewBox="0 0 460 160"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M65.7845 121.175C61.2669 117.045 59.948 108.368 61.8302 102.082C65.0938 106.045 69.6158 107.301 74.2996 108.009C81.5305 109.103 88.6318 108.694 95.3489 105.389C96.1173 105.011 96.8275 104.507 97.6671 103.998C98.2974 105.826 98.4614 107.672 98.2412 109.551C97.7059 114.127 95.4288 117.662 91.8069 120.341C90.3586 121.413 88.826 122.371 87.3302 123.382C82.7349 126.487 81.4916 130.129 83.2184 135.427C83.2594 135.556 83.2961 135.685 83.3889 136C81.0427 134.95 79.3288 133.421 78.023 131.411C76.6437 129.289 75.9875 126.942 75.953 124.403C75.9357 123.167 75.9357 121.92 75.7695 120.702C75.3637 117.732 73.9694 116.402 71.3425 116.325C68.6466 116.247 66.5141 117.913 65.9485 120.538C65.9054 120.739 65.8428 120.938 65.7802 121.172L65.7845 121.175Z"
                                    fill="white"
                                  />
                                  <path
                                    d="M40 101.034C40 101.034 53.3775 94.5177 66.7924 94.5177L76.9068 63.2155C77.2855 61.7017 78.3911 60.6729 79.6393 60.6729C80.8875 60.6729 81.9932 61.7017 82.3719 63.2155L92.4862 94.5177C108.374 94.5177 119.279 101.034 119.279 101.034C119.279 101.034 96.5558 39.133 96.5114 39.0088C95.8592 37.1787 94.7583 36 93.274 36H66.007C64.5227 36 63.4662 37.1787 62.7696 39.0088C62.7205 39.1307 40 101.034 40 101.034Z"
                                    fill="white"
                                  />
                                  <path
                                    d="M181.043 81.1227C181.043 86.6079 174.22 89.8838 164.773 89.8838C158.624 89.8838 156.45 88.3601 156.45 85.1604C156.45 81.8083 159.149 80.2085 165.297 80.2085C170.846 80.2085 175.569 80.2846 181.043 80.9703V81.1227ZM181.117 74.3423C177.744 73.5805 172.645 73.1234 166.572 73.1234C148.877 73.1234 140.555 77.3135 140.555 87.065C140.555 97.1975 146.253 101.083 159.449 101.083C170.621 101.083 178.193 98.2641 180.968 91.3313H181.417C181.342 93.0074 181.267 94.6834 181.267 95.9785C181.267 99.5592 181.867 99.8639 184.791 99.8639H198.587C197.837 97.7308 197.387 91.7122 197.387 86.5317C197.387 80.9703 197.612 76.7802 197.612 71.1426C197.612 59.6388 190.715 52.3251 169.121 52.3251C159.824 52.3251 149.477 53.925 141.605 56.2867C142.354 59.4102 143.404 65.7335 143.929 69.8474C150.752 66.6477 160.424 65.2764 167.922 65.2764C178.268 65.2764 181.117 67.6381 181.117 72.4377V74.3423Z"
                                    fill="white"
                                  />
                                  <path
                                    d="M218.971 84.3224C217.097 84.5509 214.547 84.5509 211.923 84.5509C209.149 84.5509 206.6 84.4748 204.875 84.2462C204.875 84.8557 204.8 85.5413 204.8 86.1508C204.8 95.6738 211.023 101.235 232.917 101.235C253.535 101.235 260.208 95.75 260.208 86.0746C260.208 76.9325 255.785 72.4377 236.216 71.4473C220.995 70.7616 219.646 69.0856 219.646 67.181C219.646 64.9717 221.595 63.8289 231.792 63.8289C242.364 63.8289 245.213 65.2764 245.213 68.3238V69.0094C246.712 68.9332 249.412 68.8571 252.186 68.8571C254.81 68.8571 257.659 68.9332 259.309 69.0856C259.309 68.3999 259.384 67.7905 259.384 67.2572C259.384 56.0581 250.086 52.4013 232.092 52.4013C211.848 52.4013 205.025 57.3533 205.025 67.0286C205.025 75.7136 210.499 81.1227 229.918 81.9607C244.238 82.4178 245.813 84.0177 245.813 86.227C245.813 88.5887 243.488 89.6553 233.442 89.6553C221.895 89.6553 218.971 88.0554 218.971 84.7795V84.3224Z"
                                    fill="white"
                                  />
                                  <path
                                    d="M284.955 44.1734C279.482 49.2778 269.66 54.3821 264.187 55.7534C264.262 58.5722 264.262 63.7527 264.262 66.5715L269.285 66.6477C269.21 72.0568 269.135 78.6086 269.135 82.9511C269.135 93.0835 274.458 100.702 291.028 100.702C298.001 100.702 302.65 99.9401 308.423 98.7212C307.823 94.9881 307.148 89.2743 306.923 84.9319C303.474 86.0746 299.126 86.6841 294.327 86.6841C287.654 86.6841 284.955 84.8557 284.955 79.599C284.955 75.028 284.955 70.7616 285.03 66.8001C293.577 66.8763 302.125 67.0286 307.148 67.181C307.073 63.2194 307.223 57.5056 307.448 53.6964C300.175 53.8488 292.003 53.925 285.255 53.925C285.33 50.5729 285.405 47.3732 285.48 44.1734H284.955Z"
                                    fill="white"
                                  />
                                  <path
                                    d="M329.736 64.286C329.811 60.3244 329.886 56.9724 329.961 53.6964H314.89C315.115 60.2483 315.115 66.9525 315.115 76.7802C315.115 86.6079 315.04 93.3883 314.89 99.8639H332.135C331.835 95.2929 331.76 87.5983 331.76 81.0465C331.76 70.6855 335.959 67.7143 345.481 67.7143C349.905 67.7143 353.054 68.2476 355.828 69.238C355.903 65.3526 356.653 57.8104 357.102 54.4583C354.253 53.6203 351.104 53.087 347.28 53.087C339.108 53.0108 333.11 56.3629 330.336 64.3622L329.736 64.286Z"
                                    fill="white"
                                  />
                                  <path
                                    d="M404.808 76.4754C404.808 84.7795 398.81 88.6649 389.363 88.6649C379.991 88.6649 373.993 85.008 373.993 76.4754C373.993 67.9428 380.066 64.7431 389.363 64.7431C398.735 64.7431 404.808 68.1714 404.808 76.4754ZM420.478 76.0945C420.478 59.5626 407.582 52.1728 389.363 52.1728C371.069 52.1728 358.622 59.5626 358.622 76.0945C358.622 92.5503 370.244 101.388 389.288 101.388C408.482 101.388 420.478 92.5503 420.478 76.0945Z"
                                    fill="white"
                                  />
                                </svg>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div
                        className="marquee fadeout-horizontal -mx-8 sm:-mx-16"
                        style={
                          {
                            "--speed": "45s",
                            "--num-items": numItems,
                            "--direction": "reverse",
                          } as React.CSSProperties
                        }
                      >
                        <div className="track">
                          {Array.from({ length: numItems }).map((_, i) => (
                            <div
                              key={i}
                              className="track-item"
                              style={
                                {
                                  "--item-position": i + 1,
                                } as React.CSSProperties
                              }
                            >
                              <div className="track-item-content px-4 animate-fade-in-out text-white bg-glass h-20 w-20 rounded-lg grid place-items-center">
                                <svg
                                  viewBox="0 0 105 22"
                                  xmlns="http://www.w3.org/2000/svg"
                                  height="1em"
                                  fill="none"
                                  className="w-full"
                                >
                                  <>
                                    <title>Sanity</title>
                                    <path
                                      opacity="0.7"
                                      d="M78.1793 7.99261V21.0028H73.9031V10.2138L78.1793 7.99261Z"
                                      fill="currentColor"
                                    />
                                    <path
                                      opacity="0.7"
                                      d="M20.9511 21.33L30.944 16.1051L29.7121 12.9141L23.1332 15.9821L20.9511 21.33Z"
                                      fill="currentColor"
                                    />
                                    <path
                                      opacity="0.5"
                                      d="M73.9031 10.2027L84.7443 4.65477L82.9126 1.5571L73.9031 5.95997V10.2027Z"
                                      fill="currentColor"
                                    />
                                    <path
                                      opacity="0.7"
                                      d="M43.3705 6.96233V21.0028H39.2927V1.00714L43.3705 6.96233Z"
                                      fill="currentColor"
                                    />
                                    <path
                                      opacity="0.5"
                                      d="M27.1299 6.18617L20.9511 21.33L17.7731 18.5943L25.1353 1.00714L27.1299 6.18617Z"
                                      fill="currentColor"
                                    />
                                    <path
                                      d="M25.1353 1.00714H29.3477L37.1386 21.0028H32.8269L25.1353 1.00714Z"
                                      fill="currentColor"
                                    />
                                    <path
                                      d="M44.0012 1.00714L52.9824 14.6682V21.0028L39.2927 1.00714H44.0012Z"
                                      fill="currentColor"
                                    />
                                    <path
                                      d="M64.9183 1.00714H60.6739V21.0063H64.9183V1.00714Z"
                                      fill="currentColor"
                                    />
                                    <path
                                      d="M73.9031 4.65474H67.37V1.00714H82.5867L84.7443 4.65474H78.1793H73.9031Z"
                                      fill="currentColor"
                                    />
                                    <path
                                      opacity="0.5"
                                      d="M97.2754 13.4153V21.0028H93.0629V13.4153"
                                      fill="currentColor"
                                    />
                                    <path
                                      d="M93.0629 13.4152L100.191 1.00714H104.666L97.2754 13.4152H93.0629Z"
                                      fill="currentColor"
                                    />
                                    <path
                                      opacity="0.7"
                                      d="M93.063 13.4152L85.7363 1.00714H90.3456L95.3092 9.51008L93.063 13.4152Z"
                                      fill="currentColor"
                                    />
                                    <path
                                      d="M1.96126 3.31479C1.96126 6.09921 3.71145 7.75595 7.21536 8.62956L10.9283 9.47533C14.2444 10.2236 16.2639 12.0822 16.2639 15.1103C16.2897 16.4295 15.8531 17.7173 15.0274 18.7579C15.0274 15.7368 13.4367 14.1044 9.59972 13.1229L5.95409 12.3085C3.03475 11.6541 0.781478 10.1262 0.781478 6.83709C0.766123 5.56693 1.18116 4.32781 1.96126 3.31479"
                                      fill="currentColor"
                                    />
                                    <path
                                      opacity="0.7"
                                      d="M52.9824 13.6415V1.00714H57.0602V21.0028H52.9824V13.6415Z"
                                      fill="currentColor"
                                    />
                                    <path
                                      opacity="0.7"
                                      d="M12.7458 14.3689C14.3294 15.3643 15.0238 16.7565 15.0238 18.7544C13.713 20.4041 11.4101 21.33 8.70333 21.33C4.14718 21.33 0.958577 19.1268 0.25 15.2982H4.62547C5.18878 17.0559 6.68034 17.8703 8.67144 17.8703C11.1019 17.8703 12.7174 16.5964 12.7493 14.3619"
                                      fill="currentColor"
                                    />
                                    <path
                                      opacity="0.7"
                                      d="M4.23567 7.44267C3.5125 7.02045 2.9192 6.41375 2.51873 5.68697C2.11827 4.96019 1.92558 4.14045 1.96113 3.31476C3.22594 1.67891 5.42608 0.679993 8.10804 0.679993C12.7492 0.679993 15.4347 3.08852 16.0972 6.47856H11.8883C11.4242 5.14203 10.2621 4.10136 8.14347 4.10136C5.87957 4.10136 4.33487 5.39611 4.24629 7.44267"
                                      fill="currentColor"
                                    />
                                  </>
                                </svg>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div
                        className="marquee fadeout-horizontal -mx-8 sm:-mx-16"
                        style={
                          {
                            "--speed": "90s",
                            "--num-items": numItems,
                          } as React.CSSProperties
                        }
                      >
                        <div className="track">
                          {Array.from({ length: numItems }).map((_, i) => (
                            <div
                              key={i}
                              className="track-item"
                              style={
                                {
                                  "--item-position": i + 1,
                                } as React.CSSProperties
                              }
                            >
                              <div className="track-item-content animate-fade-in-out text-white bg-glass rounded-lg grid place-items-center">
                                <svg
                                  viewBox="0 0 460 160"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M65.7845 121.175C61.2669 117.045 59.948 108.368 61.8302 102.082C65.0938 106.045 69.6158 107.301 74.2996 108.009C81.5305 109.103 88.6318 108.694 95.3489 105.389C96.1173 105.011 96.8275 104.507 97.6671 103.998C98.2974 105.826 98.4614 107.672 98.2412 109.551C97.7059 114.127 95.4288 117.662 91.8069 120.341C90.3586 121.413 88.826 122.371 87.3302 123.382C82.7349 126.487 81.4916 130.129 83.2184 135.427C83.2594 135.556 83.2961 135.685 83.3889 136C81.0427 134.95 79.3288 133.421 78.023 131.411C76.6437 129.289 75.9875 126.942 75.953 124.403C75.9357 123.167 75.9357 121.92 75.7695 120.702C75.3637 117.732 73.9694 116.402 71.3425 116.325C68.6466 116.247 66.5141 117.913 65.9485 120.538C65.9054 120.739 65.8428 120.938 65.7802 121.172L65.7845 121.175Z"
                                    fill="white"
                                  />
                                  <path
                                    d="M40 101.034C40 101.034 53.3775 94.5177 66.7924 94.5177L76.9068 63.2155C77.2855 61.7017 78.3911 60.6729 79.6393 60.6729C80.8875 60.6729 81.9932 61.7017 82.3719 63.2155L92.4862 94.5177C108.374 94.5177 119.279 101.034 119.279 101.034C119.279 101.034 96.5558 39.133 96.5114 39.0088C95.8592 37.1787 94.7583 36 93.274 36H66.007C64.5227 36 63.4662 37.1787 62.7696 39.0088C62.7205 39.1307 40 101.034 40 101.034Z"
                                    fill="white"
                                  />
                                  <path
                                    d="M181.043 81.1227C181.043 86.6079 174.22 89.8838 164.773 89.8838C158.624 89.8838 156.45 88.3601 156.45 85.1604C156.45 81.8083 159.149 80.2085 165.297 80.2085C170.846 80.2085 175.569 80.2846 181.043 80.9703V81.1227ZM181.117 74.3423C177.744 73.5805 172.645 73.1234 166.572 73.1234C148.877 73.1234 140.555 77.3135 140.555 87.065C140.555 97.1975 146.253 101.083 159.449 101.083C170.621 101.083 178.193 98.2641 180.968 91.3313H181.417C181.342 93.0074 181.267 94.6834 181.267 95.9785C181.267 99.5592 181.867 99.8639 184.791 99.8639H198.587C197.837 97.7308 197.387 91.7122 197.387 86.5317C197.387 80.9703 197.612 76.7802 197.612 71.1426C197.612 59.6388 190.715 52.3251 169.121 52.3251C159.824 52.3251 149.477 53.925 141.605 56.2867C142.354 59.4102 143.404 65.7335 143.929 69.8474C150.752 66.6477 160.424 65.2764 167.922 65.2764C178.268 65.2764 181.117 67.6381 181.117 72.4377V74.3423Z"
                                    fill="white"
                                  />
                                  <path
                                    d="M218.971 84.3224C217.097 84.5509 214.547 84.5509 211.923 84.5509C209.149 84.5509 206.6 84.4748 204.875 84.2462C204.875 84.8557 204.8 85.5413 204.8 86.1508C204.8 95.6738 211.023 101.235 232.917 101.235C253.535 101.235 260.208 95.75 260.208 86.0746C260.208 76.9325 255.785 72.4377 236.216 71.4473C220.995 70.7616 219.646 69.0856 219.646 67.181C219.646 64.9717 221.595 63.8289 231.792 63.8289C242.364 63.8289 245.213 65.2764 245.213 68.3238V69.0094C246.712 68.9332 249.412 68.8571 252.186 68.8571C254.81 68.8571 257.659 68.9332 259.309 69.0856C259.309 68.3999 259.384 67.7905 259.384 67.2572C259.384 56.0581 250.086 52.4013 232.092 52.4013C211.848 52.4013 205.025 57.3533 205.025 67.0286C205.025 75.7136 210.499 81.1227 229.918 81.9607C244.238 82.4178 245.813 84.0177 245.813 86.227C245.813 88.5887 243.488 89.6553 233.442 89.6553C221.895 89.6553 218.971 88.0554 218.971 84.7795V84.3224Z"
                                    fill="white"
                                  />
                                  <path
                                    d="M284.955 44.1734C279.482 49.2778 269.66 54.3821 264.187 55.7534C264.262 58.5722 264.262 63.7527 264.262 66.5715L269.285 66.6477C269.21 72.0568 269.135 78.6086 269.135 82.9511C269.135 93.0835 274.458 100.702 291.028 100.702C298.001 100.702 302.65 99.9401 308.423 98.7212C307.823 94.9881 307.148 89.2743 306.923 84.9319C303.474 86.0746 299.126 86.6841 294.327 86.6841C287.654 86.6841 284.955 84.8557 284.955 79.599C284.955 75.028 284.955 70.7616 285.03 66.8001C293.577 66.8763 302.125 67.0286 307.148 67.181C307.073 63.2194 307.223 57.5056 307.448 53.6964C300.175 53.8488 292.003 53.925 285.255 53.925C285.33 50.5729 285.405 47.3732 285.48 44.1734H284.955Z"
                                    fill="white"
                                  />
                                  <path
                                    d="M329.736 64.286C329.811 60.3244 329.886 56.9724 329.961 53.6964H314.89C315.115 60.2483 315.115 66.9525 315.115 76.7802C315.115 86.6079 315.04 93.3883 314.89 99.8639H332.135C331.835 95.2929 331.76 87.5983 331.76 81.0465C331.76 70.6855 335.959 67.7143 345.481 67.7143C349.905 67.7143 353.054 68.2476 355.828 69.238C355.903 65.3526 356.653 57.8104 357.102 54.4583C354.253 53.6203 351.104 53.087 347.28 53.087C339.108 53.0108 333.11 56.3629 330.336 64.3622L329.736 64.286Z"
                                    fill="white"
                                  />
                                  <path
                                    d="M404.808 76.4754C404.808 84.7795 398.81 88.6649 389.363 88.6649C379.991 88.6649 373.993 85.008 373.993 76.4754C373.993 67.9428 380.066 64.7431 389.363 64.7431C398.735 64.7431 404.808 68.1714 404.808 76.4754ZM420.478 76.0945C420.478 59.5626 407.582 52.1728 389.363 52.1728C371.069 52.1728 358.622 59.5626 358.622 76.0945C358.622 92.5503 370.244 101.388 389.288 101.388C408.482 101.388 420.478 92.5503 420.478 76.0945Z"
                                    fill="white"
                                  />
                                </svg>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                </motion.div>
                <div className="absolute z-40 bottom-0 inset-x-0 rounded-b-lg h-[calc(100%+100px)] md:gradient-mask-b-90 pointer-events-none">
                  <motion.img
                    src="/me.png"
                    alt="Me"
                    className="absolute max-md:translate-x-5 md:translate-y-5 z-30 -bottom-24 md:bottom-0 -right-4 md:right-0 md:rounded-br-lg object-cover max-h-[400px] max-[579px]:max-w-72 xs:h-[600px] xs:max-h-[700px] md:h-[700px] lg:w-[700px] min-[480px]:w-2/3 aspect-square pointer-events-none dark:brightness-75 contrast-[1.1] origin-bottom-right"
                    initial={{ x: 20, scale: 0.9 }}
                    animate={{ x: 0, scale: 1 }}
                    transition={{
                      duration: 1.67,
                      delay: 0.05 * 6,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{
                      scale: imgScale,
                      opacity: imgOpacity,
                    }}
                  />
                </div>
              </BrowserWindow>
            </Container>

            {/* <PortableText blocks={data.body} /> */}
          </motion.div>
        </div>
        <div
          className="sticky"
          style={{
            top: (heroHeight || 0) + $headerHeight,
          }}
        >
          <TextBlock
            {...{
              overline: "About me",
              heading:
                "I'm driven by a commitment to solving problems through thoughtful, user-centered web development.",
              text: "Web development—much like life—is about tackling challenges and crafting solutions that make a difference. I'm passionate about creating thoughtful, user-centered interfaces that simplify complexities, connect people, and improve everyday experiences.",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export function LettersPullUp({
  text,
  className = "",
  delay = 0,
  duration,
}: {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
}) {
  const splittedText = text.split("");

  const pullupVariant = {
    initial: { y: 0, opacity: 1 },
    animate: (i: number) => ({
      y: [0, -10, 0],
      opacity: 1,
      transition: {
        duration: duration || undefined,
        delay: delay + i * 0.05,
      },
    }),
  };
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <div className="inline-flex">
      {splittedText.map((current, i) => (
        <motion.div
          key={i}
          ref={ref}
          variants={pullupVariant}
          initial="initial"
          animate={isInView ? "animate" : ""}
          custom={i}
          className={cn("", className)}
        >
          {current == " " ? <span>&nbsp;</span> : current}
        </motion.div>
      ))}
    </div>
  );
}

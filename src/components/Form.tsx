import React from "react";
import { Container } from "./Container";
import BrowserWindow from "./BrowserWindow";
import { BackgroundRadialGradient } from "./BackgroundRadialGradient";
import { getRadialGradient } from "~/utils/getRadialGradient";
import { type FormBlock as Props } from "~/types/formBlock";
import { PortableText } from "./PortableText/PortableText";

export const Form = ({ text, form }: Props) => {
  return (
    <div className="bg-[linear-gradient(to_bottom,transparent_20%,#4f46e5_20%)]">
      <Container padding={true} className="!pt-0">
        <BrowserWindow stackPosition="top">
          <BackgroundRadialGradient
            style={{
              backgroundImage: `${getRadialGradient("#c7d2fe", "rgba(0,0,0,.8)", "hsla(0 0% 0% / .9)", "60% 90%", ["0%", "50%", "90%"])}, ${getRadialGradient("hsla(0 0% 0% / 0)", "#c7d2fe", "#4338ca", "0% 100%", ["0%", "30%", "90%"])}`,
            }}
          />
          <Container
            variant="tight"
            className="py-16 sm:pb-0 grid lg:grid-cols-2 gap-16"
          >
            <div className="space-y-3 [&_.heading]:text-background [&_p]:text-background text-lg [&_p]:dark:text-foreground">
              {text && <PortableText portableText={text} />}
            </div>

            <div className="grid gap-4 items-start">
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First name"
                  className="w-full placeholder:text-background/50 p-4 bg-glass text-background rounded-lg border-white/5 border"
                />
                <input
                  type="text"
                  placeholder="Last name"
                  className="w-full placeholder:text-background/50 p-4 bg-glass text-white rounded-lg border border-white/5"
                />
              </div>
              <input
                type="text"
                placeholder="Email"
                className="w-full placeholder:text-background/50 p-4 bg-glass text-white rounded-lg border border-white/5"
              />
              <textarea
                placeholder="Message"
                className="w-full placeholder:text-background/50 p-4 bg-glass text-white rounded-lg border border-white/5"
                rows={5}
              ></textarea>
              <button className="py-3 px-6 bg-primary text-background rounded-lg justify-self-start min-w-40">
                Send
              </button>
            </div>
          </Container>
        </BrowserWindow>
      </Container>
    </div>
  );
};

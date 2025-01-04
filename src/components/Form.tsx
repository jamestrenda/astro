import React from "react";
import { Container } from "./Container";
import BrowserWindow from "./BrowserWindow";
import { BackgroundRadialGradient } from "./BackgroundRadialGradient";
import { getRadialGradient } from "~/utils/getRadialGradient";
import {
  type FormQueryParams,
  type FormBlock as Props,
} from "~/types/formBlock";
import { PortableText } from "./PortableText/PortableText";
import { actions } from "astro:actions";
import {
  getFormProps,
  getInputProps,
  getTextareaProps,
  useForm,
} from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { Field, TextareaField } from "./ui/form";
import { createZodFormSchema } from "~/utils/createZodFormSchema";

export const Form = ({
  text,
  form: data,
  slug,
  pageType,
}: Props & FormQueryParams) => {
  const schema = createZodFormSchema(data.customFormFields);

  const [form, fields] = useForm({
    // id: "coform",
    constraint: getZodConstraint(schema),
    onSubmit: async (e, { formData }) => {
      e.preventDefault();
      const result = await actions.submitForm(formData);
      console.log(result);

      // const response = await fetch("/api/theme", {
      //   method: "POST",
      //   body: formData,
      // });
      // const data: z.infer<typeof ThemeFormSchema> = await response.json();
    },
    onValidate({ formData }) {
      const result = parseWithZod(formData, { schema: schema });

      console.log(result);
      return result;
    },
    // onSubmit: async (formData) => {
    //   // const response = await actions.submitForm(formData);
    //   console.log(formData);
    // },
    shouldRevalidate: "onBlur",
    // defaultValue: {
    //   redirectTo: redirectTo?.slug ?? params.slug ?? undefined,
    //   subject:
    //     subject && subject.length ? defaultSubject ?? subject[0] : undefined,
    // },
  });
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
            <div className="space-y-3 [&_.heading]:text-background [&_.heading]:dark:text-foreground [&_p]:text-background text-lg [&_p]:dark:text-muted">
              {text && <PortableText portableText={text} />}
            </div>

            <div className="grid gap-4 items-start">
              <form
                method="POST"
                {...getFormProps(form)}
                className="grid gap-4"
              >
                {data.customFormFields.map((field) => {
                  switch (field._type) {
                    case "formField": {
                      return (
                        <Field
                          key={field._key}
                          labelProps={{
                            htmlFor: field._key,
                            children: field.fieldLabel,
                          }}
                          inputProps={{
                            // @ts-ignore
                            ...getInputProps(fields[field._key], {
                              type: "text",
                            }),
                            placeholder: field.fieldPlaceholder ?? undefined,
                            // autoComplete: "given-name",
                            // @ts-ignore
                            autoFocus: fields[field._key].errors ? true : false,
                          }}
                          // @ts-ignore
                          errors={fields[field._key].errors}
                        />
                      );
                    }
                    case "formTextarea": {
                      return (
                        <TextareaField
                          key={field._key}
                          labelProps={{
                            htmlFor: field._key,
                            children: field.fieldLabel,
                          }}
                          textareaProps={{
                            // @ts-ignore
                            ...getTextareaProps(fields[field._key]),
                            //   autoComplete: "message",
                            placeholder: field.fieldPlaceholder ?? undefined,
                            rows: 5,
                          }}
                          // @ts-ignore
                          errors={fields[field._key].errors}
                        />
                      );
                    }
                    case "formGroup": {
                      // TODO: extract to a function
                      return (
                        <div
                          key={field._key}
                          className="grid md:grid-cols-2 gap-4"
                        >
                          {field.fields.map((field) => {
                            switch (field._type) {
                              case "formField": {
                                return (
                                  <Field
                                    key={field._key}
                                    labelProps={{
                                      htmlFor: field._key,
                                      children: field.fieldLabel,
                                    }}
                                    inputProps={{
                                      // @ts-ignore
                                      ...getInputProps(fields[field._key], {
                                        type: "text",
                                      }),
                                      placeholder:
                                        field.fieldPlaceholder ?? undefined,
                                      // autoComplete: "given-name",
                                      // @ts-ignore
                                      autoFocus: fields[field._key].errors
                                        ? true
                                        : false,
                                    }}
                                    // @ts-ignore
                                    errors={fields[field._key].errors}
                                  />
                                );
                              }
                              case "formTextarea": {
                                return (
                                  <TextareaField
                                    key={field._key}
                                    labelProps={{
                                      htmlFor: field._key,
                                      children: field.fieldLabel,
                                    }}
                                    textareaProps={{
                                      // @ts-ignore
                                      ...getTextareaProps(fields[field._key]),
                                      //   autoComplete: "message",
                                      placeholder:
                                        field.fieldPlaceholder ?? undefined,
                                      rows: 5,
                                    }}
                                    // @ts-ignore
                                    errors={fields[field._key].errors}
                                  />
                                );
                              }
                              default: {
                                return null;
                              }
                            }
                          })}
                        </div>
                      );
                    }
                    default: {
                      return null;
                    }
                  }
                })}
                <input type="hidden" name="slug" value={slug} />
                <input type="hidden" name="pageType" value={pageType} />
                <button
                  type="submit"
                  className="py-3 px-6 bg-primary text-background rounded-lg justify-self-start min-w-40"
                >
                  Send
                </button>
              </form>
            </div>
          </Container>
        </BrowserWindow>
      </Container>
    </div>
  );
};

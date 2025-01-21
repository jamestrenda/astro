import React, { useEffect, useState } from "react";
import { Container } from "./Container";
import BrowserWindow from "./BrowserWindow";
import { BackgroundRadialGradient } from "./BackgroundRadialGradient";
import { getRadialGradient } from "~/utils/getRadialGradient";
import { type FormBlock as Props } from "~/types/formBlock";
import { PortableText } from "./PortableText/PortableText";
import {
  getFormProps,
  getInputProps,
  getTextareaProps,
  useForm,
  type SubmissionResult,
} from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { Field, FormError, TextareaField } from "./ui/form";
import { createZodFormSchema } from "~/utils/createZodFormSchema";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export const Form = ({ text, form: data, slug, pageType }: Props) => {
  const [submission, setSubmission] = useState<
    SubmissionResult<string[]> | undefined
  >();
  const [successMessage, setSuccessMessage] = useState(null);
  const schema = createZodFormSchema(data);
  const formRef = React.createRef<HTMLFormElement>();
  // TODO: handle pending state
  const [submitting, setSubmitting] = useState(false);

  const id = data.honeypot;

  const [form, fields] = useForm({
    id: `form-${id}`,
    lastResult: submission,
    constraint: getZodConstraint(schema),
    onSubmit: async (e, { formData }) => {
      e.preventDefault();
      setSuccessMessage(null);

      // TODO: handle pending state
      setSubmitting(true);
      const response = await fetch("/api/form", {
        method: "POST",
        body: formData,
      });
      const { result } = await response.json();

      if (result.status !== "success") {
        setSubmission(result);
        return;
      }

      setSuccessMessage(result.message);
    },
    onValidate({ formData }) {
      setSuccessMessage(null);
      const result = parseWithZod(formData, { schema });
      return result;
    },
    shouldValidate: "onSubmit",
  });

  useEffect(() => {
    if (form.status !== "error" && successMessage) {
      formRef.current?.reset();
      setSubmitting(false);
    }
  }, [form.status, successMessage]);

  return (
    <div className="bg-[linear-gradient(to_bottom,transparent_20%,#4f46e5_20%)]">
      <Container padding={true} className="!pt-0">
        <BrowserWindow stackPosition="top" className="max-md:!rounded-bl-lg">
          <BackgroundRadialGradient
            style={{
              backgroundImage: `${getRadialGradient("#c7d2fe", "rgba(0,0,0,.8)", "hsla(0 0% 0% / .9)", "60% 90%", ["0%", "50%", "90%"])}, ${getRadialGradient("hsla(0 0% 0% / 0)", "#c7d2fe", "#4338ca", "0% 100%", ["0%", "30%", "90%"])}`,
            }}
          />
          <Container
            variant="tight"
            className="py-16 sm:pb-0 grid lg:grid-cols-2 gap-16"
          >
            <div className="space-y-3 [&_.heading]:text-background [&_.heading]:dark:text-foreground [&_p]:text-muted text-lg [&_p]:dark:text-muted">
              {text && <PortableText portableText={text} />}
            </div>

            <div className="grid gap-4 items-start">
              <FormError errors={form.errors} id={form.errorId} />
              {successMessage && (
                <Alert variant="positive">
                  <AlertTitle>Oh, yeah!</AlertTitle>
                  <AlertDescription>{successMessage}</AlertDescription>
                </Alert>
              )}
              <form
                ref={formRef}
                method="POST"
                {...getFormProps(form)}
                id={form.id}
              >
                <fieldset disabled={submitting} className="grid gap-4">
                  {/* HONEYPOT */}
                  <input
                    type="text"
                    name={data.honeypot}
                    style={{ display: "none" }}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                  {/* USER FIELDS */}
                  {data.fields.map((field) => {
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
                                type:
                                  field.fieldType === "email"
                                    ? "email"
                                    : "text",
                              }),
                              placeholder: field.fieldPlaceholder ?? undefined,
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
                  {/* HIDDEN FIELDS */}
                  <input type="hidden" name="slug" value={slug} />
                  <input type="hidden" name="pageType" value={pageType} />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="py-3 px-6 bg-primary text-background dark:text-foreground rounded-lg justify-self-start min-w-40 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    Send
                  </button>
                </fieldset>
              </form>
            </div>
          </Container>
        </BrowserWindow>
      </Container>
    </div>
  );
};

import {
  getFormProps,
  getInputProps,
  getTextareaProps,
  useForm,
  type SubmissionResult,
} from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import React, { useEffect, useState } from 'react';
import { type FormBlock as Props } from '~/types/formBlock';
import { createZodFormSchema } from '~/utils/createZodFormSchema';
import { getRadialGradient } from '~/utils/getRadialGradient';
import { BackgroundRadialGradient } from './BackgroundRadialGradient';
import BrowserWindow from './BrowserWindow';
import { Container } from './Container';
import { PortableText } from './PortableText/PortableText';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Field, FormError, TextareaField } from './ui/form';

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
      const response = await fetch('/api/form', {
        method: 'POST',
        body: formData,
      });
      const { result } = await response.json();

      if (result.status !== 'success') {
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
    shouldValidate: 'onSubmit',
  });

  useEffect(() => {
    if (form.status !== 'error' && successMessage) {
      formRef.current?.reset();
      setSubmitting(false);
    }
  }, [form.status, successMessage]);

  return (
    <div className="bg-[linear-gradient(to_bottom,transparent_20%,var(--color-indigo-700)_20%)]">
      <Container padding={true} className="pt-0!">
        <BrowserWindow
          withStripes
          stackPosition="top"
          className="max-md:rounded-bl-lg!"
        >
          <BackgroundRadialGradient
            style={{
              backgroundImage: `${getRadialGradient('var(--color-zinc-600)', 'rgba(0,0,0,.8)', 'hsla(0 0% 0% / .9)', '60% 90%', ['0%', '50%', '90%'])}, ${getRadialGradient('hsla(0 0% 0% / 0)', '#c7d2fe', '#4338ca', '0% 100%', ['0%', '30%', '90%'])}`,
            }}
          />
          <Container
            variant="tight"
            className="relative z-50 grid gap-16 py-16 sm:pb-0 lg:grid-cols-2"
          >
            <div className="space-y-3 text-lg [&_.heading]:text-background dark:[&_.heading]:text-foreground [&_p]:text-gray-500 dark:[&_p]:text-gray-500">
              {text && <PortableText portableText={text} />}
            </div>

            <div className="grid items-start gap-2">
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
                <fieldset disabled={submitting} className="grid gap-2">
                  {/* HONEYPOT */}
                  <input
                    type="text"
                    name={data.honeypot}
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                  {/* USER FIELDS */}
                  {data.fields.map((field) => {
                    switch (field._type) {
                      case 'formField': {
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
                                  field.fieldType === 'email'
                                    ? 'email'
                                    : 'text',
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
                      case 'formTextarea': {
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
                      case 'formGroup': {
                        // TODO: extract to a function
                        return (
                          <div
                            key={field._key}
                            className="grid gap-2 md:grid-cols-2"
                          >
                            {field.fields.map((field) => {
                              switch (field._type) {
                                case 'formField': {
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
                                          type: 'text',
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
                                case 'formTextarea': {
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
                    className="min-w-40 justify-self-start rounded-lg bg-gradient-to-r from-indigo-600 from-0% to-indigo-700 to-100% px-6 py-3 font-medium text-background transition hover:scale-95 hover:from-indigo-700 focus:scale-95 focus:from-indigo-700 disabled:pointer-events-none disabled:opacity-50 dark:text-foreground"
                  >
                    {/* TODO: Move this content to Sanity */}
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

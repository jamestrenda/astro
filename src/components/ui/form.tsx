import { useInputControl } from "@conform-to/react";
import React, { useId, useRef } from "react";
import { Checkbox, type CheckboxProps } from "./checkbox";
import { Input } from "./input";
import { Label } from "./label";
import { Textarea } from "./textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  type SelectProps,
  SelectTrigger,
  SelectValue,
} from "./select";
import {
  RadioGroup,
  RadioGroupItem,
  type RadioGroupProps,
} from "./radio-group";
import { cn } from "~/utils/misc";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import { InfoIcon } from "lucide-react";

export type ListOfErrors = Array<string | null | undefined> | null | undefined;

export function ErrorList({
  id,
  errors,
}: {
  errors?: ListOfErrors;
  id?: string;
}) {
  const errorsToRender = errors?.filter(Boolean);
  if (!errorsToRender?.length) return null;
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="absolute top-5 right-4 z-10 text-destructive">
          <InfoIcon className="h-5 w-5" />
        </TooltipTrigger>
        <TooltipContent className="bg-red-100 backdrop-blur-md">
          <ul id={id} className="flex flex-col gap-1">
            {errorsToRender.map((e) => (
              <li key={e} className="text-xs text-destructive">
                {e}
              </li>
            ))}
          </ul>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function Field({
  labelProps,
  linkProps,
  inputProps,
  errors,
  className,
  showLabel = false,
}: {
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
  linkProps?: { to: string; text: string };
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  errors?: ListOfErrors;
  className?: string;
  showLabel?: boolean;
}) {
  const fallbackId = useId();
  const id = inputProps.id ?? fallbackId;
  const errorId = errors?.length ? `${id}-error` : undefined;
  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "has-[+[aria-invalid]]:text-destructive",
          linkProps ? "flex items-center" : ""
        )}
      >
        <Label
          htmlFor={id}
          {...labelProps}
          className={!showLabel ? "sr-only" : ""}
        />
        {linkProps ? (
          <a
            href={linkProps.to}
            className="ring-brand text-brand-secondary ml-auto inline-block rounded-md text-sm underline"
          >
            {linkProps.text}
          </a>
        ) : null}
      </div>
      <Input
        id={id}
        aria-invalid={errorId ? true : undefined}
        aria-describedby={errorId}
        {...inputProps}
      />
      {errorId ? <ErrorList id={errorId} errors={errors} /> : null}
    </div>
  );
}

export function TextareaField({
  labelProps,
  textareaProps,
  errors,
  className,
  showLabel = false,
}: {
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
  textareaProps: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
  errors?: ListOfErrors;
  className?: string;
  showLabel?: boolean;
}) {
  const fallbackId = useId();
  const id = textareaProps.id ?? textareaProps.name ?? fallbackId;
  const errorId = errors?.length ? `${id}-error` : undefined;
  return (
    <div className={cn("relative", className)}>
      <div className="has-[+[aria-invalid]]:text-destructive">
        <Label
          htmlFor={id}
          {...labelProps}
          className={!showLabel ? "sr-only" : ""}
        />
      </div>
      <Textarea
        id={id}
        aria-invalid={errorId ? true : undefined}
        aria-describedby={errorId}
        {...textareaProps}
      />
      {errorId ? <ErrorList id={errorId} errors={errors} /> : null}
    </div>
  );
}

export function CheckboxField({
  labelProps,
  buttonProps,
  errors,
  className,
}: {
  labelProps: JSX.IntrinsicElements["label"];
  buttonProps: CheckboxProps & {
    name: string;
    form: string;
    value?: string;
  };
  errors?: ListOfErrors;
  className?: string;
}) {
  const { key, defaultChecked, ...checkboxProps } = buttonProps;
  const fallbackId = useId();
  const checkedValue = buttonProps.value ?? "on";
  const input = useInputControl({
    key,
    name: buttonProps.name,
    formId: buttonProps.form,
    initialValue: defaultChecked ? checkedValue : undefined,
  });
  const id = buttonProps.id ?? fallbackId;
  const errorId = errors?.length ? `${id}-error` : undefined;

  return (
    <div className={cn("grid gap-2", className)}>
      <div className="flex items-center gap-2">
        <Checkbox
          {...checkboxProps}
          id={id}
          aria-invalid={errorId ? true : undefined}
          aria-describedby={errorId}
          checked={input.value === checkedValue}
          onCheckedChange={(state) => {
            input.change(state.valueOf() ? checkedValue : "");
            buttonProps.onCheckedChange?.(state);
          }}
          onFocus={(event) => {
            input.focus();
            buttonProps.onFocus?.(event);
          }}
          onBlur={(event) => {
            input.blur();
            buttonProps.onBlur?.(event);
          }}
          type="button"
        />
        <label htmlFor={id} {...labelProps} className="text-body-xs" />
      </div>
      {errorId ? <ErrorList id={errorId} errors={errors} /> : null}
    </div>
  );
}

export function RadioField({
  labelProps,
  buttonProps,
  errors,
  className,
  children,
}: {
  labelProps: JSX.IntrinsicElements["label"];
  buttonProps: RadioGroupProps & {
    name: string;
    form: string;
    value?: string;
  };
  errors?: ListOfErrors;
  className?: string;
  children: React.ReactNode;
}) {
  const { key, defaultChecked, ...radioProps } = buttonProps;
  const fallbackId = useId();
  const checkedValue = buttonProps.value ?? "on";
  const input = useInputControl({
    key,
    name: buttonProps.name,
    formId: buttonProps.form,
    initialValue: defaultChecked ? checkedValue : undefined,
  });
  const id = buttonProps.id ?? fallbackId;
  const errorId = errors?.length ? `${id}-error` : undefined;

  return (
    <div className={cn("grid gap-2", className)}>
      <div className={cn("has-[+[aria-invalid]]:text-destructive")}>
        <Label htmlFor={id} {...labelProps} />
      </div>
      <RadioGroup
        {...radioProps}
        aria-invalid={errorId ? true : undefined}
        aria-describedby={errorId}
      >
        {children}
      </RadioGroup>
      {errorId ? <ErrorList id={errorId} errors={errors} /> : null}
    </div>
  );
}

export function SelectField({
  labelProps,
  buttonProps,
  errors,
  className,
  children,
}: {
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
  buttonProps: SelectProps;
  errors?: ListOfErrors;
  className?: string;

  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const fallbackId = useId();
  const id = buttonProps.id ?? buttonProps.name ?? fallbackId;
  const errorId = errors?.length ? `${id}-error` : undefined;

  const { name, ...props } = buttonProps;

  return (
    <div className={cn("grid gap-2", className)}>
      <Label htmlFor={id} {...labelProps} />
      <Select
        name={buttonProps.name}
        open={open}
        onOpenChange={setOpen}
        defaultValue={buttonProps.defaultValue?.toString()}
      >
        <SelectTrigger
          id={id}
          aria-invalid={errorId ? true : undefined}
          aria-describedby={errorId}
          {...props}
          type="button"
          className="[&:is([data-placeholder])]:text-muted-foreground"
        >
          <SelectValue placeholder={labelProps.children} />
        </SelectTrigger>
        <SelectContent>{children}</SelectContent>
      </Select>
      {errorId ? <ErrorList id={errorId} errors={errors} /> : null}
    </div>
  );
}

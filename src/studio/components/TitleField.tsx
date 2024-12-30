import { Badge, Inline, Stack } from "@sanity/ui";
import { useEffect, useMemo, useState } from "react";
import {
  useFormValue,
  type FieldProps,
  type StringFieldProps,
  useClient,
} from "sanity";

export const TitleField = ({
  min = 0,
  max = 0,
  renderDefault,
  title,
  description,
  withSEO = true,
  ...props
}: FieldProps & {
  min?: number;
  max?: number;
  withSEO?: boolean;
}) => {
  const { inputProps } = props;
  const value = (inputProps?.value as StringFieldProps["value"]) || "";
  const isHomepage = Boolean(useFormValue(["isHomepage"]));
  const isSeoTitle = inputProps.id === "seo.title";

  return (
    <Stack space={3}>
      {renderDefault({
        ...props,
        renderDefault,
        title,
        description: description
          ? description
          : isHomepage && !isSeoTitle
            ? "For internal reference only. Not displayed on the website."
            : `Displayed on search engine results pages (SERPs) and in the tab of the web browser. Page titles should be 65 characters or fewer and include keywords for which the page should rank.`,
      })}
      {!withSEO || (isHomepage && !isSeoTitle) ? null : (
        <SEO
          {...{
            value,
            isHomepage,
            isSeoTitle,
            min,
            max,
          }}
        />
      )}
    </Stack>
  );
};

const SEO = ({
  value,
  min,
  max,
  isHomepage,
  isSeoTitle,
}: {
  value: string;
  min: number;
  max: number;
  isHomepage: boolean;
  isSeoTitle: boolean;
}) => {
  const docTitle =
    typeof useFormValue(["title"]) !== "undefined"
      ? String(useFormValue(["title"]))
      : typeof useFormValue(["name"]) !== "undefined"
        ? String(useFormValue(["name"]))
        : "Untitled";

  const [companyName, setCompanyName] = useState("");
  const [siteTitle, setSiteTitle] = useState("");
  const [tagline, setTagline] = useState("");

  const separator = " | ";
  const sepLength = separator.length;

  // if we're on the homepage, we need to account for the tagline
  // if we're not on the homepage, we need to account for the site title
  const newMax =
    isHomepage && isSeoTitle && !value?.length
      ? max - (tagline?.length ?? 0) - sepLength
      : siteTitle?.length
        ? max - siteTitle?.length - sepLength
        : companyName?.length
          ? max - companyName?.length - sepLength
          : max - sepLength;
  const client = useClient({ apiVersion: "2023-03-20" });

  useEffect(() => {
    client.getDocument("company").then((doc) => {
      setTagline(doc?.tagline);
      setCompanyName(doc?.name);
    });
    client.getDocument("siteSettings").then((doc) => {
      if (doc?.siteTitle) {
        setSiteTitle(doc?.siteTitle);
      }
    });
  }, []);
  useEffect(() => {
    const companySubscription = client
      .listen('*[_type == "company"][0]')
      .subscribe((update) => {
        if (update.result) {
          setTagline(update.result?.tagline);
          setCompanyName(update.result?.name);
        }
      });
    const settingsSubscription = client
      .listen('*[_type == "siteSettings"][0]')
      .subscribe((update) => {
        if (update.result) {
          setSiteTitle(update.result?.siteTitle);
        }
      });

    return () => {
      companySubscription.unsubscribe();
      settingsSubscription.unsubscribe();
    };
  }, [value, tagline, companyName, siteTitle, newMax]);

  const caution = newMax - 3;

  const handleTone = useMemo(() => {
    if (max) {
      return value?.length < min
        ? undefined
        : min <= value?.length && value?.length <= caution
          ? "positive"
          : value?.length > caution && value?.length <= newMax
            ? "caution"
            : "critical";
    }
    return "default";
  }, [value, min, newMax, caution]);

  const rootTitle =
    siteTitle?.length > 0
      ? siteTitle
      : companyName?.length > 0
        ? companyName
        : "No value found. Please update the company name in the company settings.";
  const pageTitle = isHomepage
    ? rootTitle
    : docTitle?.length > 0
      ? docTitle
      : "Untitled";

  const seoTitle = value?.length > 0 ? value : pageTitle;
  let newValue = isSeoTitle ? seoTitle : pageTitle;
  let newTagline = "";

  if (isHomepage && isSeoTitle && !value?.length) {
    if (tagline?.trim()?.length > 0) {
      newTagline = `${separator}${tagline}`;
    }
  } else {
    if (siteTitle?.trim()?.length > 0) {
      newTagline = `${separator}${siteTitle}`;
    } else if (companyName?.trim()?.length > 0) {
      newTagline = `${separator}${companyName}`;
    }
  }
  return (
    <Inline>
      <Badge tone={handleTone} padding={2} radius={2}>
        {!max ? "Characters: " : ""}
        {value?.length > 0 ? value?.length : ""}
        {max
          ? `${value?.length ? ` / ${newMax} - ` : ""}${newValue}${newTagline}`
          : ""}
      </Badge>
    </Inline>
  );
};

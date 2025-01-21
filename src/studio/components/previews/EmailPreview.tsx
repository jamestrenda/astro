import { Badge, Flex, Box, type BadgeProps } from "@sanity/ui";
import { useMemo, type PropsWithChildren } from "react";
import type { PreviewProps } from "sanity";
import { capitalize } from "~/utils/misc";

type CastPreviewProps = PreviewProps & {
  isPrimary?: boolean;
  department?: string;
};

export function EmailPreview(props: PreviewProps) {
  const castProps = props as CastPreviewProps;
  const { isPrimary, department } = castProps;

  const badgeProps: (PropsWithChildren & BadgeProps) | null = useMemo(() => {
    if (isPrimary) {
      return {
        children: "Primary",
        tone: "positive",
      };
    }

    if (department) {
      return {
        children: capitalize(department),
        tone: "default",
      };
    }

    return null;
  }, [isPrimary, department]);

  return (
    <Flex align="center">
      {/* Customize the subtitle for the built-in preview */}
      <Box flex={1}>{props.renderDefault({ ...props })}</Box>
      {/* Add our custom badge */}
      {badgeProps?.children ? (
        <Badge padding={2} tone={badgeProps.tone}>
          {badgeProps.children}
        </Badge>
      ) : null}
    </Flex>
  );
}

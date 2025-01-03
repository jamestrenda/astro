import type { ZodTypeAny, z } from "zod";

export const validateZodSchema = (data: unknown, schemas: ZodTypeAny[]) => {
  // Validate against each schema and collect results
  const results = schemas.map((schema) => schema.safeParse(data));

  // Check if any schema passed validation
  const successfulResult = results.find((result) => result.success);
  if (successfulResult) {
    return {
      success: true,
      data: successfulResult.data, // Return the validated data
    } as const; // Return the first successful result
  }

  // None succeeded; find the schema with the fewest issues
  const errorDetails = results
    .map((result, index) => {
      if (!result.success) {
        return {
          schemaIndex: index,
          issues: result.error.issues,
          issueCount: result.error.issues.length,
        };
      }
      return null;
    })
    .filter(Boolean) as {
    schemaIndex: number;
    issues: z.ZodIssue[];
    issueCount: number;
  }[];

  // Pick the schema with the fewest errors
  const mostRelevantError = errorDetails.reduce((prev, current) =>
    current.issueCount < prev.issueCount ? current : prev
  );

  return {
    success: false,
    schemaIndex: mostRelevantError.schemaIndex,
    issues: mostRelevantError.issues, // Return only the most relevant issues
  };
};

import { useToast } from "@sanity/ui";
import type {
  DocumentActionComponent,
  DocumentActionProps,
  DocumentActionsContext,
  Reference,
} from "sanity";
import { apiVersion } from "~/../sanity.config";

export function PublishHomeSettingsAction(
  originalPublishAction: DocumentActionComponent,
  context: DocumentActionsContext
) {
  const PublishAction = (props: DocumentActionProps) => {
    const { draft, published } = props;

    // TODO: if homepage has a draft, then this action seems to get messed up by
    //       updating the draft instead...
    const homepage = draft?.homepage as Reference | undefined;

    const existingHomepage = published?.homepage as Reference | undefined;

    const originalResult = originalPublishAction(props);
    const client = context.getClient({ apiVersion });

    const toast = useToast();
    return {
      ...originalResult,
      onHandle: async () => {
        // if user is changing the homepage (clearing or setting a new one)...
        if (!homepage || existingHomepage?._ref !== homepage._ref) {
          // if there is an existing published homepage...we need to update that document
          if (existingHomepage?._ref) {
            // update the existing homepage's isHomepage field
            await client
              .patch(existingHomepage._ref)
              .set({ isHomepage: false })
              //   .set({ template: "default" })
              .commit()
              .catch((err: Error) => {
                toast.push({
                  status: "error",
                  title: err.message,
                });
              });
          }
        }
        // if user is setting the homepage...
        if (homepage) {
          await client
            .patch(homepage._ref)
            .set({ isHomepage: true })
            // .set({ template: "home" })
            .commit()
            .catch((err: Error) => {
              toast.push({
                status: "error",
                title: err.message,
              });
            });
        }

        originalResult?.onHandle && originalResult.onHandle();
      },
    };
  };
  return PublishAction as DocumentActionComponent;
}

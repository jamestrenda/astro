import {useToast} from '@sanity/ui'
import {
  type DocumentActionComponent,
  type DocumentActionProps,
  type DocumentActionsContext,
  type Reference,
} from 'sanity'

export function PublishHomeSettingsAction(
  originalPublishAction: DocumentActionComponent,
  context: DocumentActionsContext,
) {
  const PublishAction = (props: DocumentActionProps) => {
    const {draft, published} = props // the settings document

    // 1. get the draft and published homepage references
    const draftHomepage = draft?.homepage as Reference | undefined
    const publishedHomepage = published?.homepage as Reference | undefined

    const originalResult = originalPublishAction(props)
    const client = context.getClient({apiVersion: 'v2025-03-03'})

    const toast = useToast()
    return {
      ...originalResult,
      onHandle: async () => {
        // Only proceed with homepage updates if the homepage reference has changed
        if (draftHomepage?._ref !== publishedHomepage?._ref) {
          // If there was a previously published homepage, set its isHomepage to false
          // in both draft and published states
          if (publishedHomepage?._ref) {
            // Update the published version
            await client
              .patch(publishedHomepage._ref)
              .set({isHomepage: false})
              .commit()
              .catch((err: Error) => {
                toast.push({
                  status: 'error',
                  title: err.message,
                })
              })

            // If there's a draft version, update it too
            const draftRef = `drafts.${publishedHomepage._ref}`
            await client
              .patch(draftRef)
              .set({isHomepage: false})
              .commit()
              .catch((err: Error) => {
                toast.push({
                  status: 'error',
                  title: err.message,
                })
              })
          }

          // If there's a new homepage selected, set its isHomepage to true
          // in both draft and published states
          if (draftHomepage?._ref) {
            // Remove 'drafts.' prefix if it exists to get the published version
            const publishedRef = draftHomepage._ref.replace('drafts.', '')

            // Update the published version
            await client
              .patch(publishedRef)
              .set({isHomepage: true})
              .commit()
              .catch((err: Error) => {
                toast.push({
                  status: 'error',
                  title: err.message,
                })
              })

            // Update the draft version
            await client
              .patch(draftHomepage._ref)
              .set({isHomepage: true})
              .commit()
              .catch((err: Error) => {
                toast.push({
                  status: 'error',
                  title: err.message,
                })
              })
          }
        }

        // Call the original publish action's onHandle
        originalResult?.onHandle && originalResult.onHandle()
      },
    }
  }
  return PublishAction as DocumentActionComponent
}

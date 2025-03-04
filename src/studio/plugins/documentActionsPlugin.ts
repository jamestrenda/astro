import { definePlugin, ScheduleAction } from 'sanity';
import { SINGLETON_TYPES } from '../schema';
import { PublishDocumentWithSlugAction } from '../schema/actions/publishWithSlugAction';

// Define the actions that should be available for singleton documents
const singletonActions = new Set(['publish', 'discardChanges', 'restore']);

export const documentActionsPlugin = definePlugin({
  name: 'document-actions',
  document: {
    actions: (prev, context) => {

      const filteredActions = SINGLETON_TYPES.has(context.schemaType)
        ? prev.filter(
            (action) =>
              action !== ScheduleAction &&
              action.action &&
              singletonActions.has(action.action),
          )
        : prev;


      switch (context.schemaType) {

        case 'page':
          return prev.map((originalAction) =>
            originalAction.action === 'publish'
              ? PublishDocumentWithSlugAction(originalAction, context)
              : originalAction,
          );
        default:
          return filteredActions;
      }
    },
  },
});

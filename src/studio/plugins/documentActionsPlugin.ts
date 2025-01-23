import { definePlugin, ScheduleAction } from 'sanity';
import { SINGLETON_TYPES } from '../schema';
import { PublishHomeSettingsAction } from '../schema/actions/publishHomeSettingsAction';
import { PublishDocumentWithSlugAction } from '../schema/actions/publishWithSlugAction';

// Define the actions that should be available for singleton documents
const singletonActions = new Set(['publish', 'discardChanges', 'restore']);

export const documentActionsPlugin = definePlugin({
  name: 'document-actions',
  document: {
    actions: (prev, context) => {
      // console.log({ prev });
      const filteredActions = SINGLETON_TYPES.has(context.schemaType)
        ? prev.filter(
            (action) =>
              action !== ScheduleAction &&
              action.action &&
              singletonActions.has(action.action),
          )
        : prev;

      // console.log({ filteredActions });

      const homeSettingsActions = filteredActions.map((originalAction) =>
        originalAction.action === 'publish'
          ? PublishHomeSettingsAction(originalAction, context)
          : originalAction,
      );

      switch (context.schemaType) {
        case 'home':
          return homeSettingsActions;
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

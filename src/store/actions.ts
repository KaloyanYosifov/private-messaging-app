/**
 * Internal dependencies.
 */
import MessagesActionsModel from '@/store/messages/models/actions.model';
import ConversationsActionsModel from '@/store/conversations/models/actions.model';
import AuthenticationActionsModel from '@/store/authentication/models/actions.model';

type ApplicationActions = MessagesActionsModel | ConversationsActionsModel | AuthenticationActionsModel;

export default ApplicationActions;

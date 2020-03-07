/**
 * Internal dependencies.
 */
import ConversationsActionsModel from '@/store/conversations/models/actions.model';
import AuthenticationActionsModel from '@/store/authentication/models/actions.model';

type ApplicationActions = ConversationsActionsModel | AuthenticationActionsModel;

export default ApplicationActions;

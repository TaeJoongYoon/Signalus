import { NavigationActions, StackActions } from 'react-navigation';
import { RootNavigator } from '../../navigators/AppNavigator';

import {
  NOT_SIGNED, ON_CONSENT, ON_REGISTER, SIGNED, SIGNOUT, RESIGNED,
  CONNECTED, NOT_CONNECTED,
  ON_CALENDAR, ON_HISTORY, ON_LOG, LOGGED, ON_DETAIL
} from './actionTypes';

// Start with two routes: The Main screen, with the Login screen on top.
const router = RootNavigator.router;
const firstAction =router.getActionForPathAndParams('Splash');
const initialNavState = router.getStateForAction(firstAction);


export default nav = (state = initialNavState, action) => {
  let nextState;
  switch (action.type) {
    case NOT_SIGNED:
      nextState = router.getStateForAction(
        StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'SignIn' })]
        }),
        state
      );
      break;
    case ON_CONSENT:
      nextState = router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Consent' }),
        state
      );
      break;
    case ON_REGISTER:
      nextState = router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Register' }),
        state
      );
      break;
    case SIGNED:
      nextState = router.getStateForAction(
        StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Main' })]
        }),
        state
      );
      break;
    case CONNECTED:
      nextState = router.getStateForAction(
        StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Main' })]
        }),
        state
      );
      break;
    case NOT_CONNECTED:
      nextState = router.getStateForAction(
        StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Bluetooth' })]
        }),
        state
      );
      break;

    case ON_CALENDAR:
      nextState = router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Calendar' }),
        state
      );
      break;
    case ON_HISTORY:
      nextState = router.getStateForAction(
        NavigationActions.navigate({ routeName: 'History' }),
        state
      );
      break;
    case ON_LOG:
      nextState = router.getStateForAction(
        NavigationActions.navigate({ routeName: 'SymptomLog'}),
        state
      );
      break;
    case LOGGED:
      nextState = router.getStateForAction(
        NavigationActions.back(),
        state
      );
      break;
    case ON_DETAIL:
      nextState = router.getStateForAction(
        NavigationActions.navigate({ routeName: 'SymptomDetail'}),
        state
      );
      break;

    case SIGNOUT:
      nextState = router.getStateForAction(
        StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'SignIn' })]
        }),
        state
      );
      break;
    case RESIGNED:
      nextState = router.getStateForAction(
        StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'SignIn' })]
        }),
        state
      );
      break;
    default:
      nextState = RootNavigator.router.getStateForAction(action, state);
      break;
  }
  return nextState || state;
};
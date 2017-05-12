/* eslint max-len:0 */
// based on https://github.com/facebook/react/pull/4303/files and
// https://github.com/necolas/react-native-web/blob/master/src/apis/PanResponder/injectResponderEventPlugin.js

const EventConstants = require('react-dom/lib/EventConstants');
const EventPluginRegistry = require('react-dom/lib/EventPluginRegistry');
const ResponderEventPlugin = require('react-dom/lib/ResponderEventPlugin');
const ResponderTouchHistoryStore = require('react-dom/lib/ResponderTouchHistoryStore');
const normalizeNativeEvent = require('./normalizeNativeEvent');
const keyMirror = require('../util/keyMirror');

const {
  topMouseDown,
  topMouseMove,
  topMouseUp,
  topScroll,
  topSelectionChange,
  topTouchCancel,
  topTouchEnd,
  topTouchMove,
  topTouchStart,
} = keyMirror(EventConstants.topLevelTypes);

const endDependencies = [topTouchCancel, topTouchEnd, topMouseUp];
const moveDependencies = [topTouchMove, topMouseMove];
const startDependencies = [topTouchStart, topMouseDown];

/**
 * Setup ResponderEventPlugin dependencies
 */
ResponderEventPlugin.eventTypes.responderMove.dependencies = moveDependencies;
ResponderEventPlugin.eventTypes.responderEnd.dependencies = endDependencies;
ResponderEventPlugin.eventTypes.responderStart.dependencies = startDependencies;
ResponderEventPlugin.eventTypes.responderRelease.dependencies = endDependencies;
ResponderEventPlugin.eventTypes.responderTerminationRequest.dependencies = [];
ResponderEventPlugin.eventTypes.responderGrant.dependencies = [];
ResponderEventPlugin.eventTypes.responderReject.dependencies = [];
ResponderEventPlugin.eventTypes.responderTerminate.dependencies = [];
ResponderEventPlugin.eventTypes.moveShouldSetResponder.dependencies = moveDependencies;
ResponderEventPlugin.eventTypes.selectionChangeShouldSetResponder.dependencies = [topSelectionChange];
ResponderEventPlugin.eventTypes.scrollShouldSetResponder.dependencies = [topScroll];
ResponderEventPlugin.eventTypes.startShouldSetResponder.dependencies = startDependencies;

const originalRecordTouchTrack = ResponderTouchHistoryStore.recordTouchTrack;

ResponderTouchHistoryStore.recordTouchTrack = (topLevelType, nativeEvent) => {
  // Filter out mouse-move events when the mouse button is not down
  if ((topLevelType === topMouseMove) && !ResponderTouchHistoryStore.touchHistory.touchBank.length) {
    return;
  }
  originalRecordTouchTrack.call(ResponderTouchHistoryStore, topLevelType, normalizeNativeEvent(nativeEvent));
};

EventPluginRegistry.injectEventPluginsByName({
  ResponderEventPlugin,
});

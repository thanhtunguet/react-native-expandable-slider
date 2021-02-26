import type { LayoutRectangle } from 'react-native';

export function layoutReducer(
  state: LayoutReducerState,
  action: LayoutReducerAction
): LayoutReducerState {
  const { type, ...stateProps } = action;
  switch (type) {
    case LayoutReducerActionType.update:
      return {
        ...state,
        ...stateProps,
      };

    default:
      return state;
  }
}

export interface LayoutReducerState extends Partial<LayoutRectangle> {}

export interface LayoutReducerAction extends Partial<LayoutReducerState> {
  type: LayoutReducerActionType;
}

export enum LayoutReducerActionType {
  update,
}

export enum ActionType {
  ADD_ITEM = 'ADD_ITEM',
  RETRIEVE_ITEM = 'RETRIEVE_ITEM',
}

interface techPayload {
  name: string;
  position: number;
}

interface actionAddItem {
  type: ActionType.ADD_ITEM;
  payload: techPayload;
}

interface actionRetrieveItem {
  type: ActionType.RETRIEVE_ITEM;
}

export type Action = actionAddItem | actionRetrieveItem;

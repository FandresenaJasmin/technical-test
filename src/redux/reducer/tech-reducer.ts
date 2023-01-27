import { Action, ActionType } from '../action/tech-action';

const techs = ['HTML/CSS', 'React', 'VueJs', 'NodeJs', 'Typescript', 'Java', 'Python', 'PHP', 'Go', 'C#'];

export interface TechState {
  items: string[];
}
const initialState: TechState = {
  items: techs,
};

const techReducer = (state: TechState = initialState, action: Action) => {
  const { type } = action;

  switch (type) {
    case ActionType.RETRIEVE_ITEM:
      return state.items;
    case ActionType.ADD_ITEM:
      const newItem = action.payload;
      let newArr = state.items;
      if (!state?.items?.includes(newItem.name)) {
        newArr = insert(state.items, newItem.position, newItem.name);
      }

      return { items: newArr };
    default:
      return state;
  }
};

const insert = (arr: string[], index: number, newItem: string) => [
  // part of the array before the specified index
  ...arr.slice(0, index),
  // inserted item
  newItem,
  // part of the array after the specified index
  ...arr.slice(index),
];

export { techReducer };

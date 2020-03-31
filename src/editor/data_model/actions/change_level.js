// import { findParentDataNodeByID } from '../data_utils';

// const findIndex = (parent, id) => {
//   let index = -1;
//   if (!parent.c) {
//     return index;
//   }
//   for (let i = 0; i < parent.c.length; i++) {
//     if (parent.c[i].id === id) {
//       index = i;
//       break;
//     }
//   }
//   return index;
// };

const changeLevel = (state, action) => {
  // TODO
  // if (!state.selection) {
  //   return state;
  // }
  // if (action.up) {
  //   const parent = findParentDataNodeByID(state.data, state.selection);
  //   if (!parent) {
  //     return state;
  //   }
  //   const grandParent = findParentDataNodeByID(state.data, parent.id);
  //   if (!grandParent) {
  //     alert('Cannot move up, no more parent node.');
  //     return state;
  //   }
  //   const index = findIndex(parent, state.selection);
  //   const [node] = parent.c.splice(index, 1);
  //   const pindex = findIndex(grandParent, parent.id);
  //   grandParent.c.splice(pindex, 0, node);
  // } else {
  //   const parent = findParentDataNodeByID(state.data, state.selection);
  //   if (!parent) {
  //     return state;
  //   }
  //   const index = findIndex(parent, state.selection);
  //   if (index === 0) {
  //     alert('First node cannot move down.');
  //     return state;
  //   }
  //   const [node] = parent.c.splice(index, 1);
  //   parent.c[index - 1].push(node);
  // }
  return { ...state };
};

export default changeLevel;
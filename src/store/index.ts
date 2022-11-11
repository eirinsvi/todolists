import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
    lists : [
      {
        id: 1,
        title: 'Groceries',
        url: '/list/Groceries',
        items: [
          {
              name: 'apple',
              checked: false
          },
          {
              name: 'cucumber',
              checked: false
          }
        ]
      },
      {
        id: 2,
        title: 'Schoolwork',
        url: '/list/Schoolwork',
        items: [
          {
              name: 'science',
              checked: false
          },
          {
              name: 'homework',
              checked: true
          }
        ]
      },
      {
        id: 3,
        title: 'Supplies',
        url: '/list/Supplies',
        items: [
          {
              name: 'stove',
              checked: false
          }
        ]
        },
      {
        id: 4,
        title: 'Crafts',
        url: '/list/Crafts',
        items: [
          {
              name: 'pencils',
              checked: false
          },
          {
              name: 'paint',
              checked: true
          }
        ]
      }
    ],
    currentList:  
      {
        id: 1,
        title: 'Groceries',
        url: '/list/Groceries',
        items: [
          {
              name: 'apple',
              checked: false
          },
          {
              name: 'cucumber',
              checked: false
          }
        ]
      },
    
  }
  },
  mutations: {
    SET_LISTS(state, lists) {
      state.lists = lists;
    },
    ADD_TO_LISTS(state, list) {
      state.lists.push(list);
    },
    SET_LIST(state, list) {
      state.currentList = list
    },
    UPDATE_LIST_IN_LIST(state, list) {
      for(const index in state.lists){
        if(state.lists[index].id == list.listId){
          state.lists[index] = list
        }
      }
    },
    REMOVE_LIST(state, listToDelete){
      state.lists.forEach( (item, index) => {
        if(item === listToDelete) state.lists.splice(index,1);
      });
    }
  },
  getters: {
    lists(state){
      return state.lists;
    },
    currentList(state){
      return state.currentList;
  }
  },
  actions: {},
  modules: {},
})
export default store;
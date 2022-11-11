<template>
  <ion-app>
    <ion-split-pane when="false" content-id="main-content">
      <ion-menu content-id="main-content" type="overlay">
        <ion-content>
          <ion-list id="inbox-list">
            <ion-list-header>Liste-applikasjon</ion-list-header>  
            <ion-item>
              <ion-label position="floating" >Add list</ion-label>
              <ion-input placeholder="Enter name of new list" @input="showError=false" @keyup.enter="addList()" v-model="newListName"></ion-input>
              <ion-note v-if="showError" style="color:red">list name must contain atleast one character</ion-note>
            </ion-item>
            <ion-menu-toggle  v-for="(p, i) in todolists" :key="i" style="cursor:pointer">
              <ion-item @click="listClicked(p)" router-direction="root" :router-link="p.url" lines="none" class="hydrated" >
                <ion-label>{{ p.title }}</ion-label>
              </ion-item>
              <ion-icon @click="deleteList(p)" :ios="trashOutline" :md="trashSharp"></ion-icon>
            </ion-menu-toggle>
          </ion-list>
        </ion-content>
      </ion-menu>
      <ion-router-outlet id="main-content"></ion-router-outlet>
    </ion-split-pane>
  </ion-app>
</template>

<script lang="ts">
import store from './store/index';
import { IonApp, IonContent, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonRouterOutlet, IonSplitPane, IonInput, IonNote, IonIcon } from '@ionic/vue';
import { trashSharp, trashOutline } from 'ionicons/icons';
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import router from './router';
import { promises as fsPromises } from 'fs'


export default defineComponent({
  name: 'App',
  components: {
    IonIcon,
    IonInput,
    IonNote,
    IonApp, 
    IonContent, 
    IonItem, 
    IonLabel, 
    IonList, 
    IonListHeader, 
    IonMenu, 
    IonMenuToggle, 
    IonRouterOutlet, 
    IonSplitPane,
  },
  data() {
    return {
      header: "Liste-applikasjon",
      showError: false,
      newListName: ""
    };
  },
  methods:{
    listClicked(listPicked: any){
      store.commit('SET_LIST', listPicked);
    },
    async addList(){
      if(this.newListName.length == 0){
        this.showError = true;
      } else {
        let list = {
          id: store.getters.lists[store.getters.lists.length-1].id + 1,
          title: this.newListName,
          url: '/list/' + this.newListName,
          items: []
        }
        store.commit("ADD_TO_LISTS", list)
        this.todolists = store.getters.lists
        this.newListName = ""
        await this.writeToJsonFile(list)
      }
    },
    deleteList(listToDelete: any){
      store.commit("REMOVE_LIST", listToDelete)
      this.todolists = store.getters.lists
      store.commit('SET_LIST', store.getters.lists[0]);
      router.push('/list/' + store.getters.lists[0].title)
    },
    writeToJsonFile: async(list: any) => {
      try{
      let data = JSON.stringify(list);
      fsPromises.writeFile(list.title + ".json", data);
      } catch(error){
        console.log("error writing to JSON file: " + error)
      }
    }
  },
  setup() {
    const todolists = store.getters.lists
    const selectedIndex = ref(0);
    const route = useRoute();
    
    return { 
      selectedIndex,
      trashOutline, 
      trashSharp, 
      todolists,
      
      isSelected: (url: string) => url === route.path ? 'selected' : ''
    }
  }
});
</script>

<style scoped>
ion-menu ion-content {
  --background: var(--ion-item-background, var(--ion-background-color, #fff));
}

ion-menu.md ion-content {
  --padding-start: 8px;
  --padding-end: 8px;
  --padding-top: 20px;
  --padding-bottom: 20px;
}

ion-menu.md ion-list {
  padding: 20px 0;
}

ion-menu.md ion-note {
  margin-bottom: 30px;
}

ion-menu.md ion-list-header,
ion-menu.md ion-note {
  padding-left: 10px;
}

ion-menu.md ion-list#inbox-list {
  border-bottom: 1px solid var(--ion-color-step-150, #d7d8da);
}

ion-menu.md ion-list#inbox-list ion-list-header {
  font-size: 22px;
  font-weight: 600;

  min-height: 20px;
}

ion-menu.md ion-list#labels-list ion-list-header {
  font-size: 16px;

  margin-bottom: 18px;

  color: #757575;

  min-height: 26px;
}

ion-menu.md ion-item {
  --padding-start: 10px;
  --padding-end: 10px;
  border-radius: 4px;
}

ion-menu.md ion-item.selected {
  --background: rgba(var(--ion-color-primary-rgb), 0.14);
}

ion-menu.md ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.md ion-item ion-icon {
  color: #616e7e;
}

ion-menu.md ion-item ion-label {
  font-weight: 500;
}

ion-menu.ios ion-content {
  --padding-bottom: 20px;
}

ion-menu.ios ion-list {
  padding: 20px 0 0 0;
}

ion-menu.ios ion-note {
  line-height: 24px;
  margin-bottom: 20px;
}

ion-menu.ios ion-item {
  --padding-start: 16px;
  --padding-end: 16px;
  --min-height: 50px;
}

ion-menu.ios ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.ios ion-item ion-icon {
  font-size: 24px;
  color: #73849a;
}

ion-menu.ios ion-list#labels-list ion-list-header {
  margin-bottom: 8px;
}

ion-menu.ios ion-list-header,
ion-menu.ios ion-note {
  padding-left: 16px;
  padding-right: 16px;
}

ion-menu.ios ion-note {
  margin-bottom: 8px;
}

ion-note {
  display: inline-block;
  font-size: 16px;

  color: var(--ion-color-medium-shade);
}

ion-item.selected {
  --color: var(--ion-color-primary);
}
</style>

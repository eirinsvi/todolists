<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons>
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title><strong class="capitalize">{{ list.title }}</strong></ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large" style="font-weight: bold;">{{ list.title }}</ion-title>
        </ion-toolbar>
      </ion-header>
    
      <div id="container">
        <ion-item>
          <ion-label position="floating">Add item to list</ion-label>
          <ion-input placeholder="Enter new item in list" @input="showError=false" @keyup.enter="addItem()" v-model="newItemName"></ion-input>
          <ion-note v-if="showError" style="color:red">Item must contain atleast one character</ion-note>
        </ion-item>
        

        <div v-if="showUndoneList">
          <strong class="capitalize">To do</strong>
          <ion-list v-if="showUndoneList" style="cursor:pointer">
            <ion-reorder-group :disabled="false" @ionItemReorder="handleReorder($event)">
            <div v-for="(item, i) in list.items" :key="i">
                <ion-item v-if="!item.checked"  @click="checkItem(i)">
                  <ion-label>{{item.name}}</ion-label>
                  <ion-reorder></ion-reorder>
                </ion-item>
            </div>
          </ion-reorder-group>
          </ion-list>
        </div>

        <div v-if="showDoneList">
          <strong class="capitalize">Done</strong>
          <ion-list>
            <div v-for="(item, i) in list.items" :key="i">
              <ion-item v-if="item.checked">
                <ion-label>{{item.name}}</ion-label>
              </ion-item>
            </div>
          </ion-list>
        </div>

      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonItem, IonList, IonLabel, IonInput, IonNote, IonReorderGroup } from '@ionic/vue';
import store from '@/store';
import createFile  from '@/FileSystemWriteToJson'

export default defineComponent({
  name: 'FolderPage',
  components: {
    IonReorderGroup,
    IonNote,
    IonInput,
    IonLabel,
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    IonItem,
    IonList
  },
  data() {
    return {
      showError: false,
      newItemName: "",
      showUndoneList: false,
      showDoneList: false,
      list: {
        id: 0,
        title: '',
        url: '',
        items: [
          {
              name: '',
              checked: false
          }
        ]
      },
    };
  },
  setup() {
      const handleReorder = (event: CustomEvent) => {
        event.detail.complete();
      }
      return { handleReorder }
  },
  methods:{
    getList(){
      this.list = store.getters.currentList
    },
    checkIfListIsEmpty(){
      this.showDoneList = false
      this.showUndoneList = false

      for(var index in this.list.items){
        if(this.list.items[index].checked){
          this.showDoneList = true
        } else {
          this.showUndoneList = true
        }
      }
    },
    checkItem(index: number){
      this.list.items[index].checked = true
      store.commit("SET_LIST", this.list)
      store.commit("UPDATE_LIST_IN_LIST", this.list)
      this.checkIfListIsEmpty()
    },
    addItem(){
      this.showError = false;
      if(this.newItemName.length == 0){
        this.showError = true;
      } else {
        this.list.items.push({name: this.newItemName, checked: false})

        store.commit("UPDATE_LIST_IN_LIST", this.list)
        store.commit("SET_LIST", this.list)

        this.newItemName = ""
        this.checkIfListIsEmpty()
        this.writeToJsonFile()
      }
    },
    writeToJsonFile(){
      createFile(this.list.title)
    }
  },
  created(){
    this.getList()
    this.checkIfListIsEmpty()
  }
});
</script>

<style scoped>
ion-title {
        margin-bottom: 5vh;
        text-align: center;
    
}
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>

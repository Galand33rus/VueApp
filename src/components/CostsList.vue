<template>
  <v-container>
    <v-data-table :headers="headers" :items="items" hide-default-footer>
      <template v-slot:top>
        <v-toolbar flat>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="orange darken-1" dark class="mb-2" v-bind="attrs" v-on="on">
                Add new cost <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-select v-model="editedItem.category" label="Category" prepend-icon="mdi-select-place" :items="categoryList"
                                color="orange"/>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field v-model="editedItem.value" label="Value" type="number" prepend-icon="mdi-currency-usd"
                                    color="orange"/>
                    </v-col>
                    <v-col cols="12">
                      <v-menu
                        v-model="menu2"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto">
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="editedItem.date"
                            label="Date"
                            color="orange"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on">
                          </v-text-field>
                        </template>
                        <v-date-picker
                          v-model="editedItem.date"
                          color="orange"
                          @input="menu2 = false">
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="orange darken-1" dark @click="save">
                  Save
                </v-btn>
                <v-btn color="orange darken-1" dark @click="close">
                  Cancel
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="orange darken-1" dark @click="deleteItemConfirm">OK</v-btn>
                <v-btn color="orange darken-1" dark @click="closeDelete">Cancel</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>

export default {
  name: 'CostsList',
  props: {
    items: {
      type: Array
    },
    categoryList: {
      type: Array
    }
  },
  data () {
    return {
      dialog: false,
      dialogDelete: false,
      menu: false,
      modal: false,
      menu2: false,
      id: 1,
      editedIndex: -1,
      editedItem: {
        id: '',
        date: '',
        category: '',
        value: ''
      },
      defaultItem: {
        id: '',
        date: '',
        category: '',
        value: ''
      },
      headers: [
        {
          text: '#',
          sortable: false,
          value: 'id'
        },
        {
          text: 'Date',
          value: 'date',
          sortable: false
        },
        {
          text: 'Category',
          value: 'category',
          sortable: false
        },
        {
          text: 'Value',
          value: 'value',
          sortable: false
        },
        {
          text: '',
          value: 'actions',
          sortable: false
        }]
    }
  },
  methods: {
    editItem (item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteItemConfirm () {
      this.$emit('delCostsItem', this.editedItem.id)
      this.closeDelete()
    },
    closeDelete () {
      this.dialogDelete = false
      this.editedIndex = -1
      this.editedItem = Object.assign({}, this.defaultItem)
    },
    save () {
      const data = {
        id: '',
        category: this.editedItem.category,
        value: Number(this.editedItem.value),
        date: this.editedItem.date || this.getCurrentDate
      }
      if (this.editedIndex > -1 && this.editedItem.category && this.editedItem.value) {
        data.id = this.editedItem.id
        this.$emit('editCostsItem', data)
        this.close()
      } else if (this.editedItem.category && this.editedItem.value) {
        data.id = this.id
        this.$emit('addCostsItem', data)
        this.close()
      }
    },
    close () {
      this.dialog = false
      this.editedIndex = -1
      this.editedItem = Object.assign({}, this.defaultItem)
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Cost' : 'Edit Cost'
    },
    getCurrentDate () {
      return new Intl.DateTimeFormat('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).format(new Date())
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  height: 350px;
}

.mdi-pencil, .mdi-delete {
  &:hover {
    color: #FF9800;
  }
}

</style>

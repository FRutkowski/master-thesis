<script setup lang="ts">
import { ref } from 'vue'

interface DataElement {
  id: number
  label: string
}

let ID: number = 1
const data = (count: number) => {
  const data: DataElement[] = []
  for (let i = 0; i < count; ++i) {
    data.push({
      id: ID++,
      label: ' I will eat ' + ID + ' apples'
    })
  }

  return data
}

const tableRows = ref()
const createTableRows = (count: number) => {
  tableRows.value = data(count)
}

const appendTableRows = (count: number) => {
  tableRows.value.push(...data(count))
}

const removeAll = () => {
  tableRows.value.length = 0
  ID = 1
  selectedRow.value = undefined
}

const remove = (id: number) => {
  tableRows.value = tableRows.value.filter((dataElement: DataElement) => dataElement.id !== id)
  if (selectedRow.value.id === id) selectedRow.value = undefined
}

const selectedRow = ref()
const select = (id: number) => {
  selectedRow.value = id
}

const update5thRow = () => {
  const _tableRows = tableRows.value
  for (let i = 0; i < _tableRows.length; i += 5) {
    _tableRows[i].label = 'Updated!'
  }

  tableRows.value = _tableRows
}

</script>

<template>
  <div>
    Vue.js Benchmark
    <button @click="createTableRows(10000)">
      Create 50000 rows
    </button>
    <button @click="appendTableRows(10000)">
      Append 50000 rows
    </button>
    <button @click="createTableRows(100000)">
      Create 500000 rows
    </button>
    <button @click="update5thRow">
      Update every 5th row
    </button>
    <button @click="removeAll">
      Remove all rows
    </button>
    <button>
      Swap rows
    </button>
    <div v-if="selectedRow">
      {{ 'Selected: ' + selectedRow }}
    </div>
  </div>
  <div>
    <table>
      <tbody>
        <div>
          <th>ID</th>
          <th>Description</th>
        </div>
        <tr
          v-for="tableRow in tableRows"
          :key="tableRow.id"
        >
          <a>{{ tableRow.id }}</a>
          <a>{{ tableRow.label }}</a>
          <button @click="select(tableRow.id)">
            Select
          </button>
          <button @click="remove(tableRow.id)">
            Remove
          </button>
        </tr>
      </tbody>
    </table>
  </div>
</template>

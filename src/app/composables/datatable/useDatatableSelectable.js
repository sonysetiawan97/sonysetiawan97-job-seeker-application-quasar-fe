import { useQuasar } from 'quasar'
import { ref } from 'vue'

export default function useDatatableSelectable() {

  const $q = useQuasar()

  const selected = ref([])
  const rows = ref([])
  const selectedRow = ref(null)
  const lastIndex = ref(null)
  const tableRef = ref(null)

  return {
    selected,
    selectedRow,
    lastIndex,
    tableRef,

    rows,

    getSelectedString () {
      return selected.value.length === 0 ? '' : `${selected.value.length} record${selected.value.length > 1 ? 's' : ''} selected of ${rows.value.length}`
    },

    onSelection ({ rows, added, evt }) {
      if (rows.length === 0 || tableRef.value === void 0) {
        return
      }

      const row = rows[ 0 ]
      const filteredSortedRows = tableRef.value.filteredSortedRows
      const rowIndex = filteredSortedRows.indexOf(row)
      const localLastIndex = lastIndex.value

      lastIndex.value = rowIndex
      document.getSelection().removeAllRanges()

      if ($q.platform.is.mobile === true) {
        evt = { ctrlKey: true }
      }
      else if (evt !== Object(evt) || (evt.shiftKey !== true && evt.ctrlKey !== true)) {
        selected.value = added === true ? rows : []
        return
      }

      const operateSelection = added === true
        ? selRow => {
          const selectedIndex = selected.value.indexOf(selRow)
          if (selectedIndex === -1) {
            selected.value = selected.value.concat(selRow)
          }
        }
        : selRow => {
          const selectedIndex = selected.value.indexOf(selRow)
          if (selectedIndex > -1) {
            selected.value = selected.value.slice(0, selectedIndex).concat(selected.value.slice(selectedIndex + 1))
          }
        }

      if (localLastIndex === null || evt.shiftKey !== true) {
        operateSelection(row)
        return
      }

      const from = localLastIndex < rowIndex ? localLastIndex : rowIndex
      const to = localLastIndex < rowIndex ? rowIndex : localLastIndex
      for (let i = from; i <= to; i += 1) {
        operateSelection(filteredSortedRows[ i ])
      }
    },

    getSelectedRows () {
      return selected.value.length
    },
  }
}

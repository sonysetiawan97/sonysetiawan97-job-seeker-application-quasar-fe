export function form (state, payload) {
  state.form = payload
}

export function reset (state, payload) {
  state.form = { ...state.resetValue }
}

export function collection (state, payload) {
  state.collection = payload
}

export function layout (state, payload) {
  state.layout = payload
}

export function validation (state, payload) {
  state.validation = payload
}

export function data (state, payload) {
  state.data = payload
}

export function columns (state, payload) {
  state.columns = payload
}

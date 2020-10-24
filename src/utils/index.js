function view (path) {
  return () => import(`../views/${path}.vue`)
}

export default {
  view
}

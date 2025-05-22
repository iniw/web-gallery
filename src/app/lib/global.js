export default function newGlobal(id, init) {
  if (process.env.NODE_ENV === "development") {
    if (!(id in global)) global[id] = init();
    return global[id];
  }
  return init();
}

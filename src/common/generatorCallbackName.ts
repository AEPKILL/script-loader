export function generatorCallbackName() {
  return `AEPKILL_SCRIPT_LOADER_CALLBACK_${+new Date()}_${Math.ceil(Math.random() * 0xFFFFFF)}`;
}

export default generatorCallbackName;

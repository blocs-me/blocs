export const $ = (selector) => global?.window?.document?.querySelector(selector)
export const $$ = (selector) =>
  global?.window?.document?.querySelectorAll(selector)

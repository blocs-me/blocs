const pomodoroPresetSchema = {
  type: "object",
  properties: {
    label: {
      type: "string",
      minLength: 1,
    },
    labelColor: {
      type: "string",
      minLength: 4,
      maxLength: 7,
    },
    pomodoroInterval: {
      type: "number",
      minimum: 300000,
      maximum: 7200000,
    },
    shortBreakInterval: {
      type: "number",
      minimum: 0,
      maximum: 7200000,
    },
    longBreakInterval: {
      type: "number",
      minimum: 0,
      maximum: 7200000,
    },
    id: {
      type: ["string", "null"],
    },
    defaultPreset: {
      type: "boolean",
    },
  },
  required: [
    "id",
    "label",
    "labelColor",
    "pomodoroInterval",
    "shortBreakInterval",
    "longBreakInterval",
  ],
  additionalProperties: false,
}

export default pomodoroPresetSchema

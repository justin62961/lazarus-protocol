export type StoryVariableValue = string | number | boolean

export type VariableDefinition = {
  type: 'integer' | 'string' | 'boolean'
  default: StoryVariableValue
  min?: number
  max?: number
  allowed?: string[]
}

export type StoryCharacter = {
  id: string
  name: string
  role: string
  age: string | number
  summary: string
}

export type StoryFrontmatter = {
  title: string
  format: string
  version: string
  intended_use: string
  genre: string[]
  content_note: string
  start_scene: string
  variables: Record<string, VariableDefinition>
  main_cast: StoryCharacter[]
  world_notes: {
    premise: string
    themes: string[]
    adaptation_notes_for_codex: string[]
  }
}

export type Effect =
  | {
      kind: 'delta'
      variable: string
      amount: number
    }
  | {
      kind: 'set'
      variable: string
      value: StoryVariableValue
    }

export type Choice = {
  label: string
  text: string
  effects: Effect[]
  next: string
}

export type Scene = {
  kind: 'scene'
  id: string
  title: string
  location: string
  mood: string
  cast: string[]
  body: string
  bodyParagraphs: string[]
  choices: Choice[]
  effects: Effect[]
  next?: string
}

export type Ending = {
  kind: 'ending'
  id: string
  title: string
  type: string
  summary: string
  location: string
  mood: string
  cast: string[]
  body: string
  bodyParagraphs: string[]
  choices: Choice[]
  effects: Effect[]
  endingTag?: string
}

export type Story = {
  frontmatter: StoryFrontmatter
  initialVariables: Record<string, StoryVariableValue>
  nodes: Record<string, Scene | Ending>
  order: string[]
}

export type RouteFlag = {
  id: string
  label: string
  description: string
  score: number
  state: 'Dormant' | 'Active' | 'Dominant'
}

export type SaveSnapshot = {
  currentId: string
  variables: Record<string, StoryVariableValue>
  history: string[]
  choiceHistory: Array<{ sceneId: string; label: string; text: string }>
  savedAt?: string
}


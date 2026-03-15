import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import storySource from './content/genesis_code_interactive_novel.md?raw'
import { parseStorySource } from './lib/storyParser'
import type {
  Choice,
  Ending,
  RouteFlag,
  SaveSnapshot,
  Scene,
  StoryCharacter,
  StoryVariableValue,
} from './types'

const AUTOSAVE_KEY = 'lazarus-protocol-autosave'
const SAVE_SLOT_PREFIX = 'lazarus-protocol-slot-'
const SAVE_SLOT_COUNT = 3
const AMBIENT_AUDIO_KEY = 'lazarus-protocol-audio-enabled'
const THREAD_MEMORY_KEY = 'lazarus-protocol-thread-memory'
const MOBILE_LAYOUT_KEY = 'lazarus-protocol-mobile-layout'

type GameState = {
  currentId: string
  variables: Record<string, StoryVariableValue>
  history: string[]
  choiceHistory: Array<{ sceneId: string; label: string; text: string }>
}

type EvidenceItem = {
  id: string
  title: string
  detail: string
  unlocked: boolean
}

type Achievement = {
  id: string
  title: string
  detail: string
  unlocked: boolean
}

type AchievementToast = {
  key: number
  title: string
  detail: string
}

type ThreadMemory = {
  routes: string[]
  endings: string[]
  threads: string[]
}

type ThreadCard = {
  id: string
  title: string
  detail: string
  unlocked: boolean
}

type TabId = 'story' | 'evidence' | 'characters' | 'achievements' | 'threads' | 'state' | 'save'

type EndingJumpSequence = {
  buffer: string
  index: number
}

const story = parseStorySource(storySource)
const endingIds = story.order.filter((id) => story.nodes[id]?.kind === 'ending')
const authorName = 'Justin L. Adams'
const audioFiles = import.meta.glob('./assets/audio/*.{mp3,ogg,wav,m4a}', {
  eager: true,
  import: 'default',
}) as Record<string, string>
const themeSongUrl =
  Object.entries(audioFiles).find(([filePath]) => /\/theme song(?:\.[^/.]+)+$/i.test(filePath))?.[1] ?? null

const starfieldStars = [
  { x: '6%', y: '14%', size: 'near' },
  { x: '12%', y: '68%', size: 'far' },
  { x: '19%', y: '26%', size: 'near' },
  { x: '24%', y: '82%', size: 'far' },
  { x: '31%', y: '44%', size: 'near' },
  { x: '38%', y: '12%', size: 'far' },
  { x: '43%', y: '74%', size: 'near' },
  { x: '49%', y: '32%', size: 'far' },
  { x: '56%', y: '18%', size: 'near' },
  { x: '61%', y: '61%', size: 'far' },
  { x: '68%', y: '27%', size: 'near' },
  { x: '73%', y: '86%', size: 'far' },
  { x: '79%', y: '47%', size: 'near' },
  { x: '84%', y: '16%', size: 'far' },
  { x: '91%', y: '59%', size: 'near' },
  { x: '95%', y: '24%', size: 'far' },
]

const buildInitialState = (): GameState => ({
  currentId: story.frontmatter.start_scene,
  variables: story.initialVariables,
  history: [story.frontmatter.start_scene],
  choiceHistory: [],
})

const clampValue = (
  value: StoryVariableValue,
  definition?: (typeof story.frontmatter.variables)[string],
) => {
  if (!definition) {
    return value
  }

  if (definition.type === 'integer' && typeof value === 'number') {
    const min = typeof definition.min === 'number' ? definition.min : value
    const max = typeof definition.max === 'number' ? definition.max : value
    return Math.min(max, Math.max(min, value))
  }

  if (
    definition.type === 'string' &&
    typeof value === 'string' &&
    Array.isArray(definition.allowed) &&
    definition.allowed.length > 0 &&
    !definition.allowed.includes(value)
  ) {
    return definition.default
  }

  return value
}

const applyEffects = (
  variables: Record<string, StoryVariableValue>,
  effects: Choice['effects'],
) => {
  const nextVariables = { ...variables }

  for (const effect of effects) {
    const definition = story.frontmatter.variables[effect.variable]
    const current = nextVariables[effect.variable]

    if (effect.kind === 'delta' && typeof current === 'number') {
      nextVariables[effect.variable] = clampValue(current + effect.amount, definition)
      continue
    }

    if (effect.kind === 'set') {
      nextVariables[effect.variable] = clampValue(effect.value, definition)
    }
  }

  return nextVariables
}

const normalizeSnapshot = (snapshot: SaveSnapshot | null): GameState | null => {
  if (!snapshot) {
    return null
  }

  if (
    !snapshot.currentId ||
    !(snapshot.currentId in story.nodes) ||
    !snapshot.variables ||
    !Array.isArray(snapshot.history) ||
    !Array.isArray(snapshot.choiceHistory)
  ) {
    return null
  }

  return {
    currentId: snapshot.currentId,
    variables: {
      ...story.initialVariables,
      ...snapshot.variables,
    },
    history:
      snapshot.history.length > 0 && snapshot.history[0] === story.frontmatter.start_scene
        ? snapshot.history
        : [story.frontmatter.start_scene, ...snapshot.history],
    choiceHistory: snapshot.choiceHistory,
  }
}

const readSnapshot = (key: string) => {
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) {
      return null
    }
    return normalizeSnapshot(JSON.parse(raw) as SaveSnapshot)
  } catch {
    return null
  }
}

const readSavedAt = (key: string) => {
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) {
      return undefined
    }
    return (JSON.parse(raw) as SaveSnapshot).savedAt
  } catch {
    return undefined
  }
}

const writeSnapshot = (key: string, state: GameState) => {
  const snapshot: SaveSnapshot = {
    currentId: state.currentId,
    variables: state.variables,
    history: state.history,
    choiceHistory: state.choiceHistory,
    savedAt: new Date().toISOString(),
  }
  window.localStorage.setItem(key, JSON.stringify(snapshot))
}

const formatSavedAt = (value?: string) => {
  if (!value) {
    return 'Empty'
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

const emptyThreadMemory = (): ThreadMemory => ({
  routes: [],
  endings: [],
  threads: [],
})

const readThreadMemory = () => {
  try {
    const raw = window.localStorage.getItem(THREAD_MEMORY_KEY)
    if (!raw) {
      return emptyThreadMemory()
    }

    const parsed = JSON.parse(raw) as Partial<ThreadMemory>
    return {
      routes: Array.isArray(parsed.routes) ? parsed.routes : [],
      endings: Array.isArray(parsed.endings) ? parsed.endings : [],
      threads: Array.isArray(parsed.threads) ? parsed.threads : [],
    }
  } catch {
    return emptyThreadMemory()
  }
}

const writeThreadMemory = (memory: ThreadMemory) => {
  window.localStorage.setItem(THREAD_MEMORY_KEY, JSON.stringify(memory))
}


const getRouteFlags = (
  variables: Record<string, StoryVariableValue>,
  history: string[],
): RouteFlag[] => {
  const visited = new Set(history)

  const scoreSets = {
    science: ['S003', 'S015', 'S019', 'S023', 'S025', 'S041'],
    revelation: ['S017', 'S022', 'S035', 'S039', 'S043'],
    faith: ['S007', 'S010', 'S018', 'S020', 'S024', 'S042'],
    control: ['S006', 'S015', 'S026', 'S037', 'S038', 'S040', 'S045'],
  }

  const sceneScore = (ids: string[]) => ids.filter((id) => visited.has(id)).length

  const faithValue = Number(variables.faith ?? 0)
  const exposureValue = Number(variables.exposure ?? 0)
  const trustElias = Number(variables.trust_elias ?? 0)
  const trustLaila = Number(variables.trust_laila ?? 0)
  const sampleStatus = String(variables.sample_status ?? 'intact')
  const protocolCopy = Boolean(variables.protocol_copy)

  const flags = [
    {
      id: 'science',
      label: 'Science',
      description: 'Containment, sequencing, reproducibility, and hard evidence.',
      score:
        sceneScore(scoreSets.science) +
        (protocolCopy ? 2 : 0) +
        (sampleStatus === 'intact' ? 2 : sampleStatus === 'split' ? 1 : 0),
    },
    {
      id: 'revelation',
      label: 'Revelation',
      description: 'Disclosure, publication, leaks, and public reckoning.',
      score: sceneScore(scoreSets.revelation) + Math.max(0, exposureValue) + Math.max(0, trustLaila),
    },
    {
      id: 'faith',
      label: 'Faith',
      description: 'Archive truth, spiritual consequence, and moral witness.',
      score: sceneScore(scoreSets.faith) + Math.max(0, faithValue) + Math.max(0, trustElias),
    },
    {
      id: 'control',
      label: 'Control',
      description: 'State power, managed secrecy, and custodial compromise.',
      score: sceneScore(scoreSets.control) + (visited.has('S006') ? 2 : 0) + (visited.has('S015') ? 2 : 0),
    },
  ]

  const highest = Math.max(...flags.map((flag) => flag.score), 0)

  return flags.map((flag) => ({
    ...flag,
    state: flag.score === 0 ? 'Dormant' : flag.score === highest ? 'Dominant' : 'Active',
  }))
}

const getEvidenceItems = (
  variables: Record<string, StoryVariableValue>,
  history: string[],
): EvidenceItem[] => {
  const visited = new Set(history)

  return [
    {
      id: 'sample',
      title: 'Cryogenic Sample',
      detail: `Status: ${String(variables.sample_status ?? 'unknown')}. The preserved lattice linked to Navarre's final warning remains central to every route.`,
      unlocked: visited.has('S001'),
    },
    {
      id: 'notebook',
      title: "Navarre's Notebook",
      detail:
        'Clinical trial numbers, monastery holdings, and the line about flesh remembering the first command.',
      unlocked: Boolean(variables.protocol_copy) || visited.has('S003') || visited.has('S025'),
    },
    {
      id: 'photos',
      title: 'Intruder Photos',
      detail:
        'Fragments of boots, gear, and a wrist tattoo provide the first hard trace of the hunters behind the hospital assault.',
      unlocked: visited.has('S004'),
    },
    {
      id: 'father',
      title: 'Jonah File / Family Secret',
      detail:
        "Evidence that Mara's father and brother were entangled in the protocol long before Jerusalem.",
      unlocked: Boolean(variables.father_truth) || visited.has('S009') || visited.has('S047'),
    },
    {
      id: 'archive',
      title: 'Archive Testimony',
      detail:
        'Priests, sealed texts, and inherited memory reshape the event from miracle rumor into lineage history.',
      unlocked: visited.has('S018') || visited.has('S020') || visited.has('S024'),
    },
    {
      id: 'helix',
      title: 'Helix Ark Dossier',
      detail:
        "Corporate infrastructure, island labs, and Anton Saric's pitch for managed resurrection.",
      unlocked: visited.has('S022') || visited.has('S033') || visited.has('S041'),
    },
    {
      id: 'press',
      title: 'Publication Trail',
      detail:
        'Leaks, mirrored archives, and press alliances widen the conflict beyond laboratories and chapels.',
      unlocked: visited.has('S017') || visited.has('S035') || Number(variables.exposure ?? 0) >= 3,
    },
  ]
}

const getEndingSummary = (node: Scene | Ending | undefined) => {
  if (!node || node.kind !== 'ending') {
    return null
  }

  return {
    type: node.type,
    summary: node.summary,
    tag: node.endingTag,
  }
}


const getEndingPresentation = (
  node: Scene | Ending,
  routeFlags: RouteFlag[],
  evidenceItems: EvidenceItem[],
  threadMemory: ThreadMemory,
) => {
  if (node.kind !== 'ending') {
    return null
  }

  const dominantRoutes = routeFlags
    .slice()
    .sort((left, right) => right.score - left.score)
    .filter((flag) => flag.score > 0)
    .slice(0, 2)

  const unlockedEvidence = evidenceItems.filter((item) => item.unlocked).slice(0, 4)

  return {
    dominantRoutes,
    unlockedEvidence,
    threadCount: threadMemory.routes.length + threadMemory.endings.length + threadMemory.threads.length,
  }
}

const getNodeTargets = (node: Scene | Ending) => {
  if (node.kind === 'ending') {
    return []
  }

  const choiceTargets = node.choices.map((choice) => choice.next)
  return node.next ? [...choiceTargets, node.next] : choiceTargets
}

const getDistanceToEnding = (
  nodeId: string,
  mode: 'shortest' | 'longest',
  memo: Map<string, number>,
  visiting = new Set<string>(),
): number => {
  if (memo.has(nodeId)) {
    return memo.get(nodeId) ?? 0
  }

  if (visiting.has(nodeId)) {
    return 0
  }

  visiting.add(nodeId)
  const node = story.nodes[nodeId]

  if (!node) {
    visiting.delete(nodeId)
    return 0
  }

  if (node.kind === 'ending') {
    memo.set(nodeId, 1)
    visiting.delete(nodeId)
    return 1
  }

  const targets = getNodeTargets(node)
  if (targets.length === 0) {
    memo.set(nodeId, 1)
    visiting.delete(nodeId)
    return 1
  }

  const distances = targets
    .map((targetId) => getDistanceToEnding(targetId, mode, memo, new Set(visiting)))
    .filter((distance) => distance > 0)

  const nextDistance =
    distances.length === 0
      ? 0
      : mode === 'shortest'
        ? Math.min(...distances)
        : Math.max(...distances)

  const resolved = nextDistance > 0 ? nextDistance + 1 : 1
  memo.set(nodeId, resolved)
  visiting.delete(nodeId)
  return resolved
}

const storyDistanceRange = {
  shortest: getDistanceToEnding(story.frontmatter.start_scene, 'shortest', new Map()),
  longest: getDistanceToEnding(story.frontmatter.start_scene, 'longest', new Map()),
}

type SceneVisualHook = {
  theme: 'hospital' | 'tunnel' | 'archive' | 'lab' | 'chapel' | 'city' | 'default'
  plate: string
  tone: string
}

const getSceneVisualHook = (node: Scene | Ending): SceneVisualHook => {
  const location = node.location.toLowerCase()
  const mood = node.mood.toLowerCase()

  if (location.includes('hospital')) {
    return {
      theme: 'hospital',
      plate: node.location,
      tone: 'Sterile stormlight, failing monitors, and emergency glow.',
    }
  }

  if (location.includes('tunnel') || location.includes('beneath') || location.includes('underground')) {
    return {
      theme: 'tunnel',
      plate: node.location,
      tone: 'Steam, rust-red alarms, and pressure closing in from both sides.',
    }
  }

  if (location.includes('archive') || location.includes('library') || location.includes('repository')) {
    return {
      theme: 'archive',
      plate: node.location,
      tone: 'Dust, parchment grain, and the hush of guarded testimony.',
    }
  }

  if (location.includes('chapel') || location.includes('monastery') || location.includes('cathedral')) {
    return {
      theme: 'chapel',
      plate: node.location,
      tone: 'Stone shadow, candle haze, and muted stained-glass color.',
    }
  }

  if (location.includes('lab') || location.includes('facility') || location.includes('helix')) {
    return {
      theme: 'lab',
      plate: node.location,
      tone: 'Clinical light, glass reflections, and engineered calm.',
    }
  }

  if (location.includes('jerusalem') || location.includes('street') || location.includes('city')) {
    return {
      theme: 'city',
      plate: node.location,
      tone: 'Rain-slick stone, distant sirens, and a city holding its breath.',
    }
  }

  if (mood.includes('ominous') || mood.includes('urgent')) {
    return {
      theme: 'hospital',
      plate: node.location,
      tone: 'The air feels charged, unstable, and moments from rupture.',
    }
  }

  return {
    theme: 'default',
    plate: node.location,
    tone: 'The atmosphere shifts quietly around the scene without overtaking it.',
  }
}


const normalizeForMatch = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()

const characterAliases: Record<string, string[]> = {
  'Dr. Mara Vale': ['mara vale', 'dr mara vale', 'mara'],
  'Father Elias Voss': ['father elias voss', 'father elias', 'elias voss', 'elias'],
  'Laila Arendt': ['laila arendt', 'laila'],
  'Jonah Vale': ['jonah vale', 'jonah'],
  'Dr. Anton Saric': ['dr anton saric', 'anton saric', 'saric'],
  'Sister Celene Orlov': ['sister celene orlov', 'sister celene', 'celene orlov', 'celene'],
  'Director Nolan Rhyse': ['director nolan rhyse', 'nolan rhyse', 'rhyse'],
}

const getRevealedCharacters = (history: string[]) => {
  const visitedNodes = history
    .map((id) => story.nodes[id])
    .filter((node): node is Scene | Ending => Boolean(node))

  return story.frontmatter.main_cast.filter((character) => {
    const aliases = characterAliases[character.name] ?? [character.name]

    return visitedNodes.some((node) => {
      const haystack = normalizeForMatch(`${node.cast.join(' ')} ${node.body}`)
      return aliases.some((alias) => haystack.includes(normalizeForMatch(alias)))
    })
  })
}

const getAchievements = (
  variables: Record<string, StoryVariableValue>,
  history: string[],
  revealedCharacterCount: number,
): Achievement[] => {
  const visited = new Set(history)
  const endingReached = history.some((id) => story.nodes[id]?.kind === 'ending')

  return [
    {
      id: 'first-decision',
      title: 'First Threshold',
      detail: 'Take the story past its opening uncertainty and commit to a path.',
      unlocked: history.length > 1,
    },
    {
      id: 'archive-thread',
      title: 'Archive Thread',
      detail: 'Reach the testimony and inherited-memory branch of the file.',
      unlocked: visited.has('S018') || visited.has('S020') || visited.has('S024'),
    },
    {
      id: 'helix-contact',
      title: 'Helix Contact',
      detail: 'Surface the corporate architecture behind the resurrection program.',
      unlocked: visited.has('S022') || visited.has('S033') || visited.has('S041'),
    },
    {
      id: 'family-truth',
      title: 'Bloodline Breach',
      detail: 'Expose the personal history binding Mara, Jonah, and the protocol.',
      unlocked: Boolean(variables.father_truth) || visited.has('S009') || visited.has('S047'),
    },
    {
      id: 'elias-trust',
      title: 'Operational Trust',
      detail: 'Earn Father Elias Voss as more than an escort.',
      unlocked: Number(variables.trust_elias ?? 0) >= 2,
    },
    {
      id: 'laila-trust',
      title: 'Press Alliance',
      detail: 'Bring Laila close enough to become a true co-conspirator.',
      unlocked: Number(variables.trust_laila ?? 0) >= 2,
    },
    {
      id: 'full-cast',
      title: 'All Known Faces',
      detail: 'Reveal every main cast profile in the dossier.',
      unlocked: revealedCharacterCount === story.frontmatter.main_cast.length && revealedCharacterCount > 0,
    },
    {
      id: 'ending-reached',
      title: 'Case Closed',
      detail: 'Reach any ending and close out a route.',
      unlocked: endingReached,
    },
  ]
}

const getThreadsExploredCards = (memory: ThreadMemory) => {
  const routeCards: ThreadCard[] = [
    {
      id: 'science',
      title: 'Science Route',
      detail: 'Containment, evidence, sequencing, and reproducible proof.',
      unlocked: memory.routes.includes('science'),
    },
    {
      id: 'faith',
      title: 'Faith Route',
      detail: 'Archive truth, spiritual consequence, and witness.',
      unlocked: memory.routes.includes('faith'),
    },
    {
      id: 'revelation',
      title: 'Revelation Route',
      detail: 'Disclosure, publication, leaks, and moral reckoning.',
      unlocked: memory.routes.includes('revelation'),
    },
    {
      id: 'control',
      title: 'Control Route',
      detail: 'State compromise, managed secrecy, and custodial power.',
      unlocked: memory.routes.includes('control'),
    },
  ]

  const endingCards: ThreadCard[] = [
    {
      id: 'ending_science',
      title: 'Science Ending',
      detail: 'You have closed at least one route through evidence and containment logic.',
      unlocked: memory.endings.includes('science') || memory.endings.includes('science-ending'),
    },
    {
      id: 'ending_faith',
      title: 'Faith Ending',
      detail: 'You have reached an ending shaped by archive truth and moral witness.',
      unlocked: memory.endings.includes('faith') || memory.endings.includes('faith-ending'),
    },
    {
      id: 'ending_revelation',
      title: 'Revelation Ending',
      detail: 'You have reached an ending driven by disclosure and public reckoning.',
      unlocked: memory.endings.includes('revelation') || memory.endings.includes('revelation-ending'),
    },
    {
      id: 'ending_control',
      title: 'Control Ending',
      detail: 'You have reached an ending defined by compromise, control, or containment by force.',
      unlocked: memory.endings.includes('control') || memory.endings.includes('control-ending'),
    },
  ]

  const threadCards: ThreadCard[] = [
    {
      id: 'thread_sample',
      title: 'Sample Chain',
      detail: 'The biological core of the miracle enters your long-term case file.',
      unlocked: memory.threads.includes('sample'),
    },
    {
      id: 'thread_archive',
      title: 'Archive Testimony',
      detail: 'Priests, sealed texts, and inherited memory have entered the record.',
      unlocked: memory.threads.includes('archive'),
    },
    {
      id: 'thread_helix',
      title: 'Helix Ark',
      detail: 'Corporate architecture and biotech ambition have been surfaced.',
      unlocked: memory.threads.includes('helix'),
    },
    {
      id: 'thread_family',
      title: 'Vale Bloodline',
      detail: 'The personal history tying Mara, Jonah, and the protocol has been uncovered.',
      unlocked: memory.threads.includes('family'),
    },
    {
      id: 'thread_press',
      title: 'Publication Trail',
      detail: 'Leaks, mirrors, and outside dissemination have become part of the story memory.',
      unlocked: memory.threads.includes('press'),
    },
  ]

  return { routeCards, endingCards, threadCards }
}

const getThreadMemoryUnlocks = (
  currentId: string,
  variables: Record<string, StoryVariableValue>,
  history: string[],
) => {
  const node = story.nodes[currentId]
  const routeIds = getRouteFlags(variables, history)
    .filter((flag) => flag.score >= 3 || flag.state === 'Dominant')
    .map((flag) => flag.id)

  const threadIds = [
    getEvidenceItems(variables, history).find((item) => item.id === 'sample')?.unlocked ? 'sample' : null,
    getEvidenceItems(variables, history).find((item) => item.id === 'archive')?.unlocked ? 'archive' : null,
    getEvidenceItems(variables, history).find((item) => item.id === 'helix')?.unlocked ? 'helix' : null,
    getEvidenceItems(variables, history).find((item) => item.id === 'father')?.unlocked ? 'family' : null,
    getEvidenceItems(variables, history).find((item) => item.id === 'press')?.unlocked ? 'press' : null,
  ].filter((value): value is string => Boolean(value))

  const endingIds = node?.kind === 'ending' ? [node.endingTag || node.type.toLowerCase()] : []

  return {
    routes: routeIds,
    endings: endingIds,
    threads: threadIds,
  }
}

const mergeThreadMemory = (base: ThreadMemory, updates: ThreadMemory): ThreadMemory => ({
  routes: Array.from(new Set([...base.routes, ...updates.routes])),
  endings: Array.from(new Set([...base.endings, ...updates.endings])),
  threads: Array.from(new Set([...base.threads, ...updates.threads])),
})

const threadMemoryChanged = (left: ThreadMemory, right: ThreadMemory) =>
  left.routes.length !== right.routes.length ||
  left.endings.length !== right.endings.length ||
  left.threads.length !== right.threads.length


const getWorldStateSignals = (variables: Record<string, StoryVariableValue>) => {
  const exposure = Number(variables.exposure ?? 0)
  const faith = Number(variables.faith ?? 0)
  const trustElias = Number(variables.trust_elias ?? 0)
  const trustLaila = Number(variables.trust_laila ?? 0)
  const protocolCopy = Boolean(variables.protocol_copy)
  const fatherTruth = Boolean(variables.father_truth)
  const sampleStatus = String(variables.sample_status ?? 'intact')
  const endingTag = String(variables.ending_tag ?? '')

  return [
    {
      label: 'Exposure Climate',
      value: exposure >= 4 ? 'Global Pressure' : exposure >= 2 ? 'Leaks Spreading' : 'Contained Shadows',
      detail:
        exposure >= 4
          ? 'Too many actors know pieces of the truth now. Containment is cracking.'
          : exposure >= 2
            ? 'The secret is circulating in fragments, rumors, and dangerous half-proofs.'
            : 'Only a narrow circle seems aware of the protocol. Silence still has weight.',
    },
    {
      label: 'Spiritual Pressure',
      value: faith >= 2 ? 'Drawn Toward Revelation' : faith <= -1 ? 'Hard Skepticism' : 'Moral Uncertainty',
      detail:
        faith >= 2
          ? 'Mara is leaning toward archive truth, witness, and the cost of miracle.'
          : faith <= -1
            ? 'She is resisting symbolic framing and trusting only what can be forced into evidence.'
            : 'Conviction is unsettled. Science and conscience are still in open tension.',
    },
    {
      label: 'Elias Relationship',
      value: trustElias >= 2 ? 'Operational Trust' : trustElias <= -1 ? 'Fractured Alliance' : 'Uneasy Cooperation',
      detail:
        trustElias >= 2
          ? 'The priest is becoming a real partner, not just an expedient escort.'
          : trustElias <= -1
            ? 'His omissions and instincts are becoming liabilities.'
            : 'He remains useful, suspect, and difficult to dismiss.',
    },
    {
      label: 'Laila Relationship',
      value: trustLaila >= 2 ? 'Press Alliance' : trustLaila <= -1 ? 'Mutual Risk' : 'Potential Asset',
      detail:
        trustLaila >= 2
          ? 'The journalist is moving from contact to co-conspirator.'
          : trustLaila <= -1
            ? 'Disclosure and trust are pulling in different directions.'
            : 'She is nearby in the story, but not fully inside the circle yet.',
    },
    {
      label: 'Protocol Material',
      value: protocolCopy ? 'Duplicate in Play' : 'Single Known Thread',
      detail: protocolCopy
        ? 'Notes, copies, or technical traces exist beyond the original sample.'
        : 'The core secret appears to remain concentrated in a single surviving path.',
    },
    {
      label: 'Family Secret',
      value: fatherTruth ? 'Compromised by Truth' : 'Still Buried',
      detail: fatherTruth
        ? 'Jonah and Mara\'s father are now part of the moral center of the case.'
        : 'The personal history behind the protocol has not fully surfaced yet.',
    },
    {
      label: 'Sample Integrity',
      value:
        sampleStatus === 'intact'
          ? 'Intact'
          : sampleStatus === 'split'
            ? 'Fragmented'
            : sampleStatus === 'damaged'
              ? 'Damaged'
              : 'Lost',
      detail:
        sampleStatus === 'intact'
          ? 'The biological core remains whole enough to matter to every faction.'
          : sampleStatus === 'split'
            ? 'The truth is physically dispersed, safer but harder to control.'
            : sampleStatus === 'damaged'
              ? 'The material survives in degraded form, increasing urgency and uncertainty.'
              : 'The sample is gone, forcing the conflict onto testimony, copies, and memory.',
    },
    {
      label: 'Endgame Marker',
      value: endingTag || 'Not Yet Set',
      detail: endingTag
        ? 'An ending state has been written into the run record.'
        : 'No ending commitment has been recorded yet.',
    },
  ]
}

const parseInlineMarkup = (text: string) => {
  const parts: Array<{ text: string; kind: 'plain' | 'bold' | 'italic' | 'code' }> = []
  const pattern = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g
  let lastIndex = 0

  for (const match of text.matchAll(pattern)) {
    const full = match[0]
    const index = match.index ?? 0

    if (index > lastIndex) {
      parts.push({ text: text.slice(lastIndex, index), kind: 'plain' })
    }

    if (full.startsWith('**')) {
      parts.push({ text: full.slice(2, -2), kind: 'bold' })
    } else if (full.startsWith('*')) {
      parts.push({ text: full.slice(1, -1), kind: 'italic' })
    } else {
      parts.push({ text: full.slice(1, -1), kind: 'code' })
    }

    lastIndex = index + full.length
  }

  if (lastIndex < text.length) {
    parts.push({ text: text.slice(lastIndex), kind: 'plain' })
  }

  return parts
}

const RichParagraph = ({ text }: { text: string }) => (
  <p>
    {parseInlineMarkup(text).map((part, index) => {
      if (part.kind === 'bold') {
        return <strong key={`${part.text}-${index}`}>{part.text}</strong>
      }

      if (part.kind === 'italic') {
        return <em key={`${part.text}-${index}`}>{part.text}</em>
      }

      if (part.kind === 'code') {
        return <code key={`${part.text}-${index}`}>{part.text}</code>
      }

      return <span key={`${part.text}-${index}`}>{part.text}</span>
    })}
  </p>
)

const SceneBody = ({
  nodeId,
  paragraphs,
  revealAll,
}: {
  nodeId: string
  paragraphs: string[]
  revealAll: boolean
}) => {
  const [visibleCount, setVisibleCount] = useState(paragraphs.length > 0 ? 1 : 0)

  useEffect(() => {
    if (paragraphs.length <= 1 || revealAll) {
      return
    }

    const timer = window.setInterval(() => {
      setVisibleCount((current) => {
        if (current >= paragraphs.length) {
          window.clearInterval(timer)
          return current
        }
        return current + 1
      })
    }, 620)

    return () => window.clearInterval(timer)
  }, [paragraphs.length, revealAll])

  const count = revealAll ? paragraphs.length : visibleCount

  return (
    <div className="storyBody" key={nodeId}>
      {paragraphs.slice(0, count).map((paragraph, index) => (
        <div className="storyParagraph" key={`${nodeId}-${index}`}>
          <RichParagraph text={paragraph} />
        </div>
      ))}
    </div>
  )
}
const ChoiceButton = ({
  choice,
  onSelect,
}: {
  choice: Choice
  onSelect: (choice: Choice) => void
}) => (
  <button className="choiceButton" onClick={() => onSelect(choice)}>
    <span className="choiceLabel">{choice.label}</span>
    <span className="choiceText">{choice.text}</span>
  </button>
)

const CharacterCard = ({ character }: { character: StoryCharacter }) => (
  <article className="characterCard">
    <div className="characterMeta">
      <span className="characterId">{character.id}</span>
      <span>{character.role}</span>
      <span>Age {character.age}</span>
    </div>
    <h3>{character.name}</h3>
    <p>{character.summary}</p>
  </article>
)

function App() {
  const [gameState, setGameState] = useState<GameState>(() => readSnapshot(AUTOSAVE_KEY) ?? buildInitialState())
  const [activeTab, setActiveTab] = useState<TabId>('story')
  const [isAudioEnabled, setIsAudioEnabled] = useState(() => window.localStorage.getItem(AMBIENT_AUDIO_KEY) === 'true')
  const [isMobileLayout, setIsMobileLayout] = useState(() => window.localStorage.getItem(MOBILE_LAYOUT_KEY) === 'true')
  const audioElementRef = useRef<HTMLAudioElement | null>(null)
  const [isWorldStateOpen, setIsWorldStateOpen] = useState(false)
  const [isMobileDossierOpen, setIsMobileDossierOpen] = useState(false)
  const [revealedSceneId, setRevealedSceneId] = useState<string>('')
  const [achievementToasts, setAchievementToasts] = useState<AchievementToast[]>([])
  const [threadMemory, setThreadMemory] = useState<ThreadMemory>(() => readThreadMemory())
  const endingJumpRef = useRef<EndingJumpSequence>({ buffer: '', index: 0 })
  const [slotTimestamps, setSlotTimestamps] = useState<Record<number, string | undefined>>(() =>
    Object.fromEntries(
      Array.from({ length: SAVE_SLOT_COUNT }, (_, index) => [index + 1, readSavedAt(`${SAVE_SLOT_PREFIX}${index + 1}`)]),
    ) as Record<number, string | undefined>,
  )

  const currentNode = story.nodes[gameState.currentId]
  const routeFlags = useMemo(
    () => getRouteFlags(gameState.variables, gameState.history),
    [gameState.history, gameState.variables],
  )
  const evidenceItems = useMemo(
    () => getEvidenceItems(gameState.variables, gameState.history),
    [gameState.history, gameState.variables],
  )
  const endingSummary = getEndingSummary(currentNode)
  const sceneIsFullyRevealed = revealedSceneId === currentNode.id
  const worldStateSignals = useMemo(() => getWorldStateSignals(gameState.variables), [gameState.variables])
  const sceneVisualHook = useMemo(() => getSceneVisualHook(currentNode), [currentNode])

  const revealedCharacters = useMemo(() => getRevealedCharacters(gameState.history), [gameState.history])
  const achievements = useMemo(
    () => getAchievements(gameState.variables, gameState.history, revealedCharacters.length),
    [gameState.history, gameState.variables, revealedCharacters.length],
  )
  const currentThreadUnlocks = useMemo(
    () => getThreadMemoryUnlocks(gameState.currentId, gameState.variables, gameState.history),
    [gameState.currentId, gameState.history, gameState.variables],
  )
  const mergedThreadMemory = useMemo(
    () => mergeThreadMemory(threadMemory, currentThreadUnlocks),
    [currentThreadUnlocks, threadMemory],
  )
  const threadsExplored = useMemo(() => getThreadsExploredCards(mergedThreadMemory), [mergedThreadMemory])
  const endingPresentation = useMemo(
    () => getEndingPresentation(currentNode, routeFlags, evidenceItems, mergedThreadMemory),
    [currentNode, evidenceItems, mergedThreadMemory, routeFlags],
  )
  const progressPercent = useMemo(() => {
    const traversed = Math.max(gameState.history.length, 1)
    const denominator = Math.max(storyDistanceRange.longest - 1, 1)
    return Math.min(100, Math.max(0, Math.round(((traversed - 1) / denominator) * 100)))
  }, [gameState.history.length])
  const progressLabel = useMemo(() => {
    if (progressPercent >= 100 || currentNode.kind === "ending") {
      return 'Route complete'
    }

    if (progressPercent >= 75) {
      return 'Approaching the endgame'
    }

    if (progressPercent >= 45) {
      return 'Deep in the file'
    }

    if (progressPercent >= 20) {
      return 'The trail is opening'
    }

    return 'Opening movement'
  }, [currentNode.kind, progressPercent])

  const previousAchievementIdsRef = useRef<string[]>([])
  const previousSceneIdRef = useRef(gameState.currentId)
  const achievementToastKeyRef = useRef(0)

  useEffect(() => {
    const unlockedIds = achievements.filter((achievement) => achievement.unlocked).map((achievement) => achievement.id)
    const sceneChanged = previousSceneIdRef.current !== gameState.currentId
    previousSceneIdRef.current = gameState.currentId

    if (!sceneChanged && previousAchievementIdsRef.current.length === 0) {
      previousAchievementIdsRef.current = unlockedIds
      return
    }

    const newUnlocks = achievements.filter(
      (achievement) => achievement.unlocked && !previousAchievementIdsRef.current.includes(achievement.id),
    )

    previousAchievementIdsRef.current = unlockedIds

    if (newUnlocks.length === 0) {
      return
    }

    const latestUnlock = newUnlocks[newUnlocks.length - 1]
    const key = achievementToastKeyRef.current + 1
    achievementToastKeyRef.current = key
    setAchievementToasts([{ key, title: latestUnlock.title, detail: latestUnlock.detail }])

    const timeoutId = window.setTimeout(() => {
      setAchievementToasts((current) => current.filter((toast) => toast.key !== key))
    }, 2800)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [achievements, gameState.currentId])

  useEffect(() => {
    writeSnapshot(AUTOSAVE_KEY, gameState)
  }, [gameState])

  useEffect(() => {
    if (!threadMemoryChanged(threadMemory, mergedThreadMemory)) {
      return
    }

    writeThreadMemory(mergedThreadMemory)
    const timer = window.setTimeout(() => {
      setThreadMemory(mergedThreadMemory)
    }, 0)

    return () => window.clearTimeout(timer)
  }, [mergedThreadMemory, threadMemory])


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [gameState.currentId])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsWorldStateOpen(false)
        setIsMobileDossierOpen(false)
      }

      if (event.key.length === 1) {
        const nextBuffer = (endingJumpRef.current.buffer + event.key.toLowerCase()).slice(-7)
        endingJumpRef.current.buffer = nextBuffer

        if (nextBuffer === 'endtest' && endingIds.length > 0) {
          const nextEndingId = endingIds[endingJumpRef.current.index % endingIds.length]
          endingJumpRef.current.index += 1
          endingJumpRef.current.buffer = ''
          setIsWorldStateOpen(false)
          setActiveTab('story')
          setRevealedSceneId(nextEndingId)
          setGameState((current) => ({
            currentId: nextEndingId,
            variables: current.variables,
            history: current.history.includes(nextEndingId) ? current.history : [...current.history, nextEndingId],
            choiceHistory: current.choiceHistory,
          }))
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])
  useEffect(() => {
    window.localStorage.setItem(AMBIENT_AUDIO_KEY, String(isAudioEnabled))
  }, [isAudioEnabled])

  useEffect(() => {
    window.localStorage.setItem(MOBILE_LAYOUT_KEY, String(isMobileLayout))
  }, [isMobileLayout])

  useEffect(() => {
    if (!themeSongUrl) {
      return
    }
    const audio = new Audio(themeSongUrl)
    audio.loop = true
    audio.preload = 'auto'
    audio.volume = 0.42
    audioElementRef.current = audio
    return () => {
      audio.pause()
      audio.removeAttribute('src')
      audio.load()
      audioElementRef.current = null
    }
  }, [])

  const selectChoice = (choice: Choice) => {
    setIsMobileDossierOpen(false)
    setRevealedSceneId('')
    setGameState((current) => ({
      currentId: choice.next,
      variables: applyEffects(current.variables, choice.effects),
      history: [...current.history, choice.next],
      choiceHistory: [
        ...current.choiceHistory,
        {
          sceneId: current.currentId,
          label: choice.label,
          text: choice.text,
        },
      ],
    }))
  }

  const continueScene = () => {
    setIsMobileDossierOpen(false)
    if (currentNode.kind !== 'scene' || !currentNode.next) {
      return
    }

    const nextSceneId = currentNode.next
    setRevealedSceneId('')
    setGameState((current) => ({
      currentId: nextSceneId,
      variables: applyEffects(current.variables, currentNode.effects),
      history: [...current.history, nextSceneId],
      choiceHistory: current.choiceHistory,
    }))
  }

  const restart = () => {
    setIsMobileDossierOpen(false)
    setRevealedSceneId('')
    setGameState(buildInitialState())
  }

  const saveToSlot = (slot: number) => {
    const key = `${SAVE_SLOT_PREFIX}${slot}`
    writeSnapshot(key, gameState)
    setSlotTimestamps((current) => ({
      ...current,
      [slot]: readSavedAt(key),
    }))
  }

  const loadFromSlot = (slot: number) => {
    const snapshot = readSnapshot(`${SAVE_SLOT_PREFIX}${slot}`)
    if (snapshot) {
      setRevealedSceneId('')
      setIsMobileDossierOpen(false)
      setIsWorldStateOpen(false)
      setGameState(snapshot)
    }
  }

  const loadAutosave = () => {
    const snapshot = readSnapshot(AUTOSAVE_KEY)
    if (snapshot) {
      setRevealedSceneId('')
      setIsMobileDossierOpen(false)
      setIsWorldStateOpen(false)
      setGameState(snapshot)
    }
  }

  const openWorldState = () => {
    setIsWorldStateOpen(false)
    setActiveTab('state')
    setIsMobileDossierOpen(true)
  }

  useEffect(() => {
    const audio = audioElementRef.current
    if (!audio) {
      return
    }
    if (isAudioEnabled) {
      void audio.play().catch(() => {
        setIsAudioEnabled(false)
      })
      return
    }
    audio.pause()
  }, [isAudioEnabled])
  const toggleAmbientAudio = async () => {
    if (!themeSongUrl) {
      return
    }
    const nextEnabled = !isAudioEnabled
    setIsAudioEnabled(nextEnabled)
  }
  const closeWorldState = () => {
    setIsWorldStateOpen(false)
  }

  return (
    <div className={isMobileLayout ? `appShell mobileMode${isMobileDossierOpen ? ' mobileDossierActive' : ''}` : 'appShell'}>
      <div className="starfield" aria-hidden="true">
        <div className="cloudLayer cloudLayerOne">
          <span className="cloud cloudA" />
          <span className="cloud cloudB" />
        </div>
        <div className="cloudLayer cloudLayerTwo">
          <span className="cloud cloudC" />
          <span className="cloud cloudD" />
        </div>
        <div className="starfieldLayer starfieldLayerFar">
          {starfieldStars.filter((star) => star.size === 'far').map((star, index) => (
            <span
              className="star starFar"
              key={`far-${index}`}
              style={{ left: star.x, top: star.y, animationDelay: `${index * 0.8}s` }}
            />
          ))}
        </div>
        <div className="starfieldLayer starfieldLayerNear">
          {starfieldStars.filter((star) => star.size === 'near').map((star, index) => (
            <span
              className="star starNear"
              key={`near-${index}`}
              style={{ left: star.x, top: star.y, animationDelay: `${index * 0.55}s` }}
            />
          ))}
        </div>
      </div>
      {achievementToasts.length > 0 ? (
        <div className="achievementToastStack" aria-live="polite" aria-atomic="true">
          {achievementToasts.map((toast) => (
            <article className="achievementToast" key={toast.key}>
              <span>Achievement Unlocked</span>
              <strong>{toast.title}</strong>
              <p>{toast.detail}</p>
            </article>
          ))}
        </div>
      ) : null}

      <header className="masthead">
        <div>
          <p className="eyebrow">Playable Visual Interactive Novel</p>
          <h1>{story.frontmatter.title}</h1>
          <p className="authorCredit">Author: {authorName}</p>
          <p className="deck">
            {story.frontmatter.genre.join(' / ')}. Branching state, dossier tracking, and preserved prose from the
            source manuscript.
          </p>
        </div>
        <div className="topControls">
          <button
            className={isAudioEnabled ? 'secondaryButton activeControl' : 'secondaryButton'}
            disabled={!themeSongUrl}
            onClick={() => void toggleAmbientAudio()}
            title={themeSongUrl ? 'Toggle the theme song' : 'Add src/assets/audio/theme song.mp3 to enable music'}
          >
            {themeSongUrl ? `Audio: ${isAudioEnabled ? 'On' : 'Off'}` : 'Audio File Missing'}
          </button>
          <button
            className={isMobileLayout ? 'secondaryButton activeControl' : 'secondaryButton'}
            onClick={() => {
              setIsMobileLayout((current: boolean) => {
                const next = !current
                if (!next) {
                  setIsMobileDossierOpen(false)
                }
                return next
              })
            }}
            title="Toggle the compact mobile-style layout"
          >
            Mobile: {isMobileLayout ? 'On' : 'Off'}
          </button>
          {isMobileLayout ? (
            <button
              className={isMobileDossierOpen && activeTab === 'save' ? 'secondaryButton activeControl' : 'secondaryButton'}
              onClick={() => {
                setActiveTab('save')
                setIsMobileDossierOpen(true)
              }}
            >
              Save
            </button>
          ) : (
            <>
              <button
                className={isMobileDossierOpen ? 'secondaryButton activeControl' : 'secondaryButton'}
                onClick={() => setIsMobileDossierOpen(true)}
              >
                Dossier
              </button>
              <button className="secondaryButton" onClick={openWorldState}>
                World State
              </button>
              <button className="secondaryButton" onClick={restart}>
                Restart
              </button>
              <button className="secondaryButton" onClick={() => setRevealedSceneId(currentNode.id)}>
                Reveal Scene
              </button>
            </>
          )}
        </div>
      </header>

      <main className="novelLayout">
        <section className="stagePanel">
          <div className="sceneCard">
            <div className={`sceneBackdrop sceneBackdrop--${sceneVisualHook.theme}`} aria-hidden="true">
              <span className="sceneBackdropGlow sceneBackdropGlowOne" />
              <span className="sceneBackdropGlow sceneBackdropGlowTwo" />
              <span className="sceneBackdropTexture" />
            </div>
            <div className="sceneInner">
            <div className="sceneMetaRow">
              <span className="sceneBadge">{currentNode.id}</span>
              <span>{currentNode.location}</span>
              <span>{currentNode.mood}</span>
            </div>
            <div className="sceneMetaRow cast">
              <span>Cast</span>
              <span>{currentNode.cast.join(', ') || 'Unspecified'}</span>
            </div>
            <section className="progressPanel" aria-label="Story progress">
              <div className="progressHeader">
                <span>Story Progress</span>
                <strong>{progressPercent}%</strong>
              </div>
              <div
                className="progressTrack"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progressPercent}
              >
                <span className="progressFill" style={{ width: `${progressPercent}%` }} />
              </div>
              <p>
                {progressLabel}. Scene {gameState.history.length} of roughly {storyDistanceRange.longest} in a full
                run.
              </p>
            </section>
            <h2>{currentNode.title}</h2>
            <div className="locationPlate">
              <span>Scene Atmosphere</span>
              <strong>{sceneVisualHook.plate}</strong>
              <p>{sceneVisualHook.tone}</p>
            </div>
            {endingSummary ? (
              <div className="endingSummary">
                <span>{endingSummary.type}</span>
                <p>{endingSummary.summary}</p>
                {endingSummary.tag ? <code>{endingSummary.tag}</code> : null}
              </div>
            ) : null}

            <SceneBody
              key={currentNode.id}
              nodeId={currentNode.id}
              paragraphs={currentNode.bodyParagraphs}
              revealAll={sceneIsFullyRevealed}
            />

            {currentNode.kind === 'ending' ? (
              <div className="endingPanel">
                <section className="endingCasefile">
                  <div className="endingCasefileHeader">
                    <span>Case File Closed</span>
                    <strong>{endingSummary?.type}</strong>
                  </div>
                  <p className="endingCasefileLead">{endingSummary?.summary}</p>
                  {endingSummary?.tag ? <code>{endingSummary.tag}</code> : null}
                </section>

                <section className="endingRecapGrid">
                  <article className="endingRecapCard">
                    <h3>Route Summary</h3>
                    <div className="endingRouteList">
                      {endingPresentation?.dominantRoutes.length ? (
                        endingPresentation.dominantRoutes.map((flag) => (
                          <div className="endingRouteChip" key={flag.id}>
                            <strong>{flag.label}</strong>
                            <span>{flag.state}</span>
                          </div>
                        ))
                      ) : (
                        <p>No route pressure registered strongly in this run.</p>
                      )}
                    </div>
                  </article>

                  <article className="endingRecapCard">
                    <h3>Evidence Recovered</h3>
                    <div className="endingEvidenceList">
                      {endingPresentation?.unlockedEvidence.length ? (
                        endingPresentation.unlockedEvidence.map((item) => (
                          <div className="endingEvidenceRow" key={item.id}>
                            <strong>{item.title}</strong>
                            <p>{item.detail}</p>
                          </div>
                        ))
                      ) : (
                        <p>No evidence was logged in the dossier before the file closed.</p>
                      )}
                    </div>
                  </article>

                  <article className="endingRecapCard endingRecapCard--wide">
                    <h3>Long Memory</h3>
                    <p>
                      Across all runs, your dossier has recorded {mergedThreadMemory.routes.length} route families,
                      {` `}{mergedThreadMemory.threads.length} major threads, and {mergedThreadMemory.endings.length}
                      {` `}endings.
                    </p>
                    <small>Secret test tip: type <code>endtest</code> to jump through endings one by one.</small>
                  </article>
                </section>

                <div className="actionBar">
                  <button className="primaryButton" onClick={restart}>
                    Begin Again
                  </button>
                </div>
              </div>
            ) : currentNode.choices.length > 0 ? (
              <div className="choicesPanel">
                <h3>Choose Mara&apos;s next move</h3>
                <div className="choiceList">
                  {currentNode.choices.map((choice) => (
                    <ChoiceButton key={`${currentNode.id}-${choice.label}`} choice={choice} onSelect={selectChoice} />
                  ))}
                </div>
              </div>
            ) : currentNode.next ? (
              <div className="actionBar">
                {currentNode.effects.length > 0 ? (
                  <p className="autoEffect">
                    Scene effects:{' '}
                    {currentNode.effects
                      .map((effect) =>
                        effect.kind === 'delta'
                          ? `${effect.variable} ${effect.amount > 0 ? '+' : ''}${effect.amount}`
                          : `${effect.variable} = ${String(effect.value)}`,
                      )
                      .join(' / ')}
                  </p>
                ) : null}
                <button className="primaryButton" onClick={continueScene}>
                  Continue
                </button>
              </div>
            ) : null}
            </div>
          </div>
        </section>

        {isMobileDossierOpen ? (
          <button className="dossierBackdrop" onClick={() => setIsMobileDossierOpen(false)} aria-label="Close dossier" />
        ) : null}

        <aside
          className={
            isMobileLayout
              ? isMobileDossierOpen
                ? 'dossierPanel mobileVisible'
                : 'dossierPanel'
              : isMobileDossierOpen
                ? 'dossierPanel desktopVisible'
                : 'dossierPanel'
          }
        >
          {isMobileDossierOpen ? (
            <div className={isMobileLayout ? 'mobileDossierHeader' : 'dossierHeader'}>
              <div>
                <p>Dossier</p>
                <strong>Field Notes</strong>
              </div>
              <button className="secondaryButton small" onClick={() => setIsMobileDossierOpen(false)}>
                Close
              </button>
            </div>
          ) : null}
          <div className="tabs">
            {([
              ['story', 'Story'],
              ['evidence', 'Evidence'],
              ['characters', 'Characters'],
              ['achievements', 'Achievements'],
              ['threads', 'Threads Explored'],
              ['state', 'World State'],
            ] as Array<[TabId, string]>).map(([id, label]) => (
              <button
                className={activeTab === id || (id === 'state' && isWorldStateOpen) ? 'tabButton active' : 'tabButton'}
                key={id}
                onClick={() => {
                  if (id === 'state') {
                    setIsWorldStateOpen(false)
                  }
                  setActiveTab(id)
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {activeTab === 'story' ? (
            <div className="tabContent">
              <section className="panelBlock">
                <h3>Route Flags</h3>
                <div className="flagList">
                  {routeFlags.map((flag) => (
                    <article className={`flagCard ${flag.state.toLowerCase()}`} key={flag.id}>
                      <div>
                        <strong>{flag.label}</strong>
                        <span>{flag.state}</span>
                      </div>
                      <p>{flag.description}</p>
                      <small>Score {flag.score}</small>
                    </article>
                  ))}
                </div>
              </section>
              <section className="panelBlock">
                <h3>Choice Chronicle</h3>
                <div className="chronicle">
                  {gameState.choiceHistory.length === 0 ? (
                    <p>The opening decision has not been made yet.</p>
                  ) : (
                    gameState.choiceHistory.slice().reverse().map((entry, index) => (
                      <article className="chronicleEntry" key={`${entry.sceneId}-${index}`}>
                        <span>{entry.sceneId}</span>
                        <strong>{entry.label}</strong>
                        <p>{entry.text}</p>
                      </article>
                    ))
                  )}
                </div>
              </section>
            </div>
          ) : null}

          {activeTab === 'evidence' ? (
            <div className="tabContent">
              <section className="panelBlock">
                <h3>Evidence / Dossier</h3>
                <div className="evidenceList">
                  {evidenceItems.map((item) => (
                    <article className={item.unlocked ? 'evidenceCard unlocked' : 'evidenceCard'} key={item.id}>
                      <div>
                        <strong>{item.title}</strong>
                        <span>{item.unlocked ? 'Unlocked' : 'Locked'}</span>
                      </div>
                      <p>{item.unlocked ? item.detail : 'Keep moving through the routes to surface this thread.'}</p>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          ) : null}

          {activeTab === 'characters' ? (
            <div className="tabContent">
              <section className="panelBlock">
                <h3>Main Cast</h3>
                {revealedCharacters.length === 0 ? <p>No one has stepped into the file yet.</p> : null}
                <div className="characterList">
                  {revealedCharacters.map((character) => (
                    <CharacterCard character={character} key={character.id} />
                  ))}
                </div>
              </section>
            </div>
          ) : null}

          {activeTab === 'achievements' ? (
            <div className="tabContent">
              <section className="panelBlock">
                <h3>Achievements</h3>
                <div className="achievementList">
                  {achievements.map((achievement) => (
                    <article className={achievement.unlocked ? 'achievementCard unlocked' : 'achievementCard'} key={achievement.id}>
                      <div>
                        <strong>{achievement.title}</strong>
                        <span>{achievement.unlocked ? 'Unlocked' : 'Locked'}</span>
                      </div>
                      <p>{achievement.detail}</p>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          ) : null}

          {activeTab === 'threads' ? (
            <div className="tabContent">
              <section className="panelBlock">
                <h3>Threads Explored</h3>
                <p className="threadsIntro">A long-memory view of what your different runs have uncovered so far.</p>
                <div className="threadsSection">
                  <h4>Route Families</h4>
                  <div className="achievementList">
                    {threadsExplored.routeCards.map((card) => (
                      <article className={card.unlocked ? 'achievementCard unlocked' : 'achievementCard'} key={card.id}>
                        <div>
                          <strong>{card.title}</strong>
                          <span>{card.unlocked ? 'Discovered' : 'Undiscovered'}</span>
                        </div>
                        <p>{card.unlocked ? card.detail : 'Continue exploring different moral directions to surface this thread.'}</p>
                      </article>
                    ))}
                  </div>
                </div>
                <div className="threadsSection">
                  <h4>Major Threads</h4>
                  <div className="achievementList">
                    {threadsExplored.threadCards.map((card) => (
                      <article className={card.unlocked ? 'achievementCard unlocked' : 'achievementCard'} key={card.id}>
                        <div>
                          <strong>{card.title}</strong>
                          <span>{card.unlocked ? 'On Record' : 'Unknown'}</span>
                        </div>
                        <p>{card.unlocked ? card.detail : 'This thread has not yet entered your long-term dossier memory.'}</p>
                      </article>
                    ))}
                  </div>
                </div>
                <div className="threadsSection">
                  <h4>Endings Reached</h4>
                  <div className="achievementList">
                    {threadsExplored.endingCards.map((card) => (
                      <article className={card.unlocked ? 'achievementCard unlocked' : 'achievementCard'} key={card.id}>
                        <div>
                          <strong>{card.title}</strong>
                          <span>{card.unlocked ? 'Reached' : 'Not Yet Reached'}</span>
                        </div>
                        <p>{card.unlocked ? card.detail : 'An ending in this family has not yet been logged across your runs.'}</p>
                      </article>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          ) : null}

          {activeTab === 'state' ? (
            <div className="tabContent">
              <section className="panelBlock">
                <h3>World State</h3>
                <p className="threadsIntro">A field-style reading of how this run is evolving beneath the surface.</p>
                <div className="signalList">
                  {worldStateSignals.map((signal) => (
                    <article className="signalCard" key={signal.label}>
                      <div>
                        <span>{signal.label}</span>
                        <strong>{signal.value}</strong>
                      </div>
                      <p>{signal.detail}</p>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          ) : null}

          {activeTab === 'save' ? (
            <div className="tabContent">
              <section className="panelBlock">
                <h3>Save / Load</h3>
                <div className="saveList">
                  <button className="saveCard autosave" onClick={loadAutosave}>
                    <strong>Autosave</strong>
                    <span>{formatSavedAt(readSavedAt(AUTOSAVE_KEY))}</span>
                    <small>Loads the most recent automatic checkpoint.</small>
                  </button>
                  {Array.from({ length: SAVE_SLOT_COUNT }, (_, index) => {
                    const slot = index + 1
                    return (
                      <div className="saveSlotRow" key={slot}>
                        <button className="saveCard" onClick={() => loadFromSlot(slot)}>
                          <strong>Slot {slot}</strong>
                          <span>{formatSavedAt(slotTimestamps[slot])}</span>
                        </button>
                        <button className="secondaryButton small" onClick={() => saveToSlot(slot)}>
                          Save
                        </button>
                      </div>
                    )
                  })}
                </div>
              </section>
            </div>
          ) : null}
        </aside>
      </main>

      {isMobileLayout ? (
        <div className="mobileUtilityBar">
          <button
            className={isMobileDossierOpen ? 'secondaryButton activeControl' : 'secondaryButton'}
            onClick={() => setIsMobileDossierOpen(true)}
          >
            Dossier
          </button>
          <button className="secondaryButton" onClick={() => setRevealedSceneId(currentNode.id)}>
            Reveal
          </button>
          <button className="secondaryButton" onClick={restart}>
            Restart
          </button>
        </div>
      ) : null}

      {isWorldStateOpen ? (
        <div className="reportOverlay" onClick={closeWorldState} role="presentation">
          <section
            className="reportSheet"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="World State Report"
          >
            <div className="reportHeader">
              <div>
                <p className="reportKicker">Situation Report</p>
                <h2>Operational State</h2>
                <p className="reportIntro">A field-style reading of how this run is evolving beneath the surface.</p>
              </div>
              <button className="reportClose" onClick={closeWorldState}>
                Close
              </button>
            </div>

            <section className="reportBlock">
              <h3>Summary Signals</h3>
              <div className="signalList">
                {worldStateSignals.map((signal) => (
                  <article className="signalCard reportCard" key={signal.label}>
                    <div>
                      <span>{signal.label}</span>
                      <strong>{signal.value}</strong>
                    </div>
                    <p>{signal.detail}</p>
                  </article>
                ))}
              </div>
            </section>


            <section className="reportBlock">
              <h3>Save / Load</h3>
              <div className="saveList">
                <button className="saveCard autosave reportCard" onClick={loadAutosave}>
                  <strong>Autosave</strong>
                  <span>{formatSavedAt(readSavedAt(AUTOSAVE_KEY))}</span>
                  <small>Loads the most recent automatic checkpoint.</small>
                </button>
                {Array.from({ length: SAVE_SLOT_COUNT }, (_, index) => {
                  const slot = index + 1
                  return (
                    <div className="saveSlotRow reportCard" key={slot}>
                      <button className="saveCard reportInlineCard" onClick={() => loadFromSlot(slot)}>
                        <strong>Slot {slot}</strong>
                        <span>{formatSavedAt(slotTimestamps[slot])}</span>
                      </button>
                      <button className="secondaryButton small" onClick={() => saveToSlot(slot)}>
                        Save
                      </button>
                    </div>
                  )
                })}
              </div>
            </section>
          </section>
        </div>
      ) : null}
    </div>
  )
}

export default App










import { parse as parseYaml } from 'yaml'
import type {
  Choice,
  Ending,
  Scene,
  Story,
  StoryFrontmatter,
  StoryVariableValue,
} from '../types'

const parseEffects = (raw: string): Choice['effects'] => {
  const trimmed = raw.trim()
  if (!trimmed || trimmed.toLowerCase() === 'none') {
    return []
  }

  return trimmed.split(',').map((part) => {
    const value = part.trim().replace(/^`|`$/g, '')
    const assignmentMatch = value.match(/^([a-z0-9_]+)\s*=\s*(.+)$/i)
    if (assignmentMatch) {
      const [, variable, assigned] = assignmentMatch
      const cleaned = assigned.trim()

      if (cleaned === 'true' || cleaned === 'false') {
        return {
          kind: 'set' as const,
          variable,
          value: cleaned === 'true',
        }
      }

      if (/^-?\d+$/.test(cleaned)) {
        return {
          kind: 'set' as const,
          variable,
          value: Number(cleaned),
        }
      }

      return {
        kind: 'set' as const,
        variable,
        value: cleaned.replace(/^"(.*)"$/, '$1'),
      }
    }

    const deltaMatch = value.match(/^([a-z0-9_]+)\s*([+-]\d+)$/i)
    if (!deltaMatch) {
      throw new Error(`Unsupported effect syntax: ${value}`)
    }

    const [, variable, delta] = deltaMatch
    return {
      kind: 'delta' as const,
      variable,
      amount: Number(delta),
    }
  })
}

const splitParagraphs = (body: string) =>
  body
    .split(/\r?\n\r?\n/)
    .map((paragraph) => paragraph.replace(/\r?\n/g, ' ').trim())
    .filter(Boolean)

const parseChoiceBlock = (lines: string[], startIndex: number) => {
  const choices: Choice[] = []
  let index = startIndex + 1

  while (index < lines.length) {
    const line = lines[index].trim()
    if (!line) {
      index += 1
      continue
    }

    if (!line.startsWith('- **')) {
      break
    }

    const choiceMatch = line.match(/^- \*\*([A-Z])\.\s*(.+?)\*\*/)
    if (!choiceMatch) {
      break
    }

    const [, label, text] = choiceMatch
    const effectsLine = lines[index + 1]?.trim() ?? ''
    const nextLine = lines[index + 2]?.trim() ?? ''

    choices.push({
      label,
      text,
      effects: effectsLine.startsWith('Effects:')
        ? parseEffects(effectsLine.replace(/^Effects:\s*/, ''))
        : [],
      next: nextLine.replace(/^Next:\s*`([^`]+)`$/, '$1'),
    })

    index += 3
  }

  return { choices, nextIndex: index }
}

const parseBlock = (id: string, rawBlock: string): Scene | Ending => {
  const lines = rawBlock.trim().split(/\r?\n/)
  let index = 0
  let title = id
  let location = ''
  let mood = ''
  let cast: string[] = []
  let type = ''
  let summary = ''
  let next: string | undefined
  let endingTag: string | undefined
  let effects: Choice['effects'] = []
  const bodyLines: string[] = []
  let choices: Choice[] = []

  while (index < lines.length) {
    const line = lines[index].trim()

    if (line.startsWith('**Title:**')) {
      title = line.replace(/^\*\*Title:\*\*\s*/, '').trim()
    } else if (line.startsWith('**Location:**')) {
      location = line.replace(/^\*\*Location:\*\*\s*/, '').trim()
    } else if (line.startsWith('**Mood:**')) {
      mood = line.replace(/^\*\*Mood:\*\*\s*/, '').trim()
    } else if (line.startsWith('**Cast:**')) {
      cast = line
        .replace(/^\*\*Cast:\*\*\s*/, '')
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean)
    } else if (line.startsWith('**Type:**')) {
      type = line.replace(/^\*\*Type:\*\*\s*/, '').trim()
    } else if (line.startsWith('**Summary:**')) {
      summary = line.replace(/^\*\*Summary:\*\*\s*/, '').trim()
    } else if (line === '**Choices:**') {
      const parsedChoices = parseChoiceBlock(lines, index)
      choices = parsedChoices.choices
      index = parsedChoices.nextIndex - 1
    } else if (line.startsWith('**Effects:**')) {
      effects = parseEffects(line.replace(/^\*\*Effects:\*\*\s*/, '').trim())
    } else if (line.startsWith('**Next:**')) {
      const match = line.match(/^\*\*Next:\*\*\s*`([^`]+)`/)
      next = match?.[1]
    } else if (/^`ending_tag\s*=/.test(line)) {
      endingTag = line.replace(/^`ending_tag\s*=\s*"(.*)"`$/, '$1')
    } else {
      bodyLines.push(lines[index])
    }

    index += 1
  }

  const body = bodyLines.join('\n').trim()

  if (/^E\d+$/i.test(id)) {
    return {
      kind: 'ending',
      id,
      title,
      type,
      summary,
      location,
      mood,
      cast,
      body,
      bodyParagraphs: splitParagraphs(body),
      choices,
      effects,
      endingTag,
    }
  }

  return {
    kind: 'scene',
    id,
    title,
    location,
    mood,
    cast,
    body,
    bodyParagraphs: splitParagraphs(body),
    choices,
    effects,
    next,
  }
}

export const parseStorySource = (source: string): Story => {
  const frontmatterMatch = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!frontmatterMatch) {
    throw new Error('Story source is missing YAML frontmatter.')
  }

  const [, rawFrontmatter, body] = frontmatterMatch
  const frontmatter = parseYaml(rawFrontmatter) as StoryFrontmatter

  const initialVariables = Object.fromEntries(
    Object.entries(frontmatter.variables).map(([key, definition]) => [
      key,
      definition.default as StoryVariableValue,
    ]),
  ) as Record<string, StoryVariableValue>

  const nodes: Story['nodes'] = {}
  const order: string[] = []
  const headingPattern = /^## (?:SCENE\s+([A-Z]\d{3})|(E\d{2}))\r?$/gm
  const matches = [...body.matchAll(headingPattern)]

  for (let index = 0; index < matches.length; index += 1) {
    const match = matches[index]
    const id = match[1] ?? match[2]
    const blockStart = (match.index ?? 0) + match[0].length
    const blockEnd = index + 1 < matches.length ? (matches[index + 1].index ?? body.length) : body.length
    const block = body.slice(blockStart, blockEnd).trim()
    const parsed = parseBlock(id, block)
    nodes[id] = parsed
    order.push(id)
  }

  return {
    frontmatter,
    initialVariables,
    nodes,
    order,
  }
}

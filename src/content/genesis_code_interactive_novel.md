---
title: "The Lazarus Protocol"
format: "interactive novel"
version: "1.0"
intended_use: "Codex-readable source for adaptation into a visual interactive novel"
genre: ["biotech thriller", "conspiracy", "mystery", "science vs faith"]
content_note: "Original work inspired by broad themes of biotech conspiracy thrillers; not a retelling of any existing novel."
start_scene: "S001"
variables:
  trust_elias:
    type: integer
    default: 0
    min: -3
    max: 3
  trust_laila:
    type: integer
    default: 0
    min: -3
    max: 3
  exposure:
    type: integer
    default: 0
    min: 0
    max: 5
  faith:
    type: integer
    default: 0
    min: -3
    max: 3
  sample_status:
    type: string
    default: "intact"
    allowed: ["intact", "damaged", "lost", "split"]
  protocol_copy:
    type: boolean
    default: false
  father_truth:
    type: boolean
    default: false
  ending_tag:
    type: string
    default: ""
main_cast:
  - id: "C001"
    name: "Dr. Mara Vale"
    role: "Molecular geneticist"
    age: 34
    summary: "A gifted gene-editing researcher whose younger brother died waiting for a cure that never came. Brilliant, skeptical, controlled, and quietly furious at false hope."
  - id: "C002"
    name: "Father Elias Voss"
    role: "Jesuit archivist and former field medic"
    age: 47
    summary: "A priest with a scarred past, tactical competence, and access to sealed Church archives. He believes truth matters more than institutions, but he has lied for holy reasons before."
  - id: "C003"
    name: "Laila Arendt"
    role: "Investigative journalist"
    age: 31
    summary: "Relentless, sharp, and allergic to authority. She senses the story of a century behind a string of biotech deaths."
  - id: "C004"
    name: "Jonah Vale"
    role: "Mara's deceased brother"
    age: 19 at death
    summary: "Dead for years, but central to Mara's motives. His medical history becomes a key emotional and scientific reference point."
  - id: "C005"
    name: "Dr. Anton Saric"
    role: "CEO of Helix Ark"
    age: 56
    summary: "A celebrated biotech visionary hiding messianic ambition beneath clinical restraint."
  - id: "C006"
    name: "Sister Celene Orlov"
    role: "Keeper of a sealed archive"
    age: 63
    summary: "A nun-scholar who has spent her life guarding documents that could shatter both faith and science."
  - id: "C007"
    name: "Director Nolan Rhyse"
    role: "U.S. biosecurity official"
    age: 51
    summary: "Officially trying to prevent a global panic; unofficially willing to bury the truth to keep order."
world_notes:
  premise: "A preserved biological sample linked to an ancient line of healings appears to contain a programmable regenerative agent unlike any known virus. Multiple factions want to weaponize, suppress, monetize, or reveal it."
  themes:
    - "The difference between cure and control"
    - "Faith as conviction versus faith as institution"
    - "Whether humanity can survive proof that rewrites its moral story"
    - "How grief distorts the ethics of salvation"
  adaptation_notes_for_codex:
    - "Each scene includes mood, location, cast, and branch logic."
    - "Dialogue may be expanded visually with cinematic pauses and environmental storytelling."
    - "Internal thoughts can be rendered as voice-over, subtitle overlays, or journal text."
    - "Romance is optional subtext only; focus on suspense and moral tension."
---

# THE LAZARUS PROTOCOL

## Overview for adaptation
This source is intentionally structured so a coding model can turn it into a choice-driven visual novel with flags, route tracking, scene transitions, conditional dialogue, and multiple endings. Scene IDs are unique. Choices include variable effects and destination scenes. Text is fully prose-ready but modular.

## Tone guide
Dense, cinematic, emotionally intelligent, and suspenseful. Think rain on stone, sterile labs lit like chapels, archive dust, helicopter rotors, and the terrible intimacy of someone offering the world a miracle at gunpoint.

## Route map summary
- **Science Route**: prioritize evidence, containment, and reproducibility.
- **Revelation Route**: prioritize disclosure, public truth, and moral reckoning.
- **Faith Route**: pursue archive history, symbolism, and the spiritual consequences.
- **Control Route**: compromise with power to prevent chaos, risking corruption.

---

## SCENE S001
**Title:** The Dying Witness  
**Location:** Jerusalem, private hospital suite, pre-dawn thunderstorm  
**Mood:** Urgent, intimate, ominous  
**Cast:** Mara Vale, Professor Ilyan Navarre, black-clad intruders

The old professor's fingers were papery and cold, but the pressure of his grip was startlingly alive.

Mara Vale leaned closer to the bed because people always whispered when they were dying, as if the body knew the soul was already halfway out and didn't want to call attention to the theft.

Ilyan Navarre had once humiliated her at a symposium in Zurich. He had publicly called her generation of geneticists "children trying to hotwire Eden." He had also, three nights ago, sent a message with no greeting and no signature:

**COME TO JERUSALEM. I FOUND WHAT THEY BURIED.**

Now he was bleeding into white sheets with a patchwork of bruises on his chest and a pulse monitor stuttering in green.

"You were right," he whispered.

Mara frowned. "About what?"

"No disease is random forever. Once something learns us, it can be taught. Once it can be taught..." He coughed, red wetting his lips. "It can be commanded."

He pushed a cryogenic capsule into her hand, no larger than a lipstick tube. Frost clung to the inner wall. Something pale, almost luminescent, floated inside suspension fluid.

"What is this?"

His eyes fixed on hers with a fanatic clarity that made her skin tighten.

"Proof that the oldest miracle on earth was biological."

A sharp metallic bang sounded in the corridor.

Someone shouted in Hebrew. A woman screamed.

Navarre's gaze flicked toward the door. "They tracked the courier. Listen to me carefully. They will tell you this is a weapon. They will tell you it is blasphemy. They will tell you it is impossible."

The lights flickered.

"What is it really?" Mara asked.

He answered in a rasp that felt older than language.

"A protocol. A living instruction set. Not for killing. For restoration." His fingernails dug into her wrist. "But restoration without conscience becomes dominion."

The door burst inward.

Three men entered in matte tactical gear. No insignia. No hesitation.

The first fired once into Navarre's chest.

Mara didn't scream. Shock was too clean for screaming. She only moved, hurling herself sideways as glass burst from the monitor behind her.

"Take the sample intact," one of the men barked.

Intact.

Not seize. Not recover.

Intact.

The word told her more than any badge could have.

She slid across the floor, shoulder slamming into a fallen instrument cart. The cryogenic capsule almost flew from her hand. Somewhere in the hall, alarms finally began to rise, thin and useless.

A service corridor door stood ajar behind the room divider.

A pistol muzzle tracked toward her.

For half a second she saw everything with laboratory precision: angle, distance, wet tile, the intruder's weight shifting to his front foot. Then grief moved faster than thought. The same grief that had once kept her awake beside Jonah's hospital bed while the world casually failed him.

She flung a stainless tray at the gunman, smashed the emergency oxygen valve with her heel, and dove through the service door into darkness and steam.

Behind her, gunfire cracked.

Ahead, somewhere beneath the hospital, a red EXIT sign trembled in a burst pipe haze like a warning from hell.

Before she disappears into the corridor, Mara has one breath to decide what matters most.

**Choices:**
- **A. Protect the sample at all costs.**  
  Effects: `sample_status = "intact"`, `faith +1`  
  Next: `S002`
- **B. Grab Navarre's blood-stained notebook from the bedside table before running.**  
  Effects: `protocol_copy = true`, `exposure +1`  
  Next: `S003`
- **C. Try to photograph the intruders' faces and gear before escaping.**  
  Effects: `exposure +2`  
  Next: `S004`

---

## SCENE S002
**Title:** The Tunnel  
**Location:** Hospital service tunnels beneath Jerusalem  
**Mood:** Claustrophobic, breathless  
**Cast:** Mara

Mara ran bent low through heat and pipe-shadows, one fist clenched around the capsule so tightly her knuckles ached. She could hear pursuit above, muffled by concrete and distance, the rhythm of boots passing like fate choosing a stairwell.

The tunnel smelled of bleach, dust, hot copper, and old water. She hated how quickly her mind split into compartments under stress: one for route mapping, one for threat assessment, one for the scientific obscenity in her palm.

She dared a glance at the capsule under the red emergency lights.

Within the suspension floated a lattice of tissue unlike anything she had seen. Not organoid. Not stem-cell cluster. The structure seemed too ordered, too deliberate, as if it had grown according to a geometry rather than chance.

At the far end of the tunnel, a locked maintenance gate barred her path. Beside it glowed a keypad and an old emergency phone.

Her own phone vibrated.

Unknown number.

She stared for a beat, then answered.

A man's voice said, calm and unaccented, "Dr. Vale, if the sample leaves Jerusalem, people will die by the millions."

"Who is this?"

"Someone trying to give you a better choice than Professor Navarre got." A pause. "There is a priest waiting outside the Armenian Quarter gate. He knows where to take you. Do not trust him completely. Trust him enough."

The line went dead.

She stood in the tunnel with a dead professor's last secret in her hand and hated that the warning felt sincere.

A keypad. An emergency phone. A message about a priest.

She had exactly enough time for one move.

**Choices:**
- **A. Force the gate using the emergency release lever and head for the street.**  
  Effects: `exposure +1`  
  Next: `S005`
- **B. Use the emergency phone to call local police.**  
  Effects: `exposure +2`  
  Next: `S006`
- **C. Memorize the number that called and follow the warning about the priest.**  
  Effects: `faith +1`  
  Next: `S007`

---

## SCENE S003
**Title:** Paper and Blood  
**Location:** Hospital suite and service stairwell  
**Mood:** Sharp, dangerous, cerebral  
**Cast:** Mara, intruders

The notebook was half under the dead professor's hip, soaked at the corner but not ruined. Mara snatched it as bullets chewed plaster above her.

A page tore loose and fluttered against her arm.

Not equations.

Names.

Dates.

Monastery holdings. Clinical trial numbers. A line in Latin, hastily translated in the margin into English:

**The flesh remembers the first command.**

She fled through the service stairwell, the notebook under her shirt, pulse hammering against paper. On the third landing she risked opening to the center spread.

There, tucked into a folded pocket, was a microfilm strip and a hand-sketched diagram of a human chromosome with an impossible insertion sequence repeated like a hymn.

Then footsteps pounded from above.

The men had split up.

A maintenance cart sat abandoned one floor below. An elevator door opened and closed on the ground level in maddening silence. Somewhere outside, thunder rolled over the city.

Her choice now would decide whether the notebook became evidence, leverage, or a death sentence.

**Choices:**
- **A. Hide the notebook pages in separate locations on different floors.**  
  Effects: `protocol_copy = true`, `sample_status = "split"`  
  Next: `S008`
- **B. Keep everything together and escape fast.**  
  Effects: `protocol_copy = true`, `exposure +1`  
  Next: `S005`
- **C. Read one more page before moving.**  
  Effects: `father_truth = true`, `faith +1`  
  Next: `S009`

---

## SCENE S004
**Title:** Flash Evidence  
**Location:** Hospital suite to lower corridor  
**Mood:** Reckless, forensic, immediate  
**Cast:** Mara, intruders

Mara's phone was already in her hand before courage had time to fail.

She snapped three rapid shots from floor level: boots, gloves, a partial jawline beneath a balaclava, the weapon manufacturer's stamp, and on the wrist of the man nearest the door, a narrow tattoo in faded black: two interlocked circles around a vertical line.

One of the intruders saw the flash and fired.

The phone shattered against the wall, but not before auto-uploading the images to cloud backup—at least in theory. Depending on whether whoever had sent those men already owned half the world's infrastructure.

She made it into the lower corridor with a graze along her upper arm and blood hot under her sleeve.

At the corridor junction, signs pointed toward **Morgue**, **Loading Dock**, and **Chapel**.

The absurdity of the options struck her as she staggered beneath fluorescent lights.

Bodies. Escape. Prayer.

The arm wound throbbed. The capsule felt colder.

**Choices:**
- **A. Head to the loading dock and steal a vehicle.**  
  Effects: `exposure +1`  
  Next: `S005`
- **B. Go to the chapel, assuming no one expects a scientist to hide there.**  
  Effects: `faith +2`  
  Next: `S010`
- **C. Cut through the morgue to lose the pursuit.**  
  Effects: `exposure +2`, `sample_status = "damaged"`  
  Next: `S011`

---

## SCENE S005
**Title:** The Priest at the Gate  
**Location:** Armenian Quarter, rain-slick stone alley  
**Mood:** Tense alliance, noir  
**Cast:** Mara, Father Elias Voss

Rain polished Jerusalem into black glass.

Mara emerged from the service exit into an alley thick with runoff and diesel fumes. The city beyond the walls breathed under stormclouds, ancient and sleepless. She was halfway to the street before she saw him.

A tall man in a dark coat stood beneath a broken lamp beside an old scooter. Priest's collar. Medic's posture. A scar crossing one eyebrow like an unfinished sentence.

"Dr. Mara Vale," he said. "I'm Father Elias Voss. We need to leave now."

"You can get in line behind the gunmen."

"I didn't say trust me. I said we need to leave." His gaze dropped to her bleeding arm, then to the hand hiding the capsule in her coat. "If that's what Navarre gave you, every camera in this quarter may already be flagged."

"How do you know Navarre?"

A beat. Rain hissed in a nearby gutter.

"I helped him hide things."

"That is not reassuring."

"No," Elias said, opening a waterproof satchel. "It isn't."

He produced gauze, antiseptic, a compact jammer, and a rosary wound around his wrist beside a tourniquet strip. The combination irritated her instantly.

"You look disappointed," he said.

"I distrust men who are prepared for both confession and gunshot wounds."

"That's healthy. Get on the scooter."

A black SUV turned into the far end of the alley.

Its headlights found them.

Elias did not swear. That, more than anything, convinced Mara he was dangerous.

She had seconds to decide whether to bind herself to a priest, vanish alone, or force answers now.

**Choices:**
- **A. Go with Elias immediately.**  
  Effects: `trust_elias +1`  
  Next: `S012`
- **B. Demand the truth at gunpoint using the pistol from the scooter compartment.**  
  Effects: `trust_elias -1`, `faith -1`  
  Next: `S013`
- **C. Run alone into the market crowd.**  
  Effects: `exposure +2`  
  Next: `S014`

---

## SCENE S006
**Title:** Official Hands  
**Location:** Hospital security office  
**Mood:** Suspicious, procedural dread  
**Cast:** Mara, local police, Director Nolan Rhyse (voice)

The police arrived too fast.

That was the first thing wrong.

The second was that the man who took charge did not ask for her statement before asking what the professor had passed to her. The third was the call patched through to a U.S. biosecurity liaison before she had even been bandaged.

Director Nolan Rhyse's face appeared on a secure monitor, polished and authoritative. His voice was grave in the way government voices become when they want compliance to feel like patriotism.

"Dr. Vale, what you are carrying may relate to a prohibited regenerative platform developed outside treaty oversight. If it leaves containment, we could be facing a cascading biological event."

"Then why send assassins?"

A tiny pause. Too tiny for most people. Not for her.

"I didn't," Rhyse said.

He wanted her transferred to a U.S. facility. He wanted no press. He wanted trust.

Mara had spent enough years in grant review and federal oversight to recognize the smell of selective truth.

But official protection also meant resources, sequencing labs, secure transport, and perhaps the fastest route to an answer.

**Choices:**
- **A. Cooperate and board the secure transport.**  
  Effects: `exposure -1`  
  Next: `S015`
- **B. Pretend to cooperate, then flee during transfer.**  
  Effects: `exposure +1`  
  Next: `S016`
- **C. Leak a message to the press before agreeing to anything.**  
  Effects: `exposure +3`  
  Next: `S017`

---

## SCENE S007
**Title:** Enough Trust  
**Location:** Armenian Quarter perimeter  
**Mood:** Uneasy fate  
**Cast:** Mara, Father Elias

She followed the warning and found the priest exactly where the voice had said he would be, as if prophecy had learned to use burner phones.

Elias looked at her once, took in the blood, the tremor, the too-careful hand around the hidden capsule, and said only, "You're late."

Something in the understatement nearly made her laugh.

Then a shot cracked from a rooftop and blew stone from the arch beside them.

Elias shoved her hard behind the scooter, drew a compact pistol from under his coat, and returned fire with the economy of someone who had once believed violence could be compartmentalized from the soul.

"Priests aren't supposed to do that," Mara said.

"Neither are geneticists," he replied, "but tonight seems ambitious."

They escaped into the rain.

As the scooter screamed through alley turns, Mara pressed herself against a stranger who smelled of rain, incense, and cordite, and thought with sudden clarity: I am already inside the story. There is no outside anymore.

Next stop: a safe house with locked archives and worse answers.

**Next:** `S012`

---

## SCENE S008
**Title:** Distributed Salvation  
**Location:** Stairwell landings, hidden caches  
**Mood:** Strategic, paranoid  
**Cast:** Mara

Mara tore the notebook apart with shaking hands and hid its pieces where only a desperate or brilliant person would look: inside a fire extinguisher cabinet, beneath a vending machine access panel, behind the broken face of a saint in a neglected alcove.

The microfilm she kept.

The act felt obscene and practical at once. Like dismembering scripture to save it from a fire.

By the time she hit the street, the storm had thickened and so had the number of people likely hunting her.

Whoever found her would not find all of it.

Neither would she.

The story had just become a scavenger hunt for the architecture of resurrection.

**Next:** `S005`

---

## SCENE S009
**Title:** A Line in the Margin  
**Location:** Stairwell landing  
**Mood:** Revelatory, intimate dread  
**Cast:** Mara

The page she chose looked almost blank until she held it against the stairwell light.

A second text emerged beneath the first, written in old iron gall ink and later annotated by Navarre:

**Not divine intervention. Transmission. Not singular miracle. Inheritance.**

Below that, a newer note in Navarre's hurried hand:

**Your father knew. Ask who paid for Jonah's final treatment.**

The page shook in her hands.

Her father had been a schoolteacher with debts, a bad back, and a face that closed whenever hospitals were mentioned. He had died before Jonah.

You had one job, grief said. To remember your dead correctly.

Now even that felt unstable.

Mara folded the page into her sleeve and kept moving with the nauseating sense that the conspiracy was no longer abstract. It had entered her family long before she ever entered the hospital room.

**Next:** `S005`

---

## SCENE S010
**Title:** The Chapel  
**Location:** Hospital chapel  
**Mood:** Quiet, uncanny, sacred pressure  
**Cast:** Mara, Sister Celene Orlov

The chapel was almost dark except for red sanctuary glass and the blue-white flicker of emergency backup lights. Mara expected emptiness. Instead she found an old woman in a gray habit kneeling perfectly still in the front pew.

Without turning, the woman said, "He gave it to you, then."

Mara stopped cold. "Who are you?"

The woman rose with care but no fear. Her face was lined into intelligence. "A custodian. We use many titles when we are afraid of the one that fits."

"You knew Navarre?"

"I corrected his Latin. He ignored my warnings." She finally turned. Her eyes dropped at once to the hidden shape inside Mara's coat. "Child, do you know what men do when they believe death can be negotiated?"

Mara almost said *fundraise,* because bitterness was easier than terror.

Instead she asked, "What is it?"

The nun answered in a voice that made the small chapel feel suddenly ancient.

"A grammar for flesh. Buried because every empire that touched it became convinced it had the right to decide who should rise and who should remain in dust."

Sirens neared outside.

"Come with me," Sister Celene said. "Or go with the priest when he arrives. But do not go with the state. The state always says it fears panic when it really fears competition."

**Choices:**
- **A. Go with Sister Celene to the sealed archive.**  
  Effects: `faith +2`  
  Next: `S018`
- **B. Wait for the priest she mentioned.**  
  Effects: `trust_elias +1`  
  Next: `S005`
- **C. Ask Celene for one concrete scientific fact before trusting her.**  
  Effects: `faith +1`, `protocol_copy = true`  
  Next: `S019`

---

## SCENE S011
**Title:** Cold Rooms  
**Location:** Hospital morgue  
**Mood:** Morbid, disorienting  
**Cast:** Mara

The morgue was colder than the capsule. Drawers whispered on rails in the dark as if the room itself were breathing through metal teeth.

Mara cut through aisles of tagged stillness, trying not to read names. Her shoulder struck a tray. The capsule slipped from her grasp, bounced once against the tile, and rolled beneath a gurney.

For one catastrophic instant she believed she had lost everything.

She dropped to her knees, scraping skin on the floor, and snatched it back. A hairline crack had appeared in the outer casing.

The internal chamber still held, but the thermal seal was compromised.

Time, from this moment on, would be an enemy with a stopwatch.

At the far exit, the priest from the alley waited in silhouette, pistol low, expression unreadable.

"That look," he said when he saw the crack, "means tonight just got shorter."

**Effects:** `sample_status = "damaged"`, `trust_elias +1`  
**Next:** `S012`

---

## SCENE S012
**Title:** Safe House of Ash and Dust  
**Location:** Hidden archive apartment above a shuttered print shop  
**Mood:** Temporary refuge, layered secrets  
**Cast:** Mara, Elias

The safe house was not what she expected. Not a bunker. Not a rectory. A cramped apartment above a dead print shop, lined with old maps, medical kits, and locked archival cases. The kitchen smelled faintly of cardamom and solvent. Rain clicked against shutters.

Elias cleaned the graze on her arm while she watched him like she was trying to decide whether to trust a wolf for knowing first aid.

"Start talking," she said.

He taped the bandage. "There are records held in fragments by monasteries, private biotech foundations, certain intelligence services, and one Vatican office that officially does not exist. They all point to the same recurring anomaly: episodes of impossible recovery clustered around a hereditary biological agent."

"You mean miracles."

"I mean incidents later edited into miracles by people with better stories than lab protocols."

Mara set the capsule on the table under a lamp. They both stared at it.

"Can you sequence it?" Elias asked.

"Eventually. Not here. Not safely." She glanced at him. "Why help me?"

He was silent long enough to become suspicious.

Then: "Because twenty years ago I carried a child out of a village in Bosnia after shelling. Half his torso was open. I laid him in a chapel because there was nowhere else. He lived. No surgery. No explanation. A woman took a blood sample from the cloth and vanished before dawn. Navarre later showed me a report that matched what I'd seen." He met her gaze. "I joined the archivist network the day I realized faith was being used as camouflage for procurement."

The sentence landed like iron.

On the table sat three immediate paths: decode the sample, chase the history, or contact the outside world before the hunt closed in.

**Choices:**
- **A. Use Elias's equipment to begin a rough analysis immediately.**  
  Effects: `trust_elias +1`  
  Next: `S020`
- **B. Demand access to the sealed historical files first.**  
  Effects: `faith +1`  
  Next: `S021`
- **C. Contact a journalist Mara once publicly mocked on a panel: Laila Arendt.**  
  Effects: `trust_laila +1`, `exposure +1`  
  Next: `S022`

---

## SCENE S013
**Title:** Confession by Gunlight  
**Location:** Alley beside scooter  
**Mood:** Volatile, intimate  
**Cast:** Mara, Elias

Mara drew the pistol from the scooter's side compartment and pointed it at Elias's chest before she had fully decided to.

Rain ran off the barrel.

He did not reach for his own weapon.

"Tell me why a priest is waiting for me in an alley after a murder," she said.

"Because a professor I failed once asked me not to fail him again."

"Too poetic. Try again."

Lightning showed no fear in him, only exhaustion. "Three factions are active. A corporate group that wants commercialization, a state coalition that wants control, and a religious archive split between burial and revelation. Navarre trusted me because I no longer trust any of them." He looked straight down the barrel. "That includes my own side."

The SUV headlights swept nearer.

"Get on the scooter," he said. "Or shoot me and learn what happens when the next people arrive first."

The rain drummed between them like a countdown.

**Choices:**
- **A. Believe him enough to go.**  
  Effects: `trust_elias +0`  
  Next: `S012`
- **B. Force him to hand over his phone and satchel before leaving together.**  
  Effects: `trust_elias -1`, `protocol_copy = true`  
  Next: `S012`
- **C. Take the scooter and leave him.**  
  Effects: `trust_elias -2`, `exposure +2`  
  Next: `S014`

---

## SCENE S014
**Title:** Alone in the Market  
**Location:** Night market and rooftops  
**Mood:** Pursuit, improvisation  
**Cast:** Mara, hunters, optional Elias shadow

Alone, Mara lasted nineteen minutes before the city began closing around her.

Cameras found her first. Then men pretending not to be connected by the way they all paused at the same corners. She moved through a half-shuttered market under tarps silvered with rain, buying seconds with chaos and crowds.

Her phone buzzed with a message from an encrypted unknown sender:

**YOU ARE MOVING EAST. BAD CHOICE. ROOF ACCESS ABOVE SPICE STALL.**

Elias, maybe. Or another handler.

Above the market, rooftops offered escape and exposure in equal measure. Below, a delivery van idled with too many men watching too little.

**Choices:**
- **A. Take the roof access and trust the warning.**  
  Effects: `trust_elias +1`  
  Next: `S012`
- **B. Hijack the delivery van.**  
  Effects: `exposure +2`  
  Next: `S023`
- **C. Dump the sample in a spice crate and circle back later.**  
  Effects: `sample_status = "lost"`, `exposure -1`  
  Next: `S024`

---

## SCENE S015
**Title:** Containment  
**Location:** U.S. secure transport and biofacility  
**Mood:** Ordered menace  
**Cast:** Mara, Rhyse, technicians

The facility outside Tel Aviv was all filtered air and calm voices. Men in blue nitrile gloves treated the capsule like a warhead and a relic. Director Nolan Rhyse arrived in person twelve hours later, tie immaculate, apology prepackaged.

"I understand why this feels adversarial," he said. "But whatever you think this is, the wrong release could trigger cult violence, market collapse, black-site weaponization, or a bioarms race."

"Or a cure," Mara said.

"Every weapon is a cure in the hands of the person using it on the right target."

That line told her everything.

In the facility she gains access to extraordinary sequencing equipment, but every door requires a badge she does not have and every result is filtered through security review.

**Choices:**
- **A. Work with the lab and gather data quietly.**  
  Effects: `exposure -1`  
  Next: `S025`
- **B. Search internal systems for what Rhyse is hiding.**  
  Effects: `protocol_copy = true`, `exposure +1`  
  Next: `S026`
- **C. Contact Laila Arendt from a smuggled terminal.**  
  Effects: `trust_laila +1`, `exposure +2`  
  Next: `S022`

---

## SCENE S016
**Title:** Transfer Breach  
**Location:** Military convoy and roadside wadi  
**Mood:** Kinetic, survivalist  
**Cast:** Mara, convoy team, Elias (possible)

Mara pretended cooperation until the convoy hit a narrow stretch of road between rock and flood wash. Then she triggered the ambulance oxygen alarm, smashed a med case into the escort's face, and bailed through the rear doors into muddy darkness.

The capsule nearly flew from her hands. Searchlights cut through rain. Someone shouted to keep her alive.

Alive. Again the choice of words.

She slid into a wadi channel and saw two figures descending from the ridge: one government retrieval team, one lone silhouette with a flashlight shuttered low.

"Dr. Vale," the lone figure whispered. Elias. "Pick quickly."

**Choices:**
- **A. Go with Elias.**  
  Effects: `trust_elias +1`  
  Next: `S012`
- **B. Surrender and negotiate directly with Rhyse.**  
  Effects: `exposure +0`  
  Next: `S015`
- **C. Run deeper into the wadi alone.**  
  Effects: `exposure +2`, `sample_status = "damaged"`  
  Next: `S023`

---

## SCENE S017
**Title:** The Leak  
**Location:** Hospital terminal / global media cascade  
**Mood:** Irreversible, electrified  
**Cast:** Mara, Laila (remote), internet as character

The first headline was wrong in six ways.

The seventh way was that it wasn't nearly wrong enough.

Within eighteen minutes of Mara's encrypted message reaching Laila Arendt, the world had a blurry image of the capsule, a dead professor's name, a leaked line about "ancient regenerative technology," and commentators dividing into the usual tribes of ridicule, worship, profit, and fear.

Stock markets twitched. Religious influencers improvised certainty. Government spokespeople declared misinformation while quietly tasking analysts to verify the photographs.

Laila's voice came through an encrypted call, fierce and delighted in the worst possible way.

"Congratulations," she said. "You set the planet on fire. Where are you?"

Mara looked down at the capsule in her hand and knew there was no going back to secrecy.

**Effects:** `trust_laila +2`, `exposure +3`  
**Next:** `S022`

---

## SCENE S018
**Title:** The Sealed Archive  
**Location:** Subterranean monastic vault  
**Mood:** Reverent, secretive, destabilizing  
**Cast:** Mara, Sister Celene

The vault beneath the monastery held temperature-controlled drawers older than some nations. Manuscripts shared space with preserved slides, blood letters, pathology sketches, and metal cases sealed with wax and modern biohazard tape. It was the sort of room that destroyed the border between relic and specimen.

Sister Celene unlocked one drawer and laid out a sequence of documents spanning centuries. Accounts of plague survivors. Anatomical notes from Renaissance physicians. A Cold War memo describing "self-corrective cellular reversal events" in a classified detainee. Each case linked, in the margin annotations of hidden custodians, to a bloodline fragment called **the inheritance**.

"A line carrying a dormant repair architecture," Celene said. "Not active in all descendants. Not stable. Not safe. But real."

"Then why bury it?"

"Because every ruler asks the same question when they hear of it. Not *how do we heal?* but *how do we choose?*"

There is also a file under Mara's family name.

**Choices:**
- **A. Open the family file first.**  
  Effects: `father_truth = true`  
  Next: `S027`
- **B. Study the scientific pathology materials.**  
  Effects: `protocol_copy = true`  
  Next: `S028`
- **C. Ask Celene who else has access to this vault.**  
  Effects: `faith +1`  
  Next: `S029`

---

## SCENE S019
**Title:** One Fact  
**Location:** Hospital chapel sacristy  
**Mood:** Narrow bridge between worlds  
**Cast:** Mara, Sister Celene

Mara folded her arms. "Give me one thing a scientist can test. Not a parable. Not a warning. A fact."

Celene nodded once, as if the demand were a prayer offered in the correct language.

"The agent binds to damaged cells by reading membrane distress signatures, then deploys repair instructions selectively. It does not attack healthy tissue. Under the microscope, it behaves less like a virus than a courier with editing authority. But it escalates catastrophically in hosts with certain inflammatory markers. If you sequence it, look for modular redundancies around the repair clusters. They are the fingerprint."

Mara went still.

That was not mysticism. That was someone who had either studied the thing or memorized the briefing notes of people who had.

Celene handed her a card with an address and a line written on the back:

**Ask the priest about Sarajevo. If he lies, leave him.**

**Effects:** `protocol_copy = true`  
**Next:** `S005`

---

## SCENE S020
**Title:** The First Analysis  
**Location:** Safe house improvised lab  
**Mood:** Clinical awe, mounting danger  
**Cast:** Mara, Elias

The equipment was crude by her standards but not useless: portable sequencer, centrifuge, cold blocks, a field microscope, two laptops running customized analysis pipelines. Not priestly, exactly.

"Who financed this?" she asked.

"People who would hate hearing the answer alongside their names," Elias said.

She extracted a microscopic fraction from the capsule and began.

For an hour there was only work: gloved hands, calibrations, the muttering liturgy of protocol. Then the first output populated.

Mara stared.

The agent's code was neither purely viral nor cellular. It carried a nested architecture designed to remain dormant until exposed to acute tissue damage, after which it unfolded like a compressed library. Sections of it appeared to reference host DNA, compare damage states, and initiate local repairs using templates that should have required an impossible amount of information density.

"This can't fit," she whispered.

"Meaning?"

"Meaning either my model is wrong or this thing encodes instructions in a way we are barely measuring. It's like finding a cathedral folded inside a paper crane."

Then another result resolved.

A partial host match.

Human lineage markers.

Related to a sample archived under the surname **Vale**.

The room went very quiet.

**Choices:**
- **A. Tell Elias everything on the screen.**  
  Effects: `trust_elias +1`, `father_truth = true`  
  Next: `S030`
- **B. Hide the family match and keep analyzing.**  
  Effects: `trust_elias -1`  
  Next: `S031`
- **C. Stop the analysis and destroy the local data.**  
  Effects: `protocol_copy = false`, `faith +1`  
  Next: `S032`

---

## SCENE S021
**Title:** Histories of the Impossible  
**Location:** Safe house archive cases  
**Mood:** Cerebral, destabilizing  
**Cast:** Mara, Elias

The historical files were cross-indexed with obsessive care. Elias unlocked one case after another until the table filled with centuries of weaponized testimony.

There were court records from medieval Sicily describing a child surviving a spear through the abdomen. A colonial surgeon's diary from Peru about a woman whose gangrenous leg restored healthy tissue overnight and then killed three men who tried to confine her. A classified twentieth-century memo about a prisoner whose radiation burns reversed while nearby mice developed lethal overgrowths.

"So it heals," Mara said.

"Sometimes," Elias said. "Sometimes it over-corrects. Sometimes it proliferates. Sometimes it appears to choose. That's the part everyone turns into theology because the alternative is admitting biology may carry selection logic we don't yet deserve."

In the final case lay a photograph of a hospital bill paid anonymously for Jonah Vale's last experimental treatment.

The payer line had been redacted.

But the watermark beneath the black bar belonged to **Helix Ark**.

Mara's breath caught.

Anton Saric's company.

The man who had built a public empire on curing rare disease.

**Choices:**
- **A. Hunt Saric and Helix Ark.**  
  Effects: `exposure +1`  
  Next: `S033`
- **B. Ask Elias why he didn't show you this sooner.**  
  Effects: `trust_elias -1`  
  Next: `S034`
- **C. Call Laila and turn Helix Ark into a target.**  
  Effects: `trust_laila +1`, `exposure +2`  
  Next: `S022`

---

## SCENE S022
**Title:** Laila Arendt Answers  
**Location:** Encrypted call / later safehouse meeting in Athens  
**Mood:** Razor-sharp alliance  
**Cast:** Mara, Laila

Laila Arendt answered on the third ring with the briskness of someone who had already guessed the world was changing and resented having to be right in public.

"I have two rules," she said. "Don't lie to me, and don't make me the last one in the room to understand the danger."

When they finally met in person two days later in Athens, Laila arrived with a backpack, camera lenses, a disposable phone, and the kind of gaze that made weak men edit themselves mid-sentence.

She listened as Mara explained the sample, Navarre, Elias, Helix Ark, and the broad shape of the conspiracy.

Then she said, "This isn't just a biotech scandal. It's a new origin story with armed shareholders."

Mara disliked how accurate that was.

Laila can help expose the truth, but every step with her increases visibility and risk.

**Choices:**
- **A. Share everything, including the family connection.**  
  Effects: `trust_laila +2`, `exposure +1`, `father_truth = true`  
  Next: `S035`
- **B. Share the conspiracy but hide your family involvement.**  
  Effects: `trust_laila +1`  
  Next: `S036`
- **C. Ask Laila to investigate Helix Ark while you pursue the archive route.**  
  Effects: `trust_laila +1`  
  Next: `S033`

---

## SCENE S023
**Title:** The Hard Escape  
**Location:** Roadside, industrial port, dawn  
**Mood:** Desperate momentum  
**Cast:** Mara, pursuers

By dawn Mara had stolen two vehicles, lost one, and reached an industrial port with salt in the air and helicopters beginning to circle inland. She was exhausted enough to make bad decisions with conviction.

Cargo ships. Ferry terminal. Customs checkpoint. Too many exits, not enough certainty.

A refrigerated medical freight container was being loaded under Helix Ark security logos.

That narrowed the world.

**Choices:**
- **A. Break into the Helix Ark container.**  
  Effects: `exposure +1`, `protocol_copy = true`  
  Next: `S033`
- **B. Stow away on a ferry and regroup abroad.**  
  Effects: `exposure -1`  
  Next: `S022`
- **C. Call Elias and admit you need help.**  
  Effects: `trust_elias +1`  
  Next: `S012`

---

## SCENE S024
**Title:** Empty Hands  
**Location:** Market backroom  
**Mood:** Regret, reversal  
**Cast:** Mara, unknown child, Elias/Laila optional later

When Mara returned for the spice crate, the capsule was gone.

In its place sat a note in block print:

**YOU CHOSE SURVIVAL OVER CUSTODY. UNDERSTANDABLE. NOW CHOOSE PURPOSE.**

A child from the stall pointed toward the old quarter and said a priest had left the message. Or perhaps a journalist. The child didn't know the difference.

Mara had lost the sample, but not the story. Not the notebook fragments. Not the family thread.

This route becomes a hunt for recovery and revelation rather than direct containment.

**Choices:**
- **A. Hunt Elias.**  
  Effects: `trust_elias +0`  
  Next: `S012`
- **B. Hunt Laila and go public.**  
  Effects: `trust_laila +1`, `exposure +2`  
  Next: `S022`

---

## SCENE S025
**Title:** What It Does  
**Location:** Secure facility sequencing lab  
**Mood:** Controlled awe  
**Cast:** Mara, technicians, Rhyse (optional)

With full instrumentation, the agent finally revealed enough of itself to terrify her properly.

It did not merely stimulate regeneration. It evaluated damage, modeled tissue architecture, and triggered an adaptive reconstruction cascade tailored to the host. Like a physician written in wet code. In limited tissues, it could restore catastrophic injury with near-impossible precision.

But under stress conditions it also showed an expansion profile that could produce runaway growth, adaptive resistance, and in inflammatory hosts, systemic takeover.

The miracle and the plague were not separate possibilities.

They were the same possibility, differently handled.

Mara printed the findings and thought: this is what humanity always does. It meets a threshold and calls it salvation before asking what price the mechanism demands.

Rhyse now wants her recommendation.

**Choices:**
- **A. Recommend permanent suppression.**  
  Effects: `faith -1`  
  Next: `S037`
- **B. Recommend tightly controlled research.**  
  Effects: `protocol_copy = true`  
  Next: `S038`
- **C. Secretly duplicate the data before making any recommendation.**  
  Effects: `protocol_copy = true`, `exposure +1`  
  Next: `S026`

---

## SCENE S026
**Title:** The Buried Program  
**Location:** Facility intranet / hidden archive server  
**Mood:** Conspiracy confirmed  
**Cast:** Mara

The hidden files were not labeled by project name but by accounting layers, which was almost funny.

Mara found contracts between government intermediaries and Helix Ark, off-book tissue acquisitions, sealed mortality studies, and a document titled **Lazarus Contingency**.

Inside it: proposals for limited elite deployment under national emergency doctrine, models for social destabilization after public disclosure, and a chilling section on *narrative management of theological fallout*.

Rhyse had not merely feared chaos. He had planned for selective resurrection as a state capability.

And Helix Ark had been running familial screening programs for decades.

Including one under her father's district.

**Choices:**
- **A. Expose the Lazarus Contingency publicly.**  
  Effects: `exposure +3`  
  Next: `S039`
- **B. Send the files only to Laila.**  
  Effects: `trust_laila +2`, `exposure +1`  
  Next: `S035`
- **C. Confront Rhyse privately.**  
  Effects: `exposure +0`  
  Next: `S040`

---

## SCENE S027
**Title:** The Family File  
**Location:** Monastic vault  
**Mood:** Heartbreak, betrayal  
**Cast:** Mara, Sister Celene

The file beneath her family name was thin. That made it worse.

Screening notes. A payment authorization. A church intermediary memo. Her father had consented to a blood study after Jonah's diagnosis worsened. He had been told there was a vanishingly small chance their line carried a dormant reparative marker worth studying for future therapy development.

He was also told that if the marker appeared active, disclosure could place the family at risk.

He signed.

He never told her.

The final page was a handwritten note from him, not intended for her eyes but preserved anyway:

**If there is the slightest chance this spares another boy what my son is facing, I will bear her anger if she lives long enough to give it.**

Mara sat very still with the page in her hands and felt grief rearrange itself into a different species of wound.

He had not sold them.

He had chosen the future over honesty and died before he could explain.

**Next:** `S028`

---

## SCENE S028
**Title:** The Scientific Heresy  
**Location:** Monastic vault worktable  
**Mood:** Revelatory, dangerous clarity  
**Cast:** Mara, Celene

The pathology materials showed the same impossible signature across centuries: rapid tissue fidelity restoration in a narrow subset of hosts, followed by either dormancy or catastrophic proliferation depending on immune state and stress context.

Embedded among the slides was a modern lab summary from Helix Ark's early research days. They had managed to synthesize partial mimics of the agent's repair functions, but not its restraint. Every artificial version healed wildly, inaccurately, monstrously.

The natural protocol was not just powerful. It was governed.

As if it had evolved with moral consequences no lab had yet learned to encode.

Mara hated the anthropomorphic phrasing the moment it occurred to her. She hated more that nothing else fit as well.

There is a location attached to the most recent successful host event: a Helix Ark black facility on an Aegean island.

**Next:** `S033`

---

## SCENE S029
**Title:** Who Else Knows  
**Location:** Monastic vault corridor  
**Mood:** Distrust widening  
**Cast:** Mara, Celene

"Who else has access?" Mara asked.

Celene took too long to answer.

"Anton Saric," she said at last. "Through a predecessor agreement from thirty years ago. He was meant to fund preservation. He funded extraction instead."

"And you let that happen?"

The older woman's face tightened. "We told ourselves we were choosing the least dangerous patron. Every age names its cowardice stewardship."

Saric knew the vault existed. Possibly knew her name. Possibly knew Jonah's.

The circle had just become a trap.

**Next:** `S033`

---

## SCENE S030
**Title:** Bloodline Disclosure  
**Location:** Safe house lab  
**Mood:** Vulnerable alliance  
**Cast:** Mara, Elias

When Mara showed Elias the lineage match, he did not react with triumph. He reacted with pity, which she liked even less.

"Don't," she said.

"I wasn't going to say chosen," he replied. "That word ruins everything it touches."

"Then say what it means."

"It means your family was on someone's list long before you were born. It means Jonah may have been observed, not just mourned. It means if the protocol interfaces with lineage, Saric will see you not as a witness but as a key."

Mara stared at the screen until the letters blurred.

"I spent my life wanting one miracle for the right person," she said. "Now I find out we may have been bred, tracked, and priced for one."

Elias laid a sealed archive photo beside the sequencer.

It showed Anton Saric thirty years younger, standing beside Mara's father outside a rural clinic.

**Next:** `S033`

---

## SCENE S031
**Title:** Secret Within Secret  
**Location:** Safe house lab  
**Mood:** Isolation, acceleration  
**Cast:** Mara

Mara hid the family match because naming it would make it real.

Instead she pushed deeper into the analysis and found a second shock: the sample contained not only active repair sequences but a dormant authorization layer responsive to specific epigenetic markers.

Not everyone could trigger the full effect.

Access, in some sense, was inherited.

By the time Elias noticed her silence had turned unnatural, she had already copied the most damning files to an encrypted drive and decided she could no longer fully trust anyone who had approached her through prophecy, archives, or government channels.

Some stories narrow your allies. This one dissolved them.

**Next:** `S033`

---

## SCENE S032
**Title:** Refusal  
**Location:** Safe house stove and sink  
**Mood:** Moral defiance  
**Cast:** Mara, Elias

Mara erased the local data, stripped the sample chamber, and destroyed the temporary extraction medium in the sink while Elias shouted her name from across the room.

"You don't get to outrun history by deleting a copy of it," he said.

"Watch me," she said, though she knew he was right.

Still, the act mattered. Not because it solved the problem, but because it reminded her the protocol was not entitled to her obedience simply because it existed.

She would continue the fight by moving against the people, not the code.

**Effects:** `protocol_copy = false`  
**Next:** `S033`

---

## SCENE S033
**Title:** Helix Ark  
**Location:** Aegean island research compound  
**Mood:** Sleek horror, storm-before-speech  
**Cast:** Mara, Elias and/or Laila depending on route, Anton Saric

Helix Ark's island facility rose from the sea like a private answer to mortality: white terraces, glass bridges, olive groves, and below them secured laboratories buried in the rock. Wealth had made it beautiful so conscience wouldn't notice what was underneath.

Mara entered under one of several pretenses depending on her route—journalistic infiltration, stolen credentials, archive leverage, or controlled invitation.

Anton Saric received her in a top-floor observatory with sunset bleeding across the Aegean.

He was handsome in the carefully exhausted way of powerful men who want their ambition mistaken for burden.

"Dr. Vale," he said, as if they were old colleagues. "You have my condolences for the professor's death and for the crude men others sent to solve a delicate problem."

"You paid for my brother's treatment."

"I paid for thousands."

"Don't make this philanthropic."

Saric smiled faintly. "Everything becomes philanthropic when the numbers get large enough."

He did not deny knowing her father. Did not deny the lineage program. Did not deny decades of research.

What he denied was villainy.

"Imagine a world," he said, "where spinal injuries are temporary, battlefield trauma reversible, pediatric cancers interruptible, organ failure optional. And you want to bury that because weak men and bad governments exist? They always will. Progress is not waiting for saints."

It was the most seductive argument in the room because parts of it were true.

Then he added the part that made her blood cool.

"The protocol needs a compatible host interface for full activation. Your family line is among the rare viable keys. Which means, Dr. Vale, whether you like it or not, history has selected you."

**Choices:**
- **A. Pretend to consider his offer and get closer to the core lab.**  
  Effects: `exposure +1`  
  Next: `S041`
- **B. Reject him and demand to see the human trial subjects.**  
  Effects: `faith +1`  
  Next: `S042`
- **C. Secretly record the conversation for exposure.**  
  Effects: `trust_laila +1`, `exposure +2`  
  Next: `S043`

---

## SCENE S034
**Title:** Why Didn't You Tell Me  
**Location:** Safe house  
**Mood:** Hurt, brittle trust  
**Cast:** Mara, Elias

"You knew about Jonah," Mara said.

Elias did not insult her by pretending otherwise.

"I knew there was a payment trail. I didn't know how deep it went until tonight."

"That's not an answer."

"It's the only clean one I have. I delayed because once I showed you that file, every decision you made would be personal. Personal decisions burn evidence."

The honesty made her want to throw something.

"He was my brother. It was already personal."

Elias bowed his head once, accepting the strike without defense. "Yes. And that's why I should have trusted your discipline sooner."

She hated that apology for sounding real.

**Next:** `S033`

---

## SCENE S035
**Title:** Public Truth Route  
**Location:** Athens newsroom bunker / global release prep  
**Mood:** Wired, defiant  
**Cast:** Mara, Laila

Laila turned an abandoned print warehouse into a war room of laptops, legal pads, satellite uplinks, and coffee gone cold before it could become bitter. She built timelines faster than most people built opinions.

Together they assembled the case: Navarre's death, the lineage files, Helix Ark procurement, government contingency planning, miracle pathology, and the dangerous dual nature of the protocol itself.

"If we release this badly," Laila said, "they'll call it a cult hoax until armed men start arriving at hospitals. If we release it well, they still might."

"Comforting."

"I'm not comfort. I'm publication."

They need one final piece of proof compelling enough to survive disinformation.

**Choices:**
- **A. Get direct footage from Helix Ark's core lab.**  
  Effects: `exposure +1`  
  Next: `S041`
- **B. Get a confession from Saric or Rhyse.**  
  Effects: `exposure +1`  
  Next: `S043`
- **C. Release now with what you have.**  
  Effects: `exposure +3`  
  Next: `E03`

---

## SCENE S036
**Title:** Partial Disclosure  
**Location:** Athens safe flat  
**Mood:** Controlled mistrust  
**Cast:** Mara, Laila

Holding back the family connection makes cooperation cleaner and lonelier.

Laila notices holes in Mara's timeline but does not press—yet. She focuses on corporate routes, shipping manifests, hidden labs, and the human cost of secrecy. She is useful, tireless, and increasingly dangerous to keep half-informed.

There is enough to strike Helix Ark, not enough to explain the protocol fully.

**Choices:**
- **A. Bring Elias in and triangulate the truth.**  
  Effects: `trust_elias +1`, `trust_laila +1`  
  Next: `S044`
- **B. Continue with Laila alone.**  
  Effects: `exposure +1`  
  Next: `S035`

---

## SCENE S037
**Title:** Recommendation: Burial  
**Location:** Secure facility conference room  
**Mood:** Ethical frost  
**Cast:** Mara, Rhyse

Mara recommended suppression not because she believed the world unworthy, but because she had finally understood worthiness was the wrong metric. No world is ready for selective resurrection. No bureaucracy is ethical enough for triaged miracles.

Rhyse looked relieved in a way that made her regret helping him.

"We'll proceed with neutralization," he said.

And suddenly she knew suppression under him would mean monopoly, not burial.

**Next:** `S040`

---

## SCENE S038
**Title:** Recommendation: Research  
**Location:** Secure facility conference room  
**Mood:** Compromise under pressure  
**Cast:** Mara, Rhyse

Mara proposed controlled research with multinational oversight, transparent ethics, and zero deployment authority.

Rhyse nodded as though such words had meaning inside locked structures built specifically to avoid them.

"A reasonable framework," he said.

That was when she knew he would adopt the language and gut the intent.

Compromise had purchased access, not safety.

**Next:** `S026`

---

## SCENE S039
**Title:** The World Learns the Name  
**Location:** Global media storm  
**Mood:** Historic rupture  
**Cast:** Everyone, effectively

Once the Lazarus Contingency files went public, the phrase itself became a weapon.

Religious leaders split. Markets convulsed. Hospitals saw mobs of the desperate. Legislators demanded emergency sessions. Private security firms tripled their rates. Certain oligarchs vanished to islands. The poor prayed louder and trusted less.

For the first time, the people hunting Mara had to fight each other in the light.

Chaos is not justice, but sometimes it breaks monopolies.

**Next:** `S045`

---

## SCENE S040
**Title:** The Statesman's Face  
**Location:** Secure facility private office  
**Mood:** Controlled confrontation  
**Cast:** Mara, Rhyse

Rhyse poured coffee for both of them, which was offensive in its civility.

"You think I'm the villain," he said.

"I think you've rehearsed not being one."

He accepted that. "I am trying to prevent a world where billionaires live twice, soldiers are rebuilt for second deployments, and every terminal parent sells everything for access lotteries."

"By building the system first yourself?"

"By ensuring someone adult is in the room when history arrives." He leaned forward. "Dr. Vale, the protocol exists. The question is whether it belongs to markets, zealots, or states."

"It belongs to no one."

"That is not a governing option."

He offers Mara a deal: help create an international firewall around the protocol, or be treated as a destabilizing biosecurity actor.

**Choices:**
- **A. Pretend to join him.**  
  Effects: `exposure +0`  
  Next: `S046`
- **B. Refuse and escape with whatever data you can.**  
  Effects: `exposure +1`  
  Next: `S039`
- **C. Ask him one honest question: has anyone already been fully restored?**  
  Effects: none  
  Next: `S047`

---

## SCENE S041
**Title:** Core Lab  
**Location:** Helix Ark underground restoration wing  
**Mood:** Sublime horror  
**Cast:** Mara, Saric, patients, optional Elias/Laila support

The core lab looked less like a research wing than a luxury mausoleum redesigned by surgeons. Glass pods. Perfusion racks. AI monitors. Human beings sleeping beneath sheets of light.

Some were terminal patients in sanctioned studies.

Some, Mara realized with a colder shock, were not volunteers in any meaningful sense at all.

And in the central chamber was a man with a catastrophic spinal injury who had, according to the chart, regained partial motor function in forty-eight hours after protocol activation through a lineage-interface matrix.

It worked.

Not perfectly. Not safely. But it worked.

That truth struck like grief wearing a crown.

Because it meant every argument for exposure, destruction, control, or delay was now contaminated by the image of someone rising from a bed they should never have risen from.

**Choices:**
- **A. Sabotage the lab and destroy the live samples.**  
  Effects: `sample_status = "lost"`, `faith -1`  
  Next: `E01`
- **B. Steal the core research and expose everything.**  
  Effects: `protocol_copy = true`, `exposure +2`  
  Next: `E03`
- **C. Use yourself as the lineage key to test the full protocol under your terms.**  
  Effects: `faith +1`  
  Next: `E04`

---

## SCENE S042
**Title:** The Trial Ward  
**Location:** Helix Ark hidden patient wing  
**Mood:** Human cost, moral collapse  
**Cast:** Mara, patients, Saric optional

The trial ward held miracles and monstrosities separated by curtains.

A burned child sleeping peacefully in regenerated skin.

A woman whose failing liver had recovered enough for her to sit up and ask for tea.

A man in the next room whose cells had overgrown his jaw into a flowering horror of obedient flesh.

This was the protocol's whole truth: salvation with a shadow appetite.

One parent recognized Mara from old rare-disease advocacy interviews and asked the question she had feared all along.

"If you can stop this," the mother whispered, nodding toward the room where a child was healing, "how do you live with yourself?"

There was no answer that did not injure someone.

**Choices:**
- **A. Shut the ward down anyway.**  
  Effects: `faith -1`  
  Next: `E01`
- **B. Evacuate patient data and make it public so no one can monopolize it.**  
  Effects: `exposure +2`, `protocol_copy = true`  
  Next: `E03`
- **C. Search for a restraint mechanism rather than destruction.**  
  Effects: `faith +1`  
  Next: `E05`

---

## SCENE S043
**Title:** Voices on Record  
**Location:** Helix observatory / secure office / hidden mic route  
**Mood:** Tense extraction of truth  
**Cast:** Mara, Saric or Rhyse, optional Laila support

The recording is clean enough to survive denial.

Saric speaks of deployment phases, managed release, premium access, and historical necessity.

Or Rhyse speaks of containment, sovereign custody, and "acceptable asymmetries in preservation priority."

Different language. Same wound.

With the confession captured, the story becomes survivable in public.

The remaining question is not whether to expose the truth, but whether to pair exposure with the protocol itself.

**Choices:**
- **A. Release the confession alone.**  
  Effects: `exposure +2`  
  Next: `E02`
- **B. Release the confession plus scientific proof.**  
  Effects: `exposure +3`, `protocol_copy = true`  
  Next: `E03`
- **C. Use the confession to blackmail a ceasefire and buy time.**  
  Effects: `exposure +1`  
  Next: `E05`

---

## SCENE S044
**Title:** Triangulation  
**Location:** Safe flat, all alliances on one table  
**Mood:** Fractured trust, necessary coalition  
**Cast:** Mara, Elias, Laila

Get a priest, a scientist, and a journalist in one room with a secret worth wars and you do not get harmony. You get velocity.

Laila pushes for publication. Elias pushes for moral restraint. Mara pushes for proof that won't turn the world into a feeding frenzy. All three are right in incompatible ratios.

For one rare hour, though, the coalition holds.

They build a plan: infiltrate Helix Ark, obtain the core evidence, identify the restraint layer, and decide the fate of the protocol only after seeing the whole of it.

This is the strongest route for a balanced ending.

**Next:** `S033`

---

## SCENE S045
**Title:** Rupture Window  
**Location:** Multiple / final convergence  
**Mood:** Endgame acceleration  
**Cast:** Mara, Elias, Laila, Saric, Rhyse

The world is noisy now. Too noisy for clean theft. Too noisy for elegant suppression. Under that cover, everyone moves for the same reason: the final intact protocol source is still physically in play.

Mara can end this only by choosing a doctrine, not just a tactic.

**Choices:**
- **A. Align with disclosure and decentralized oversight.**  
  Effects: none  
  Next: `E03`
- **B. Align with containment and destruction.**  
  Effects: none  
  Next: `E01`
- **C. Seek a constrained cure by locking the restraint key behind shared guardianship.**  
  Effects: none  
  Next: `E05`

---

## SCENE S046
**Title:** Inside the Firewall  
**Location:** International biosecurity summit staging area  
**Mood:** Cold strategy  
**Cast:** Mara, Rhyse, diplomats, shadows

Pretending to join Rhyse buys Mara a chair at the table where nations begin drafting custodial doctrine for the protocol. She sees at once that the language of ethics is already being translated into categories of access.

Tiered medical necessity. Strategic continuity candidates. Leadership preservation contingencies.

The old sin, digitized.

From inside, she can still leak everything or sabotage the emerging regime.

**Choices:**
- **A. Leak the summit files to Laila.**  
  Effects: `trust_laila +1`, `exposure +2`  
  Next: `E03`
- **B. Stay and shape the system toward the least evil version.**  
  Effects: `faith -1`  
  Next: `E06`

---

## SCENE S047
**Title:** Has Anyone Returned  
**Location:** Rhyse's office  
**Mood:** Quiet terror  
**Cast:** Mara, Rhyse

Mara asked the question softly because the loud version felt superstitious.

"Has anyone already been fully restored?"

Rhyse did not answer at first.

Then he opened a file.

Inside was footage from nine years earlier: a teenage boy after catastrophic trauma, clinically unsalvageable by every standard metric. Hours later, stabilized. Days later, ambulatory.

Jonah.

Mara could not breathe.

"No," she whispered. "He died. I buried him."

"The body in the casket was not suitable for open viewing," Rhyse said carefully. "Your mother was sedated. Your father signed a sealed transfer under exceptional emergency doctrine. The restoration failed months later due to instability. He died in a restricted wing under another name."

The room became abstract. Sound detached from meaning.

Her brother had not simply died.

He had been taken, used, almost returned, and then lost twice.

This knowledge transforms every ending.

**Choices:**
- **A. Burn all of it down.**  
  Effects: none  
  Next: `E01`
- **B. Expose everything, including Jonah.**  
  Effects: `father_truth = true`, `exposure +3`  
  Next: `E03`
- **C. Build a world where no family is ever denied the truth again, even if the protocol remains constrained.**  
  Effects: `father_truth = true`  
  Next: `E05`

---

# ENDINGS

## E01
**Title:** Ash Doctrine  
**Type:** Destruction ending  
**Summary:** Mara destroys the active protocol source, sabotages Helix Ark's restoration infrastructure, and ensures no intact version remains in one place.

The fire alarms begin as a shriek and become a chorus.

Mara triggers the sterilization cascade with hands steadier than she feels. Cryogenic lines vent. Storage cores frost, crack, and fail. In the trial ward, emergency teams rush to preserve what ordinary medicine still can. It is not enough for everyone.

That will haunt her forever.

Saric calls her a murderer. Rhyse calls her reckless. Elias says nothing because prayer, in that moment, would feel like theft. Laila records the burning facility from the sea and later writes the line that defines the century:

**We were offered a ladder out of death by men already selling rungs.**

The world never gets the protocol whole. Fragments remain, rumors survive, black markets rise and fail, but monopoly dies in the flames. Mara lives with the certainty that she destroyed cures along with empires.

Some nights she believes she saved humanity from stratified immortality.

Some nights she dreams of a child in a trial ward asking if it hurt when hope was taken away.

`ending_tag = "destruction"`

---

## E02
**Title:** The Confession Age  
**Type:** Exposure without code ending  
**Summary:** Mara releases recordings proving the conspiracy but withholds the full protocol.

The recordings detonate across the planet.

Saric's board collapses. Rhyse is dragged before closed committees that cannot stay closed. Churches split between denunciation and reform. The public learns that the powerful hid a real regenerative phenomenon and spent decades debating ownership of miracles in secret.

But the code itself never appears.

That choice creates an age of accusation and hunger. Everyone knows *something* was real. No one has enough to reproduce it. Charlatans flourish. States raid vaults. Scientists chase ghosts.

Mara becomes both hero and traitor depending on who is speaking. She has exposed the sin but not delivered the cure.

In private, she tells Elias she chose the only path that did not immediately become a marketplace.

He answers, "History will still call you cruel."

"History was always going to," she says.

`ending_tag = "confession_only"`

---

## E03
**Title:** Open Source Resurrection  
**Type:** Radical disclosure ending  
**Summary:** Mara and her allies release the evidence and the scientific foundations of the protocol to the world.

The publication drops in synchronized mirrors across dozens of jurisdictions: lineage files, contingency plans, lab footage, ethical analysis, and enough of the scientific architecture for serious teams to begin independent verification.

The effect is immediate and planetary.

No one controls the miracle now.

That is both triumph and disaster.

Within months, legitimate medical consortiums make careful progress toward safe localized tissue repair. At the same time, rogue clinics and military labs sprint into catastrophe. Black-market "restoration" kills thousands. Verified treatments save others who would absolutely have died.

The age becomes morally incandescent. Every nation must answer the same question in public: who gets the right to try again?

Laila says the truth was worth the fire.

Elias says truth without formation is a blade handed to children.

Mara stands at the center of a transformed century knowing both are right, and that she chose anyway.

`ending_tag = "open_source"`

---

## E04
**Title:** The Living Key  
**Type:** Sacrificial transformation ending  
**Summary:** Mara uses herself as the host interface to test and bind the protocol.

No one can stop her fast enough.

Mara enters the chamber, floods the interface with her own lineage markers, and initiates activation under constraints she wrote herself. For one blazing minute the system obeys.

She feels every old injury in the ward like weather passing through a single sky. Tissue sings in codes she can almost understand. The protocol opens not like software but like memory—ancestral, biological, terrible.

She sees why every empire wanted it and why none could keep it clean.

Then she does the only thing left.

She binds the active authorization layer to herself and collapses the rest into inert fragments. The protocol survives, but only through her continued existence and consent. She becomes cure, witness, hostage, and sanctuary all at once.

The world calls her saint, weapon, fraud, mother of a new medicine, prisoner of history.

She calls herself tired.

Elias stays nearby. Laila keeps the world from mythologizing her too neatly. And every request for healing becomes personal because it must pass through a human soul again.

`ending_tag = "living_key"`

---

## E05
**Title:** Covenant of Restraint  
**Type:** Balanced ending  
**Summary:** Mara creates a constrained framework: the protocol is preserved, fragmented, and placed under shared guardianship with radical transparency and hard limits.

It takes a scandal, a summit, two dead men, three leaks, and one island raid to force the agreement into being.

The final protocol is split across independent international custodians: scientific, civic, and moral. No state can deploy it alone. No corporation can patent it outright. Every use is public, every trial audited, every death disclosed, every selection challengeable. Lineage screening becomes illegal outside licensed care. Families receive truth as a right, not a favor.

It is imperfect. It is vulnerable. It may someday fail.

But for a generation, at least, the miracle remains tethered to accountability.

Mara visits Jonah's grave after the agreement is signed. She tells him she could not save him, not really, not in time, not cleanly. But she may have saved the next family from losing someone twice—once to illness and again to secrecy.

The wind moves through the cemetery grass like a page turning.

Elias stands back and lets silence do the pastoral work. Laila, from a respectful distance, does not photograph the moment.

For the first time in years, Mara feels neither chosen nor hunted.

Only responsible.

`ending_tag = "covenant"`

---

## E06
**Title:** The Least Evil State  
**Type:** Political containment ending  
**Summary:** Mara remains inside the emerging international system and helps shape a regulated custodial regime.

The system that forms is better because Mara is in it and worse because any such system must exist at all.

Access is narrow, monitored, and real. Some lives are saved. Some are deferred. The wealthy try to buy influence and partially succeed. The desperate protest outside fortified clinics. Bureaucracies, like tumors, learn fast.

Mara writes rules sharper than any ministry wants and watches loopholes grow around them. Elias accuses her, gently and only once, of confusing stewardship with proximity to power. Laila publishes a long essay titled **No Humane Monopoly Exists**, which Mara reads three times and hates for being partly correct.

History judges her ambiguously, which is another way of saying honestly.

`ending_tag = "state_containment"`

---

# Implementation notes for Codex

## Suggested data model
Use a scene object with:
- `id`
- `title`
- `location`
- `mood`
- `cast`
- `body`
- `choices[]` with `label`, `text`, `effects`, `next`
- optional `conditions[]` for gated variants

## UI suggestions
- Use a dossier-style interface with tabs for **Story**, **Evidence**, **Characters**, and **World State**.
- Track variable changes visibly only if the adaptation wants a strategic feel; otherwise keep them hidden for drama.
- Use ambient audio cues by route: rain, cathedral reverb, lab hum, helicopter rotors, sea wind.
- Interleave document reveals as unlockable overlays.

## Expansion hooks
Future chapters or DLC-style branches can expand:
- Jonah's restricted-wing months
- Elias's Sarajevo incident
- Laila's publication war with governments
- The first international trial under the Covenant ending
- A post-ending route about black-market resurrection clinics

## Writing rule for adaptation
Never present the protocol as clean wish fulfillment. Every gain should cast an ethical shadow.

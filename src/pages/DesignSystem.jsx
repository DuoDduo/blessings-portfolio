// /design — living reference for the "Blueprint" design system.
import '@fontsource-variable/schibsted-grotesk'
import '@fontsource-variable/jetbrains-mono'
import '../styles/tokens.css'
import {
  Button, Card, DecisionTrace, Note, SectionHeader, Tag, ThemeToggle,
} from '../components/ui/ui'
import './DesignSystem.css'

const COLORS = [
  { token: '--color-bg', name: 'Background', use: 'Page canvas: paper in light, blueprint in dark.' },
  { token: '--color-surface', name: 'Surface', use: 'Cards and traces sitting on the canvas.' },
  { token: '--color-text', name: 'Text', use: 'Headings and body copy.' },
  { token: '--color-text-muted', name: 'Muted text', use: 'Descriptions, captions, metadata.' },
  { token: '--color-link', name: 'Draft blue', use: 'Links, trace lines and step markers.' },
  { token: '--color-annotation', name: 'Annotation', use: 'Margin notes only. Never buttons or headings.' },
  { token: '--color-verified', name: 'Verified', use: 'A decision that passed its checks.' },
  { token: '--color-flagged', name: 'Flagged', use: 'A decision that was blocked or escalated.' },
]

const TYPE_SCALE = [
  { token: '--text-4xl', px: '48–72', sample: 'Blessing James' },
  { token: '--text-3xl', px: '48', sample: 'AI you can audit' },
  { token: '--text-2xl', px: '36', sample: 'Selected work' },
  { token: '--text-xl', px: '24', sample: 'Sentinnel Banking' },
  { token: '--text-lg', px: '21', sample: 'Three agents, one audit log' },
  { token: '--text-md', px: '18', sample: 'Deterministic engines make every financial decision.' },
  { token: '--text-sm', px: '16', sample: 'Language models only explain the decision that was made.' },
  { token: '--text-xs', px: '14', sample: 'Synthetic data. No customer information was used.' },
]

const SPACING = ['--space-1', '--space-2', '--space-3', '--space-4', '--space-5', '--space-6', '--space-7', '--space-8']

const RADII = [
  { token: '--radius-chip', use: 'Tags' },
  { token: '--radius-control', use: 'Buttons' },
  { token: '--radius-surface', use: 'Cards, traces' },
  { token: '--radius-pill', use: 'Icon toggles' },
]

const EXAMPLE_TRACE = [
  { layer: 'input', title: 'Card payment at a POS terminal', detail: 'txn_8841 · ₦480,000 · POS · 02:14 · 3rd charge in 6 min' },
  { layer: 'rules engine', title: 'Velocity limit exceeded', detail: 'rule FRM-VEL-03: max 2 POS charges per 10 min', status: 'flagged' },
  { layer: 'ml model', title: 'Fraud probability 0.87', detail: 'random forest · above 0.85 raises risk one level' },
  { layer: 'policy (rag)', title: 'Matched the card-fraud policy', detail: 'ChromaDB · 6 policy documents · all-mpnet-base-v2' },
  { layer: 'llm', title: 'Explanation written for the audit log', detail: '"Blocked: three POS charges in six minutes exceed the velocity rule."', status: 'passed' },
]

const Swatch = ({ token, name, use }) => (
  <li className='ds-swatch'>
    <span className='ds-swatch__chip' style={{ background: `var(${token})` }} aria-hidden='true' />
    <span className='ds-swatch__name'>{name}</span>
    <code className='ds-swatch__token'>{token}</code>
    <span className='ds-swatch__use'>{use}</span>
  </li>
)

const DesignSystem = () => (
  <div className='ds'>
    <header className='ds-topbar'>
      <a href='/' className='ds-topbar__home'>Blessing James</a>
      <ThemeToggle />
    </header>

    <main className='ds-main'>
      <section className='ds-intro' aria-labelledby='ds-title'>
        <h1 id='ds-title' className='ds-intro__title'>Blueprint</h1>
        <p className='ds-intro__lede'>
          The design system behind this portfolio. It borrows from architecture drawings and
          audit logs, because the work it presents is about AI whose{' '}
          <Note note='the brand in one line'>decisions can be traced and explained.</Note>
        </p>
      </section>

      <section className='ds-section' aria-labelledby='principles'>
        <SectionHeader id='principles' title='Principles' />
        <ul className='ds-principles'>
          <li><strong>Show the reasoning.</strong> Every claim points to a repo, a number or a trace.</li>
          <li><strong>One loud thing.</strong> The decision trace carries the personality. Everything else stays quiet.</li>
          <li><strong>Colour means something.</strong> Green passed, orange was flagged, yellow is a note. Nothing is coloured for decoration.</li>
          <li><strong>Motion shows the system working.</strong> The 3D network in the hero runs live and answers your pointer and clicks. Elsewhere, motion responds to scrolling and interaction, and all of it stops when your system asks for reduced motion.</li>
        </ul>
      </section>

      <section className='ds-section' aria-labelledby='signature'>
        <SectionHeader id='signature' title='Decision trace'>
          The signature component. Each case study shows how one decision moved through the
          system, layer by layer, ending in the explanation a human reads.
        </SectionHeader>
        <DecisionTrace caption='Example trace from Sentinnel Banking (synthetic data)' steps={EXAMPLE_TRACE} />
      </section>

      <section className='ds-section' aria-labelledby='colour'>
        <SectionHeader id='colour' title='Colour'>
          Switch the theme to see both palettes. Components only use these semantic tokens.
        </SectionHeader>
        <ul className='ds-swatches'>{COLORS.map((c) => <Swatch key={c.token} {...c} />)}</ul>
      </section>

      <section className='ds-section' aria-labelledby='type'>
        <SectionHeader id='type' title='Type'>
          Schibsted Grotesk for everything people read. JetBrains Mono only for real system
          output inside traces. Sizes follow the classical typographic scale.
        </SectionHeader>
        <ul className='ds-type'>
          {TYPE_SCALE.map(({ token, px, sample }) => (
            <li key={token} className='ds-type__row'>
              <code className='ds-type__meta'>{token} · {px}px</code>
              <span className='ds-type__sample' style={{ fontSize: `var(${token})` }}>{sample}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className='ds-section' aria-labelledby='components'>
        <SectionHeader id='components' title='Components' />
        <div className='ds-grid'>
          <Card>
            <h3 className='ds-card-title'>Buttons</h3>
            <div className='ds-row'>
              <Button href='#components'>View work</Button>
              <Button variant='secondary' href='#components'>Résumé</Button>
              <Button variant='ghost' href='#components'>Read the case study</Button>
            </div>
          </Card>
          <Card>
            <h3 className='ds-card-title'>Tags</h3>
            <div className='ds-row'>
              <Tag>LangGraph</Tag>
              <Tag>FastAPI</Tag>
              <Tag>React</Tag>
              <Tag tone='verified'>Passed</Tag>
              <Tag tone='flagged'>Flagged</Tag>
            </div>
          </Card>
          <Card className='ds-grid__wide'>
            <h3 className='ds-card-title'>Card</h3>
            <p className='ds-card-copy'>
              Surfaces use a hairline border, not a shadow, like a frame on a drawing sheet.
              Radius grows with the size of the element: chips are crisp, surfaces are softer.
            </p>
            <div className='ds-row'>
              <Tag>Python</Tag><Tag>scikit-learn</Tag><Tag>ChromaDB</Tag>
            </div>
          </Card>
        </div>
      </section>

      <section className='ds-section' aria-labelledby='space'>
        <SectionHeader id='space' title='Spacing and radius'>
          A 4px base on an 8px rhythm. The background grid uses the same 24px unit, so it lines up with the layout instead of decorating it.
        </SectionHeader>
        <ul className='ds-spacing'>
          {SPACING.map((token) => (
            <li key={token} className='ds-spacing__row'>
              <code className='ds-type__meta'>{token}</code>
              <span className='ds-spacing__bar' style={{ width: `var(${token})` }} />
            </li>
          ))}
        </ul>
        <ul className='ds-radii'>
          {RADII.map(({ token, use }) => (
            <li key={token} className='ds-radii__item'>
              <span className='ds-radii__shape' style={{ borderRadius: `var(${token})` }} />
              <code className='ds-type__meta'>{token}</code>
              <span className='ds-swatch__use'>{use}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  </div>
)

export default DesignSystem

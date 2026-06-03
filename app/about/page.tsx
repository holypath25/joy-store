import type { Metadata } from 'next'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'About Team JOY — Korean Medical Beauty Expertise, Delivered Globally',
  description:
    'Team JOY connects Korean clinical beauty expertise with clinics in Toronto and Sydney through seminars, beautician placement, and aesthetic product supply.',
}

const TEAM = [
  {
    role: '의료 콘텐츠 & 자문 총괄',
    roleEn: 'Medical Content & Advisory',
    name: '사모님',
    color: 'bg-[#1e3a5f]',
    points: [
      'Registered nurse license',
      'Spouse of a clinic director — direct access to procedure data',
      'Ingredient & efficacy verification',
      'Clinical documentation and endorsement',
    ],
  },
  {
    role: '국내 조달 & 파트너십 총괄',
    roleEn: 'Domestic Procurement & Partnerships',
    name: '도소매 대표님',
    color: 'bg-[#008080]',
    points: [
      'Operates domestic pharmaceutical wholesale',
      'Hospital, pharma & medical device network',
      'Manufacturer selection & raw material sourcing',
      'Domestic hospital distribution channels',
      'University MOU negotiations',
    ],
  },
  {
    role: '해외 영업 & 마케팅 총괄',
    roleEn: 'Overseas Sales & Marketing',
    name: '홀리패스 대표',
    color: 'bg-[#b8952a]',
    points: [
      'Pharmaceutical & cosmetics overseas export',
      'Clinic network in Toronto & Sydney',
      'Seminar planning and full operations',
      'Brand marketing lead',
      'Visa & administrative process management',
    ],
  },
]

const BUSINESSES = [
  {
    number: '01',
    title: '해외 뷰티 세미나',
    titleEn: 'Overseas Beauty Seminar',
    color: 'border-[#1e3a5f] text-[#1e3a5f]',
    bg: 'bg-[#eef2f7]',
    markets: [
      {
        city: 'Toronto, Canada',
        flag: '🇨🇦',
        detail: 'Early-stage beauty market with high growth potential. Seminars cover skin booster hand injection, Botox technique, and Dermashine device procedures.',
        target: 'Clinic directors, nurses, medical beauty practitioners',
        revenue: 'USD 500–1,500 / person · Sponsorship · On-site product sales',
      },
      {
        city: 'Sydney, Australia',
        flag: '🇦🇺',
        detail: 'Mature beauty market with unmet demand in hair loss specialization. Seminars cover scalp diagnosis, ampoule protocols, and device application.',
        target: 'Clinic directors, dermatology practitioners',
        revenue: 'AUD 700–1,500 / person · Ampoule on-site sales',
      },
    ],
    process: ['Material collection', 'EN portfolio & content', 'Sponsor acquisition', '4–6 week pre-marketing', 'Seminar + on-site sales'],
  },
  {
    number: '02',
    title: '뷰티션 인력 알선',
    titleEn: 'Korean Beautician Staffing for Australia',
    color: 'border-[#008080] text-[#008080]',
    bg: 'bg-[#edf7f7]',
    supply: ['University cosmetology MOU partners', 'Working holiday visa applicants', 'Verified technicians'],
    demand: ['Local clinics (seminar network)', 'Spas & beauty salons', 'Korean beauty businesses'],
    service: ['Skill verification & matching', 'Visa & administrative support', 'Post-settlement follow-up'],
  },
  {
    number: '03',
    title: '에스테틱 제품 유통 및 제조',
    titleEn: 'Aesthetic Product Distribution & Manufacturing',
    color: 'border-[#b8952a] text-[#b8952a]',
    bg: 'bg-[#faf5e8]',
    products: [
      {
        name: 'Skin Booster Ampoule',
        targets: 'Canada & Korea clinics',
        channels: 'Seminar supply · Domestic B2B · B2C overseas',
      },
      {
        name: 'Hair Loss Treatment Ampoule',
        targets: 'Australia & Korea clinics',
        channels: 'Seminar supply · Overseas export · OEM white-label',
      },
    ],
    process: ['Ingredient planning', 'Manufacturer selection', 'Branding & packaging', 'Clinical data', 'Distribution & export'],
  },
]

const ROADMAP = [
  { phase: 'Phase 1', period: '0–3 months', items: ['Doctor data collection', 'Seminar concept finalized', 'SNS channels launched', 'University MOU discussions begin', 'Ampoule manufacturer search'] },
  { phase: 'Phase 2', period: '3–6 months', items: ['1st seminar (Toronto or Sydney)', 'Ampoule samples produced', '1st beautician recruit', 'Sponsor contracts signed', 'SNS audience growth'] },
  { phase: 'Phase 3', period: '6–12 months', items: ['2nd seminar (opposite city)', 'Official ampoule launch', '1st beautician dispatched', 'Local clinic supply begins', 'B2C channel open'] },
  { phase: 'Phase 4', period: '12–24 months', items: ['Bi-annual seminar schedule', 'Overseas distribution expansion', 'Staffing platform build', 'OEM order growth', 'Own brand launch'] },
]

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-[#1e3a5f] text-white">
        <div className="container-page py-20 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#4db8b8] uppercase tracking-wider mb-3">About Team JOY</p>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
              한국 뷰티 의료 기술을{' '}
              <span className="text-[#4db8b8]">세계로 연결하는 플랫폼</span>
            </h1>
            <p className="mt-4 text-white/50 text-sm italic">Korean Medical Beauty Expertise, Delivered Globally</p>
            <p className="mt-6 text-lg text-white/70 leading-relaxed">
              Team JOY is a three-person platform bridging Korea's clinical beauty expertise with clinics and businesses in Toronto and Sydney — through professional education, workforce placement, and aesthetic product supply.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-pad bg-surface-soft">
        <div className="container-page">
          <div className="text-center max-w-xl mx-auto mb-14">
            <p className="text-sm font-semibold text-[#008080] uppercase tracking-wider mb-2">팀 구성</p>
            <h2 className="text-3xl font-bold text-ink">Team Structure & Roles</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TEAM.map((member) => (
              <div key={member.role} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                <div className={`${member.color} px-6 py-5`}>
                  <p className="text-white/60 text-xs font-semibold uppercase tracking-wider">{member.roleEn}</p>
                  <p className="text-white font-bold text-lg mt-1">{member.role}</p>
                </div>
                <div className="p-6">
                  <ul className="space-y-2.5">
                    {member.points.map((p) => (
                      <li key={p} className="flex gap-2.5 text-sm text-ink-muted">
                        <svg className="w-4 h-4 text-[#008080] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 Businesses */}
      <section className="section-pad bg-white">
        <div className="container-page">
          <div className="text-center max-w-xl mx-auto mb-14">
            <p className="text-sm font-semibold text-[#008080] uppercase tracking-wider mb-2">사업 개요</p>
            <h2 className="text-3xl font-bold text-ink">Three Core Businesses</h2>
            <p className="mt-4 text-ink-muted">Each line feeds the next — seminar attendees become product clients; product clients become staffing partners.</p>
          </div>

          <div className="space-y-10">
            {/* Business 01 */}
            <div className={`rounded-2xl border-l-4 ${BUSINESSES[0].color} ${BUSINESSES[0].bg} p-8`}>
              <div className="flex items-start gap-4 mb-6">
                <span className={`text-4xl font-bold opacity-20 ${BUSINESSES[0].color.split(' ')[1]} leading-none`}>{BUSINESSES[0].number}</span>
                <div>
                  <p className={`text-sm font-bold uppercase tracking-wider ${BUSINESSES[0].color.split(' ')[1]}`}>{BUSINESSES[0].titleEn}</p>
                  <h3 className="text-xl font-bold text-ink">{BUSINESSES[0].title}</h3>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {BUSINESSES[0].markets!.map((m) => (
                  <div key={m.city} className="bg-white rounded-xl p-5 border border-slate-100">
                    <p className="font-semibold text-ink mb-3">{m.flag} {m.city}</p>
                    <p className="text-sm text-ink-muted mb-3 leading-relaxed">{m.detail}</p>
                    <div className="space-y-1.5 text-xs text-ink-faint">
                      <p><span className="font-medium text-ink-muted">Target:</span> {m.target}</p>
                      <p><span className="font-medium text-ink-muted">Revenue:</span> {m.revenue}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <p className="text-xs font-semibold text-ink-muted uppercase tracking-wider mb-3">Process</p>
                <div className="flex flex-wrap gap-2">
                  {BUSINESSES[0].process!.map((step, i) => (
                    <div key={step} className="flex items-center gap-2">
                      <span className="bg-white border border-slate-200 text-ink text-xs px-3 py-1.5 rounded-full">{step}</span>
                      {i < BUSINESSES[0].process!.length - 1 && (
                        <svg className="w-3 h-3 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Business 02 */}
            <div className={`rounded-2xl border-l-4 ${BUSINESSES[1].color} ${BUSINESSES[1].bg} p-8`}>
              <div className="flex items-start gap-4 mb-6">
                <span className="text-4xl font-bold opacity-20 text-[#008080] leading-none">{BUSINESSES[1].number}</span>
                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-[#008080]">{BUSINESSES[1].titleEn}</p>
                  <h3 className="text-xl font-bold text-ink">{BUSINESSES[1].title}</h3>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-5 border border-slate-100">
                  <p className="font-semibold text-ink mb-3 text-sm">공급 (한국)</p>
                  <ul className="space-y-2">
                    {BUSINESSES[1].supply!.map((s) => (
                      <li key={s} className="text-sm text-ink-muted flex gap-2">
                        <span className="text-[#008080]">›</span>{s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-[#008080] rounded-xl p-5 text-white">
                  <p className="font-semibold mb-3 text-sm">Team JOY 매칭 플랫폼</p>
                  <ul className="space-y-2">
                    {BUSINESSES[1].service!.map((s) => (
                      <li key={s} className="text-sm text-white/80 flex gap-2">
                        <span className="text-white/50">›</span>{s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white rounded-xl p-5 border border-slate-100">
                  <p className="font-semibold text-ink mb-3 text-sm">수요 (호주)</p>
                  <ul className="space-y-2">
                    {BUSINESSES[1].demand!.map((d) => (
                      <li key={d} className="text-sm text-ink-muted flex gap-2">
                        <span className="text-[#008080]">›</span>{d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Business 03 */}
            <div className={`rounded-2xl border-l-4 ${BUSINESSES[2].color} ${BUSINESSES[2].bg} p-8`}>
              <div className="flex items-start gap-4 mb-6">
                <span className="text-4xl font-bold opacity-20 text-[#b8952a] leading-none">{BUSINESSES[2].number}</span>
                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-[#b8952a]">{BUSINESSES[2].titleEn}</p>
                  <h3 className="text-xl font-bold text-ink">{BUSINESSES[2].title}</h3>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {BUSINESSES[2].products!.map((prod) => (
                  <div key={prod.name} className="bg-white rounded-xl p-5 border border-slate-100">
                    <p className="font-semibold text-ink mb-2">{prod.name}</p>
                    <p className="text-xs text-ink-faint mb-1"><span className="font-medium text-ink-muted">Target:</span> {prod.targets}</p>
                    <p className="text-xs text-ink-faint"><span className="font-medium text-ink-muted">Channels:</span> {prod.channels}</p>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-xs font-semibold text-ink-muted uppercase tracking-wider mb-3">Manufacturing Process</p>
                <div className="flex flex-wrap gap-2">
                  {BUSINESSES[2].process!.map((step, i) => (
                    <div key={step} className="flex items-center gap-2">
                      <span className="bg-white border border-slate-200 text-ink text-xs px-3 py-1.5 rounded-full">{step}</span>
                      {i < BUSINESSES[2].process!.length - 1 && (
                        <svg className="w-3 h-3 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="section-pad bg-surface-soft">
        <div className="container-page">
          <div className="text-center max-w-xl mx-auto mb-14">
            <p className="text-sm font-semibold text-[#008080] uppercase tracking-wider mb-2">단계별 로드맵</p>
            <h2 className="text-3xl font-bold text-ink">Our Roadmap</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ROADMAP.map((r, i) => (
              <div key={r.phase} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                <div className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4 ${
                  i === 0 ? 'bg-[#1e3a5f] text-white' :
                  i === 1 ? 'bg-[#008080] text-white' :
                  i === 2 ? 'bg-[#b8952a] text-white' :
                  'bg-emerald-600 text-white'
                }`}>
                  {r.phase}
                </div>
                <p className="text-sm text-ink-muted mb-4 font-medium">{r.period}</p>
                <ul className="space-y-2">
                  {r.items.map((item) => (
                    <li key={item} className="text-sm text-ink-muted flex gap-2">
                      <svg className="w-4 h-4 text-slate-300 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad bg-[#1e3a5f]">
        <div className="container-page text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Partner with Team JOY
          </h2>
          <p className="mt-4 text-white/60 text-lg max-w-xl mx-auto">
            Clinic in Toronto or Sydney? Beauty professional looking for Australia placements? Distributor seeking Korean aesthetic products? Let's connect.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/quote-request" size="lg" className="bg-[#4db8b8] hover:bg-[#3da8a8] border-0 text-white">
              Get in Touch
            </Button>
            <Button href="/products" variant="ghost" size="lg" className="text-white hover:bg-white/10 border border-white/30">
              View Products
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

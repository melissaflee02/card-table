// Prose pages: About (including the editorial policy) and Privacy.
//
// These are public commitments, so everything stated here must be literally
// true of the shipped site. The privacy page in particular describes real
// behaviour — no cookies, no analytics, no server — and if that ever changes,
// this file has to change in the same commit. A test asserts the site has no
// third-party requests, so the claim cannot quietly rot.

import { SITE } from '../templates/layout.js';

const UPDATED = '2026-09-08';

export const PAGES = [
  {
    slug: 'about',
    title: 'About',
    heading: 'About Card Table',
    description:
      'Who makes Card Table, how the rules are chosen and checked, and what to do when a ruleset disagrees with how your table plays.',
    lede: 'A free reference for the card games people actually play — built to settle an argument in under a minute, not to be read end to end.',
    updated: UPDATED,
    blocks: [
      { type: 'h2', text: 'What this is', id: 'what' },
      {
        type: 'p',
        text: 'Card Table is a rules reference for classic card games. Every game has the setup, the turn order, the scoring, the arguments people actually have, a printable cheat sheet and a scorekeeper. There are no accounts, no adverts, no pop-ups and no newsletter.',
      },
      {
        type: 'p',
        text: 'It exists because looking up a rule mid-game is usually miserable. You get a page of history before the rules, or a rulebook PDF, or a forum thread from 2009. The aim here is that you can find the answer, settle it, and get back to the table.',
      },

      { type: 'h2', text: 'How the rules are chosen', id: 'editorial' },
      {
        type: 'p',
        text: 'Most traditional card games have no single official ruleset. They spread through pubs, families and school playgrounds rather than through a publisher, so they picked up local variations along the way. That is a feature of the games, not a problem to be tidied away.',
      },
      { type: 'p', text: 'So the policy is:' },
      {
        type: 'ul',
        items: [
          '**One clear ruleset is presented as the main rules.** You should be able to start a game from the top of the page without making decisions.',
          '**Where sources genuinely disagree, the difference goes under House rules & variations** rather than being silently settled. If two ways of playing are both common, both are described, and the page says to agree before dealing.',
          '**Every game cites the references it was checked against**, at the bottom of the page, with the date it was last reviewed.',
          '**Nothing is invented.** If a rule is unusual or specific to certain groups, it is labelled that way.',
        ],
      },
      {
        type: 'callout',
        variant: 'note',
        label: 'The house always wins',
        text: 'If this site disagrees with how your group has played for years, your group is right. These pages are a reference for settling disputes and teaching newcomers, not an authority that overrules your table.',
      },

      { type: 'h2', text: 'Found a mistake?', id: 'corrections' },
      {
        type: 'p',
        text: `Rules errors are worth reporting and get fixed quickly — please ${
          SITE.contactEmail
            ? `email [${SITE.contactEmail}](mailto:${SITE.contactEmail})`
            : `[open an issue](${SITE.issues})`
        }. It helps enormously if you say which game, which section, and how your group plays it instead.`,
      },
      {
        type: 'p',
        text: 'Corrections to the rules themselves are treated as more urgent than anything cosmetic. A wrong rule sends someone into an argument with bad information.',
      },

      { type: 'h2', text: 'Who makes it', id: 'who' },
      {
        type: 'p',
        text: `Card Table is made and maintained by one person. The whole site is open source — you can read every line of it, including the rules content, [on GitHub](${SITE.repo}).`,
      },
      {
        type: 'p',
        text: 'It is free, and there is no plan to put it behind a paywall, cover it in adverts, or ask for an email address.',
      },
    ],
  },

  {
    slug: 'privacy',
    title: 'Privacy',
    description:
      'Card Table collects nothing. No accounts, no cookies, no analytics, no tracking. Your scores and practice progress stay in your own browser.',
    lede: 'Short version: nothing you do here is sent anywhere. There is no server to send it to.',
    updated: UPDATED,
    blocks: [
      { type: 'h2', text: 'What is collected', id: 'collected' },
      {
        type: 'p',
        text: 'Nothing. Card Table is a set of static files. There is no account system, no database, no login, no contact form and no back end that could receive your data.',
      },
      {
        type: 'ul',
        items: [
          '**No cookies.** The site sets none, so there is no consent banner to dismiss.',
          '**No analytics or tracking scripts.** No Google Analytics, no pixels, no fingerprinting, no third-party tags of any kind.',
          '**No third-party requests.** Fonts, styles, scripts and images are all served from this site. Nothing is fetched from a CDN or an ad network, so no other company sees that you visited.',
          '**No adverts.**',
        ],
      },

      { type: 'h2', text: 'What is stored on your device', id: 'stored' },
      {
        type: 'p',
        text: 'Three things are saved in your browser’s local storage so the site is useful across visits. All of it stays on your device and none of it is transmitted:',
      },
      {
        type: 'table',
        headers: ['What', 'Why', 'Where'],
        rows: [
          ['Light or dark theme', 'So the site opens the way you left it', 'Your browser only'],
          ['Practice drill progress', 'So the "2 of 2 completed" rings survive a refresh', 'Your browser only'],
          ['Scorekeeper players and rounds', 'So a game in progress survives a refresh or an accidental tab close', 'Your browser only'],
        ],
      },
      {
        type: 'p',
        text: 'Player names typed into the scorekeeper never leave your device. Clearing your browser’s site data for this site erases all of it permanently, and the site keeps working — you simply start fresh.',
      },
      {
        type: 'callout',
        variant: 'note',
        label: 'Private browsing',
        text: 'In a private or incognito window, local storage is discarded when you close it. The site still works; nothing persists between sessions.',
      },

      { type: 'h2', text: 'Server logs', id: 'logs' },
      {
        type: 'p',
        text: 'The site is hosted on GitHub Pages. Like any web host, GitHub records standard request information — IP address, time, and which page was requested — for security and abuse prevention. That is GitHub’s processing, not mine, and I have no access to it. See the [GitHub Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement) for details.',
      },

      { type: 'h2', text: 'Links to other sites', id: 'links' },
      {
        type: 'p',
        text: 'Each game page cites the references its rules were checked against. Those are ordinary links to other websites, which have their own privacy practices. Nothing about you is passed to them when you follow one.',
      },

      { type: 'h2', text: 'Children', id: 'children' },
      {
        type: 'p',
        text: 'Card Table is suitable for all ages and collects no personal information from anyone, including children.',
      },

      { type: 'h2', text: 'Changes', id: 'changes' },
      {
        type: 'p',
        text: `If this ever changes — if analytics are added, for example — this page will be updated and the date below will change with it. ${
          SITE.contactEmail
            ? `Questions: [${SITE.contactEmail}](mailto:${SITE.contactEmail}).`
            : `Questions: [open an issue](${SITE.issues}).`
        }`,
      },
    ],
  },
];

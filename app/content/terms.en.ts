import type { LegalDoc } from '#shared/types/legal'
import { SUPPORT_EMAIL } from '~/constants/site'

const mail = `<a href="mailto:${SUPPORT_EMAIL}">${SUPPORT_EMAIL}</a>`

export const termsEn: LegalDoc = {
  title: 'Terms of Service',
  summary:
    'These terms cover the NextMoe account service (account.nextmoe.com) and this brand portal (www.nextmoe.com). By using them you accept these terms.',
  sections: [
    {
      id: 'service',
      title: '1. The service',
      body: [
        'NextMoe ("we", "us") provides the NextMoe account service — an authentication and authorization service used to sign in to the member sites — together with this brand portal.',
        'The NextMoe platform is still under development. This site currently offers brand and legal information only, and we make no promise of any other product feature.',
        'The member sites (kungal.com, moyu.moe, letmoe.com and others) are operated independently by their own teams, under their own terms and community rules. These terms do not replace those rules.'
      ]
    },
    {
      id: 'eligibility',
      title: '2. Eligibility',
      body: [
        'You must be at least 13 years old to register a NextMoe account. If the place where you live sets a higher minimum age, that age applies instead.'
      ]
    },
    {
      id: 'account',
      title: '3. Your account',
      list: [
        'Register with a real, working email address and keep your details up to date.',
        'Keep your credentials confidential. You are responsible for everything done through your account.',
        'Contact us immediately if you believe your account has been used without your permission.',
        'Do not transfer, sell or lend your account to someone else unless we allow it.'
      ]
    },
    {
      id: 'acceptable-use',
      title: '4. Acceptable use',
      body: ['When using the service, do not:'],
      list: [
        'attempt to gain unauthorized access to the service, to another person’s account, or to our infrastructure;',
        'probe, scan or test the vulnerability of any system or network, or bypass any authentication, authorization or rate-limiting mechanism;',
        'register accounts in bulk by automated means, or send requests in a way that disrupts normal operation of the service;',
        'distribute malware, or use the service for phishing, fraud or impersonation;',
        'break applicable law, or infringe anyone else’s rights;',
        'use the service in a way that breaches these terms or circumvents a technical restriction.'
      ]
    },
    {
      id: 'third-party',
      title: '5. Third-party sign-in and member sites',
      body: [
        'You may choose to sign in with Google or GitHub. When you do, that provider’s own terms apply to you as well.',
        'When you authorize a member site to sign you in with your NextMoe account, that site receives the profile listed on the consent screen and handles it under its own terms and privacy policy. We are not responsible for content published on a member site.',
        'For how we handle your NextMoe account information, see the <a href="/en/privacy">Privacy Policy</a>.'
      ]
    },
    {
      id: 'availability',
      title: '6. Availability and disclaimer',
      body: [
        'The service is provided on an "as-is" and "as-available" basis, without warranties of any kind, express or implied, including any implied warranty of merchantability, fitness for a particular purpose or non-infringement.',
        'The platform is under development, so features may change, pause or be withdrawn. We do not guarantee that the service will be uninterrupted or error-free, or that data will remain available indefinitely — keep your own copies of anything important to you.',
        'To the maximum extent permitted by applicable law, we are not liable for indirect, incidental, special or consequential losses arising from your use of, or inability to use, the service.'
      ]
    },
    {
      id: 'termination',
      title: '7. Suspension and termination',
      body: [
        'You may stop using the service at any time, or ask us to delete your account as described in the Privacy Policy.',
        'We may suspend or terminate an account that seriously breaches these terms, harms other users, or threatens the security of the service. Unless security or the law prevents it, we will try to explain why, before or after the fact.'
      ]
    },
    {
      id: 'changes',
      title: '8. Changes to these terms',
      body: [
        'We may revise these terms. The current version is published on this page and the effective date at the top is updated with it. For significant changes we will give notice separately. Continuing to use the service after a change takes effect means you accept the new terms.'
      ]
    },
    {
      id: 'contact',
      title: '9. Contact',
      body: [`For any question about these terms, contact ${mail}.`]
    }
  ]
}

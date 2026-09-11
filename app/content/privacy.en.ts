import type { LegalDoc } from '#shared/types/legal'
import { GOOGLE_USER_DATA_POLICY, SUPPORT_EMAIL } from '~/constants/site'

const mail = `<a href="mailto:${SUPPORT_EMAIL}">${SUPPORT_EMAIL}</a>`

export const privacyEn: LegalDoc = {
  title: 'Privacy Policy',
  summary:
    'This policy explains how the NextMoe account service (account.nextmoe.com) and this brand portal (www.nextmoe.com) collect, use, share and protect your personal information.',
  sections: [
    {
      id: 'about',
      title: '1. About this policy',
      body: [
        'This site and the NextMoe account service are operated by NextMoe ("we", "us"). NextMoe is the platform brand behind a family of Chinese-language Galgame community sites.',
        'This policy covers the NextMoe account service (account.nextmoe.com) and this brand portal (www.nextmoe.com). Beyond signing you in with a NextMoe account, each member site handles the data you create on that site under its own privacy policy.',
        'By using a NextMoe account you confirm that you have read and understood this policy.'
      ]
    },
    {
      id: 'collect',
      title: '2. What we collect',
      body: ['We collect only what the account service needs in order to work.'],
      list: [
        '<strong>Information you give us</strong>: email address, username, password and avatar. Passwords are stored only as hashes — we cannot recover your plaintext password.',
        '<strong>Information returned by a third-party sign-in</strong>: if you choose to sign in with Google or GitHub, we receive a basic profile from them. See section 3.',
        '<strong>Session information</strong>: session cookies and tokens that keep you signed in.',
        '<strong>Basic security logs</strong>: the IP address, timestamp and browser user agent of sign-in and authorization requests, used for troubleshooting and to prevent abuse and account takeover.'
      ]
    },
    {
      id: 'federation',
      title: '3. Signing in with Google or GitHub',
      body: [
        'A NextMoe account can be used together with Google or GitHub sign-in. The exchange uses OpenID Connect / OAuth: you authenticate on the provider’s own page, and we never see or receive your password for that provider.'
      ],
      list: [
        'The information we receive is limited to a basic profile: <strong>a unique identifier, your email address, your display name and your avatar</strong>.',
        'We use it to create or match your NextMoe account and to recognise you on your next sign-in.',
        'We <strong>do not store</strong> the provider’s access tokens or refresh tokens. They are discarded once authentication completes.',
        'We do not read or write any other data in your Google or GitHub account on your behalf.',
        'You can revoke NextMoe’s access at any time from your Google or GitHub account settings.'
      ]
    },
    {
      id: 'google-limited-use',
      title: '4. Google user data and Limited Use',
      body: [
        `NextMoe’s use and transfer of information received from Google APIs adheres to the <a href="${GOOGLE_USER_DATA_POLICY}" target="_blank" rel="noopener noreferrer">Google API Services User Data Policy</a>, including the Limited Use requirements.`,
        'Specifically:'
      ],
      list: [
        'We use the account information received from Google <strong>solely</strong> for authentication and for creating your NextMoe account, in order to provide the sign-in feature you asked for.',
        'We <strong>do not sell</strong> any data received from Google.',
        'We <strong>do not</strong> use it for advertising, ad targeting or profiling.',
        'We <strong>do not</strong> use it to train generalised artificial intelligence or machine learning models.',
        'We <strong>do not</strong> transfer it to third parties except as necessary to provide or improve that sign-in feature, with your explicit consent, for security purposes, or where required by law.',
        'We delete it as described in section 8 once it is no longer needed.'
      ]
    },
    {
      id: 'use',
      title: '5. How we use this information',
      list: [
        'To create, maintain and protect your NextMoe account.',
        'To complete sign-in and identity confirmation for a member site when you authorize it.',
        'To send necessary account email, such as address verification, password resets and security notices.',
        'To troubleshoot, and to prevent abuse, spam registration and unauthorized access.',
        'To meet applicable legal obligations.'
      ],
      body: [
        'We do not run advertising against your personal information, and we do not sell your profile to anyone.'
      ]
    },
    {
      id: 'sharing',
      title: '6. Sharing with member sites',
      body: [
        'NextMoe accounts are used to sign in to member sites (kungal.com, moyu.moe, letmoe.com and other services operated by NextMoe). Sharing only happens when you authorize it:',
        'The consent screen lists exactly what the site will receive before you approve it, and you can decline. Once you approve, that site handles the information under its own privacy policy.'
      ],
      list: [
        'When you choose to sign in to a member site with your NextMoe account, we provide that site with the profile shown on the consent screen — typically your <strong>username, email address and avatar</strong>.',
        'We never give a member site your password.',
        'Apart from that authorized sharing, and the infrastructure providers needed to run the service (such as server hosting, email delivery and content delivery), we do not disclose your personal information to third parties.',
        'We do not sell your personal data to anyone.',
        'We may have to disclose information where required by law, regulation or valid legal process.'
      ]
    },
    {
      id: 'cookies',
      title: '7. Cookies',
      body: [
        'We use only the cookies required to keep you signed in and to keep the service secure — for example a session identifier and a CSRF token.',
        'We do not serve third-party advertising cookies and we do not use cross-site ad tracking. Clearing these cookies signs you out.'
      ]
    },
    {
      id: 'retention',
      title: '8. Retention and deletion',
      list: [
        'Account data is kept for as long as your account exists.',
        'Basic security logs are kept on a rolling window for troubleshooting and abuse prevention, then deleted.',
        `You can request deletion of your account at any time by emailing ${mail}. We delete the account data once we have verified your identity.`,
        'Deleting a NextMoe account does not automatically delete content you posted on a member site — please raise that with the site concerned.',
        'A small amount of record keeping may survive deletion where it is necessary to meet a legal obligation or resolve a dispute.'
      ]
    },
    {
      id: 'security',
      title: '9. Security',
      list: [
        'Passwords are stored using a standard one-way hashing algorithm. We do not keep plaintext passwords.',
        'All sites and APIs are served over HTTPS/TLS.',
        'Access to account data is limited to what operating the service requires.'
      ],
      body: [
        'No system can be guaranteed absolutely secure. If you notice anything unusual about your account, change your password and contact us straight away.'
      ]
    },
    {
      id: 'children',
      title: '10. Children',
      body: [
        'The NextMoe account service is not directed at children under 13. If we learn that we have collected personal information from a child under 13, we will delete it promptly.'
      ]
    },
    {
      id: 'rights',
      title: '11. Your choices',
      body: [
        `You can view and update your account profile, and you can ask us to export or delete your account data. Contact us at ${mail} and we will act on the request once we have verified your identity.`
      ]
    },
    {
      id: 'changes',
      title: '12. Changes to this policy',
      body: [
        'We may update this policy. The current version is always published on this page and the effective date at the top is updated with it. For significant changes we will also notify you by account email or by a notice on the service.'
      ]
    }
  ]
}

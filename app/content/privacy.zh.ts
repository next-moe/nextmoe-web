import type { LegalDoc } from '#shared/types/legal'
import { GOOGLE_USER_DATA_POLICY, SUPPORT_EMAIL } from '~/constants/site'

const mail = `<a href="mailto:${SUPPORT_EMAIL}">${SUPPORT_EMAIL}</a>`

export const privacyZh: LegalDoc = {
  title: '隐私政策',
  summary:
    '本政策说明 NextMoe 账号服务（account.nextmoe.com）与本品牌门户（www.nextmoe.com）如何收集、使用、共享和保护你的个人信息。',
  sections: [
    {
      id: 'about',
      title: '1. 关于本政策',
      body: [
        '本站点与 NextMoe 账号服务由 NextMoe（下称「我们」）运营。NextMoe·未萌 是一组中文 Galgame 社区站点背后的平台品牌。',
        '本政策适用于 NextMoe 账号服务（account.nextmoe.com）以及本品牌门户（www.nextmoe.com）。各成员站点在使用 NextMoe 账号登录之外，还会按其自身的隐私政策处理你在该站点上产生的数据。',
        '使用 NextMoe 账号即表示你已阅读并理解本政策。'
      ]
    },
    {
      id: 'collect',
      title: '2. 我们收集哪些信息',
      body: ['我们只收集运行账号服务所必需的信息。'],
      list: [
        '<strong>你主动提供的信息</strong>：电子邮箱地址、用户名、密码、头像。密码只以哈希形式保存，我们无法还原出你的明文密码。',
        '<strong>第三方登录返回的信息</strong>：当你选择使用 Google 或 GitHub 登录时，我们会收到对方返回的基础资料，详见第 3 节。',
        '<strong>会话信息</strong>：用于维持登录状态的会话 Cookie 与令牌。',
        '<strong>基础安全日志</strong>：登录与授权请求的 IP 地址、时间戳和浏览器 User-Agent，用于排查故障、防止滥用与账号盗用。'
      ]
    },
    {
      id: 'federation',
      title: '3. 使用 Google 或 GitHub 登录',
      body: [
        'NextMoe 账号支持通过 Google 或 GitHub 登录。这一过程基于 OpenID Connect / OAuth：你在 Google 或 GitHub 的页面上完成身份验证，我们不会看到、也不会收到你在这些平台上的密码。'
      ],
      list: [
        '我们从对方接收的信息仅限于基础个人资料：<strong>唯一标识符、电子邮箱地址、显示名称和头像</strong>。',
        '我们使用这些信息来创建或匹配你的 NextMoe 账号，并在你下次登录时识别你。',
        '我们<strong>不会保存</strong>上游服务商签发的访问令牌（access token）或刷新令牌；身份验证完成后即丢弃。',
        '我们不会代表你去读取或写入你在 Google 或 GitHub 上的其他数据。',
        '你可以随时在 Google 或 GitHub 的账号设置中解除对 NextMoe 的授权。'
      ]
    },
    {
      id: 'google-limited-use',
      title: '4. Google 用户数据与有限使用（Limited Use）',
      body: [
        `NextMoe 对从 Google API 接收到的信息的使用与转让，遵守 <a href="${GOOGLE_USER_DATA_POLICY}" target="_blank" rel="noopener noreferrer">Google API 服务用户数据政策</a>，包括其中的「有限使用」（Limited Use）要求。`,
        '具体来说：'
      ],
      list: [
        '我们<strong>仅将</strong>从 Google 获得的账号信息用于身份验证与创建 NextMoe 账号，以及为你提供你所请求的登录功能。',
        '我们<strong>不会出售</strong>从 Google 获得的任何数据。',
        '我们<strong>不会</strong>将这些数据用于广告投放、广告定向或用户画像。',
        '我们<strong>不会</strong>将这些数据用于训练通用的人工智能或机器学习模型。',
        '除非为提供或改进上述登录功能所必需、或获得你的明确同意、或出于安全目的、或法律要求，我们<strong>不会</strong>向任何第三方转让这些数据。',
        '不再需要时，我们会按第 8 节所述删除这些数据。'
      ]
    },
    {
      id: 'use',
      title: '5. 我们如何使用这些信息',
      list: [
        '创建、维护和保护你的 NextMoe 账号。',
        '在你授权时，为成员站点完成登录与身份确认。',
        '发送与账号相关的必要邮件，例如邮箱验证、密码重置与安全提醒。',
        '排查故障、防止滥用、垃圾注册与未经授权的访问。',
        '履行适用的法律义务。'
      ],
      body: ['我们不会基于你的个人信息进行广告投放，也不会把你的资料出售给任何第三方。']
    },
    {
      id: 'sharing',
      title: '6. 与成员站点的共享',
      body: [
        'NextMoe 账号用于登录各成员站点（kungal.com、moyu.moe、letmoe.com，以及其他由 NextMoe 运营的服务）。共享只在你主动授权时发生：',
        '在你点击同意之前，授权页面会明确列出该站点将要获得的信息；你可以拒绝授权。授权完成后，该站点会按其自身的隐私政策处理这些信息。'
      ],
      list: [
        '当你在某个成员站点选择用 NextMoe 账号登录时，我们会向该站点提供授权页面上列出的资料，通常是<strong>用户名、电子邮箱地址和头像</strong>。',
        '我们不会向成员站点提供你的密码。',
        '除上述授权共享，以及为运行服务所必需的基础设施服务商（例如服务器托管、邮件发送、内容分发）之外，我们不会向第三方披露你的个人信息。',
        '我们不会把你的个人数据出售给任何人。',
        '如果法律、法规或有效的法律程序要求，我们可能需要披露相关信息。'
      ]
    },
    {
      id: 'cookies',
      title: '7. Cookie',
      body: [
        '我们只使用维持登录状态与保障安全所必需的 Cookie，例如会话标识和防跨站请求伪造（CSRF）令牌。',
        '我们不投放第三方广告 Cookie，也不使用跨站广告追踪。清除这些 Cookie 会让你退出登录。'
      ]
    },
    {
      id: 'retention',
      title: '8. 数据保留与删除',
      list: [
        '账号资料在你的账号存续期间保留。',
        '基础安全日志按滚动窗口保留，仅用于排查故障与防止滥用，到期后删除。',
        `你可以随时发送邮件至 ${mail} 申请删除账号。我们会在核实你的身份后删除账号资料。`,
        '删除 NextMoe 账号不会自动删除你在各成员站点上发布的内容；这类内容请向对应站点提出请求。',
        '为满足法律义务或处理争议所必需的少量记录，可能在账号删除后仍保留一段时间。'
      ]
    },
    {
      id: 'security',
      title: '9. 安全',
      list: [
        '密码使用业界通行的单向哈希算法存储，我们不保存明文密码。',
        '所有站点与接口均通过 HTTPS/TLS 传输。',
        '对账号数据的访问限定在运维所必需的范围内。'
      ],
      body: [
        '没有任何系统能保证绝对安全。如果你发现账号异常，请立即修改密码并联系我们。'
      ]
    },
    {
      id: 'children',
      title: '10. 未成年人',
      body: [
        'NextMoe 账号服务不面向 13 岁以下儿童。如果我们发现自己在不知情的情况下收集了 13 岁以下儿童的个人信息，会尽快删除。'
      ]
    },
    {
      id: 'rights',
      title: '11. 你的权利',
      body: [
        `你可以查看和更新自己的账号资料，也可以要求导出或删除账号数据。请通过 ${mail} 与我们联系，我们会在核实身份后处理你的请求。`
      ]
    },
    {
      id: 'changes',
      title: '12. 本政策的变更',
      body: [
        '我们可能会更新本政策。更新后的版本会发布在本页面，并同步更新顶部的生效日期。若涉及重大变更，我们会通过账号邮箱或站内公告另行告知。'
      ]
    }
  ]
}

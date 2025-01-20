import {defineField, defineType} from 'sanity'
import {
  RiBehanceFill as BehanceIcon,
  RiCodepenFill as CodepenIcon,
  RiDiscordFill as DiscordIcon,
  RiDribbbleFill as DribbbleIcon,
  RiFacebookFill as FacebookIcon,
  RiFigmaFill as FigmaIcon,
  RiGithubFill as GitHubIcon,
  RiInstagramFill as InstagramIcon,
  RiLinkedinFill as LinkedInIcon,
  RiMediumFill as MediumIcon,
  RiPinterestFill as PinterestIcon,
  RiRedditFill as RedditIcon,
  RiTwitterXFill as XIcon,
  RiSnapchatFill as SnapchatIcon,
  RiTelegramFill as TelegramIcon,
  RiTiktokFill as TikTokIcon,
  RiTumblrFill as TumblrIcon,
  RiTwitchFill as TwitchIcon,
  RiVimeoFill as VimeoIcon,
  RiWechat2Fill as WeChatIcon,
  RiWhatsappFill as WhatsAppIcon,
  RiYoutubeFill as YouTubeIcon,
  RiStackOverflowFill as StackOverflowIcon,
} from '@remixicon/react'

// A sorted list of popular social media platforms and their corresponding lucide-react icons
const socialMediaOptions = [
  {title: 'Behance', value: 'behance', icon: BehanceIcon},
  {title: 'Codepen', value: 'codepen', icon: CodepenIcon},
  {title: 'Discord', value: 'discord', icon: DiscordIcon},
  {title: 'Dribbble', value: 'dribbble', icon: DribbbleIcon},
  {title: 'Facebook', value: 'facebook', icon: FacebookIcon},
  {title: 'Figma', value: 'figma', icon: FigmaIcon},
  {title: 'GitHub', value: 'github', icon: GitHubIcon},
  {title: 'Instagram', value: 'instagram', icon: InstagramIcon},
  {title: 'LinkedIn', value: 'linkedin', icon: LinkedInIcon},
  {title: 'Medium', value: 'medium', icon: MediumIcon},
  {title: 'Pinterest', value: 'pinterest', icon: PinterestIcon},
  {title: 'Reddit', value: 'reddit', icon: RedditIcon},
  {title: 'Snapchat', value: 'snapchat', icon: SnapchatIcon},
  {title: 'Stack Overflow', value: 'stackoverflow', icon: StackOverflowIcon},
  {title: 'Telegram', value: 'telegram', icon: TelegramIcon},
  {title: 'TikTok', value: 'tiktok', icon: TikTokIcon},
  {title: 'Tumblr', value: 'tumblr', icon: TumblrIcon},
  {title: 'Twitch', value: 'twitch', icon: TwitchIcon},
  {title: 'Vimeo', value: 'vimeo', icon: VimeoIcon},
  {title: 'WeChat', value: 'wechat', icon: WeChatIcon},
  {title: 'WhatsApp', value: 'whatsapp', icon: WhatsAppIcon},
  {title: 'X', value: 'x', icon: XIcon},
  {title: 'YouTube', value: 'youtube', icon: YouTubeIcon},
]

export const profile = defineType({
  name: 'profile',
  type: 'object',
  title: 'Profile',
  fields: [
    defineField({
      name: 'platform',
      type: 'string',
      title: 'Platform',
      options: {
        list: socialMediaOptions.map((platform) => ({
          title: platform.title,
          value: platform.value,
        })),
      },
    }),
    defineField({
      name: 'url',
      type: 'url',
      title: 'Profile URL',
      description: 'The full URL of your profile (e.g., https://instagram.com/username)',
    }),
    defineField({
      name: 'handle',
      type: 'string',
      title: 'Handle',
      description: 'Your username or handle on this platform (without @)',
    }),
    defineField({
      name: 'notes',
      type: 'text',
      title: 'Additional Notes',
      description: 'Any additional information about this account (optional)',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'platform',
      subtitle: 'handle',
      media: 'platform',
    },
    prepare(selection) {
      const {title, subtitle} = selection
      const platform = socialMediaOptions.find((option) => option.value === title)
      const Icon = platform?.icon

      return {
        title: platform?.title || 'Unknown Platform',
        subtitle: subtitle ? `@${subtitle}` : 'No handle',
        media: Icon ? () => <Icon /> : undefined,
      }
    },
  },
})

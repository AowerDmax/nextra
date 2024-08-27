import Link from 'next/link'
import { SocialIcon } from 'react-social-icons'

const menuItems: {
  heading: string
  items: { name: string; href: string }[]
}[] = [
  {
    heading: 'About',
    items: [
      { name: 'Contact me', href: '/authors/aower' },
    ],
  },
  {
    heading: 'Service',
    items: [
      {
        name: 'ChatGPT',
        href: 'https://chat.professoryin.online/',
      },
      {
        name: 'NewApi',
        href: 'https://newapi.aowerleee.online/',
      },
      {
        name: 'Status',
        href: 'https://status.aowerleee.online/',
      },
    ],
  },
  {
    heading: 'Leetcode',
    items: [
      {
        name: '两数之和',
        href: 'https://leetcode.aowerleee.online/leetcode/folder_1/leetcode_two_sum',
      },
      {
        name: '两数相加',
        href: 'https://leetcode.aowerleee.online/leetcode/folder_1/leetcode_add_two_numbers',
      },
      {
        name: '整数反转',
        href: 'https://leetcode.aowerleee.online/leetcode/folder_1/leetcode_reverse_integer',
      },
    ],
  },
  {
    heading: 'NextJs',
    items: [
      {
        name: 'Docunment',
        href: '/nextjs',
      }
    ],
  },
  {
    heading: 'Interview',
    items: [
      {
        name: 'Tomcat',
        href: 'https://leetcode.aowerleee.online/interview/servers/9b4fd03b398cf1c49a417b7bc0a55df81ceba32e05406139f862bd13671b3051',
      },
      {
        name: 'Redis',
        href: 'https://leetcode.aowerleee.online/interview/database/1cbff28319f09a2766bcf76e1dc0b8b65b5f4141b56e46bacf92cdb8e3a5029d',
      }
    ],
  },
  {
    heading: 'Blog',
    items: [
      { name: 'Blog', href: '/blog' }
    ],
  },
]

const FooterMenu = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-6 text-base gap-y-8 gap-x-2">
        {menuItems.map((menu) => (
          <div key={menu.heading}>
            <p className="pb-2 font-mono font-bold text-primary">{menu.heading}</p>
            <ul className="flex flex-col gap-2">
              {menu.items.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm leading-tight hover:text-primary/80">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="flex items-center justify-between md:col-span-6">
          <div className="font-sans text-sm">© {new Date().getFullYear()} aowerleee</div>
          <div className="flex ml-auto">
            <SocialIcon
              url="https://github.com/AowerDmax/nextra"
              className="absolute inset-0 w-full h-full transform scale-100 transition-transform opacity-100 hover:scale-90"
              style={{ height: 40, width: 40 }}
              bgColor="background"
              fgColor="#9B9B9B80"
            />
            <SocialIcon
              url="mailto:qq1329210652@gmail.com"
              className="absolute inset-0 w-full h-full transform scale-100 transition-transform opacity-100 hover:scale-90"
              style={{ height: 40, width: 40 }}
              bgColor="background"
              fgColor="#9B9B9B80"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FooterMenu

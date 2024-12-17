import { usePage } from '@/utils/hooks'

export const comment = [
  {
    id: '1',
    parentId: null,
    address: '来自上海',
    content:
      '缘生缘灭，缘起缘落，我在看别人的故事，别人何尝不是在看我的故事?别人在演绎人生，我又何尝不是在这场戏里?谁的眼神沧桑了谁?我的眼神，只是沧桑了自己[喝酒]',
    likes: 2,
    ilike: true,
    contentImg: 'https://pic3.zhimg.com/80/v2-01f317b3fed2c0788e59d3ceb4e3d0a2_720w.webp',
    createTime: 1709993793000,
    user: {
      uid: 0,
      username: '落🤍尘',
      avatar: 'https://static.juzicon.com/avatars/avatar-200602130320-HMR2.jpeg?x-oss-process=image/resize,w_100',
      level: 6,
      homeLink: '/1'
    }
  },
  {
    id: '2',
    parentId: null,
    address: '来自苏州',
    content: '知道在学校为什么感觉这么困吗？[大笑2]因为学校，是梦开始的地方。[脱单doge]',
    contentImg: 'https://pic1.zhimg.com/80/v2-d80deceb2ae026b3713994c2fa8061ac_720w.webp',
    likes: 11,
    ilike: false,
    createTime: 1710249193012,
    user: {
      uid: '0',
      username: '悟二空',
      avatar: 'https://static.juzicon.com/user/avatar-bf22291e-ea5c-4280-850d-88bc288fcf5d-220408002256-ZBQQ.jpeg',
      level: 1,
      homeLink: '/2'
    },
    reply: {
      total: 2,
      list: [
        {
          id: '21',
          parentId: '2',
          address: '来自重庆',
          content: '说的对[大笑2]，所以，综上所述，上课睡觉不怪我呀💤',
          likes: 3,
          ilike: false,
          createTime: 1710163013,
          user: {
            uid: 0,
            username: '别扰我清梦*ぁ',
            avatar:
              'https://static.juzicon.com/user/avatar-8b6206c1-b28f-4636-8952-d8d9edec975d-191001105631-MDTM.jpg?x-oss-process=image/resize,m_fill,w_100,h_100',
            level: 5,
            homeLink: '/21'
          }
        },
        {
          id: '22',
          parentId: '2',
          content:
            '回复 <a style="color: #008Ac5;" href="/lovbe" target="_blank">@别扰我清梦*ぁ</a>: 看完打了一个哈切。。。会传染。。。[委屈]',
          address: '来自广州',
          likes: 9,
          ilike: false,
          createTime: 1710240393012,
          user: {
            uid: '0',
            username: 'Blizzard',
            avatar:
              'https://static.juzicon.com/user/avatar-3cb86a0c-08e7-4305-9ac6-34e0cf4937cc-180320123405-BCV6.jpg?x-oss-process=image/resize,m_fill,w_100,h_100',
            level: 3,
            homeLink: '/22'
          }
        }
      ]
    }
  },
  {
    id: '3',
    parentId: null,
    uid: '5',
    address: '来自北京',
    content: '人的一切痛苦，本质上都是对自己的无能的愤怒。',
    likes: 34116,
    createTime: '2023-04-27 09:00',
    user: {
      username: '半个句号',
      avatar:
        'https://static.juzicon.com/user/avatar-0d70406e-5d4a-4107-a689-652ffd063f99-200425180341-1QK6.jpg?x-oss-process=image/resize,m_fill,w_100,h_1000',
      level: 5,
      homeLink: '/3'
    },
    reply: {
      total: 2,
      list: [
        {
          id: '31',
          uid: '6',
          parentId: '3',
          address: '来自成都',
          content: '人生就像愤怒的小鸟，当你失败时，总有几只猪在笑。',
          likes: 7,
          createTime: '2023-04-28 09:00',
          user: {
            username: '陆呈洋',
            avatar:
              'https://static.juzicon.com/avatars/avatar-20220310090547-fxvx.jpeg?x-oss-process=image/resize,m_fill,w_100,h_100',
            level: 4,
            homeLink: '/31'
          }
        },
        {
          id: '32',
          parentId: '3',
          uid: '7',
          address: '来自杭州',
          content: '深思熟虑的结果往往就是说不清楚。',
          likes: 3,
          createTime: '2023-04-28 10:00',
          user: {
            username: '哑谜',
            avatar:
              'https://static.juzicon.com/avatars/avatar-190919180152-2VDE.jpg?x-oss-process=image/resize,m_fill,w_100,h_100',
            level: 3,
            homeLink: '/32'
          }
        }
      ]
    }
  },
  {
    id: '4',
    parentId: null,
    uid: '14',
    address: '来自杭州',
    content:
      '鱼说：我时时刻刻睁开眼睛，就是为了能让你永远在我眼中！<br>水说：我时时刻刻流淌不息，就是为了能永远把你拥抱！！<br>锅说：都快熟了，还这么贫。',
    likes: 13,
    ilike: false,
    createTime: 1711249393012,
    user: {
      username: 'Blizzard1',
      avatar:
        'https://static.juzicon.com/user/avatar-3cb86a0c-08e7-4305-9ac6-34e0cf4937cc-180320123405-BCV6.jpg?x-oss-process=image/resize,m_fill,w_100,h_100',
      level: 3,
      homeLink: '/4'
    },
    reply: {
      total: 13,
      list: [
        {
          id: '41',
          parentId: '4',
          uid: '41',
          address: '来自北京',
          content: '1鱼对水说，你看不到我流泪，因为我在水中。水对鱼说，我看到你悲伤，因为你在我心中。[呲牙]',
          likes: 36,
          createTime: 1710249313012,
          user: {
            username: '过往~',
            avatar:
              'https://static.juzicon.com/avatars/avatar-20210308112705-zqf0.jpeg?x-oss-process=image/resize,m_fill,w_100,h_100',
            level: 4,
            homeLink: '/41'
          }
        },
        {
          id: '42',
          parentId: '4',
          uid: '42',
          address: '来自杭州',
          content: '2约束条件变了，原来的收益，一下子都变为成本。生命如果架在锅上，成本自然也就很高了[tv_微笑]',
          likes: 16,
          createTime: 1714249393012,
          user: {
            username: 'Blizzard1',
            avatar:
              'https://static.juzicon.com/user/avatar-3cb86a0c-08e7-4305-9ac6-34e0cf4937cc-180320123405-BCV6.jpg?x-oss-process=image/resize,m_fill,w_100,h_100',
            level: 3,
            homeLink: '/42'
          }
        },
        {
          id: '43',
          parentId: '4',
          uid: '43',
          address: '来自杭州',
          content: '3约束条件变了，原来的收益，一下子都变为成本。生命如果架在锅上，成本自然也就很高了[tv_微笑]',
          likes: 16,
          createTime: 1700249393012,
          user: {
            username: 'Blizzard1',
            avatar:
              'https://static.juzicon.com/user/avatar-3cb86a0c-08e7-4305-9ac6-34e0cf4937cc-180320123405-BCV6.jpg?x-oss-process=image/resize,m_fill,w_100,h_100',
            level: 3,
            homeLink: '/42'
          }
        },
        {
          id: '44',
          parentId: '4',
          uid: '44',
          address: '来自杭州',
          content: '4约束条件变了，原来的收益，一下子都变为成本。生命如果架在锅上，成本自然也就很高了[tv_微笑]',
          likes: 16,
          createTime: 1610249393012,
          user: {
            username: 'Blizzard1',
            avatar:
              'https://static.juzicon.com/user/avatar-3cb86a0c-08e7-4305-9ac6-34e0cf4937cc-180320123405-BCV6.jpg?x-oss-process=image/resize,m_fill,w_100,h_100',
            level: 3,
            homeLink: '/42'
          }
        },
        {
          id: '45',
          parentId: '4',
          uid: '45',
          address: '来自杭州',
          content: '5约束条件变了，原来的收益，一下子都变为成本。生命如果架在锅上，成本自然也就很高了[tv_微笑]',
          likes: 16,
          createTime: 1710249393112,
          user: {
            username: 'Blizzard1',
            avatar:
              'https://static.juzicon.com/user/avatar-3cb86a0c-08e7-4305-9ac6-34e0cf4937cc-180320123405-BCV6.jpg?x-oss-process=image/resize,m_fill,w_100,h_100',
            level: 3,
            homeLink: '/42'
          }
        },
        {
          id: '46',
          parentId: '4',
          uid: '46',
          address: '来自杭州',
          content: '6约束条件变了，原来的收益，一下子都变为成本。生命如果架在锅上，成本自然也就很高了[tv_微笑]',
          likes: 16,
          createTime: 1710249313012,
          user: {
            username: 'Blizzard1',
            avatar:
              'https://static.juzicon.com/user/avatar-3cb86a0c-08e7-4305-9ac6-34e0cf4937cc-180320123405-BCV6.jpg?x-oss-process=image/resize,m_fill,w_100,h_100',
            level: 3,
            homeLink: '/42'
          }
        },
        {
          id: '47',
          parentId: '4',
          uid: '47',
          address: '来自杭州',
          content: '7约束条件变了，原来的收益，一下子都变为成本。生命如果架在锅上，成本自然也就很高了[tv_微笑]',
          likes: 16,
          createTime: 1710299393012,
          user: {
            username: 'Blizzard1',
            avatar:
              'https://static.juzicon.com/user/avatar-3cb86a0c-08e7-4305-9ac6-34e0cf4937cc-180320123405-BCV6.jpg?x-oss-process=image/resize,m_fill,w_100,h_100',
            level: 3,
            homeLink: '/42'
          }
        },
        {
          id: '48',
          parentId: '4',
          uid: '48',
          address: '来自杭州',
          content: '8约束条件变了，原来的收益，一下子都变为成本。生命如果架在锅上，成本自然也就很高了[tv_微笑]',
          likes: 16,
          createTime: 1710249093012,
          user: {
            username: 'Blizzard1',
            avatar:
              'https://static.juzicon.com/user/avatar-3cb86a0c-08e7-4305-9ac6-34e0cf4937cc-180320123405-BCV6.jpg?x-oss-process=image/resize,m_fill,w_100,h_100',
            level: 3,
            homeLink: '/42'
          }
        },
        {
          id: '49',
          parentId: '4',
          uid: '49',
          address: '来自杭州',
          content: '9约束条件变了，原来的收益，一下子都变为成本。生命如果架在锅上，成本自然也就很高了[tv_微笑]',
          likes: 16,
          createTime: 1710249193012,
          user: {
            username: 'Blizzard1',
            avatar:
              'https://static.juzicon.com/user/avatar-3cb86a0c-08e7-4305-9ac6-34e0cf4937cc-180320123405-BCV6.jpg?x-oss-process=image/resize,m_fill,w_100,h_100',
            level: 3,
            homeLink: '/42'
          }
        },
        {
          id: '50',
          parentId: '4',
          uid: '50',
          address: '来自杭州',
          content: '10约束条件变了，原来的收益，一下子都变为成本。生命如果架在锅上，成本自然也就很高了[tv_微笑]',
          likes: 16,
          createTime: 1710249313012,
          user: {
            username: 'Blizzard1',
            avatar:
              'https://static.juzicon.com/user/avatar-3cb86a0c-08e7-4305-9ac6-34e0cf4937cc-180320123405-BCV6.jpg?x-oss-process=image/resize,m_fill,w_100,h_100',
            level: 3,
            homeLink: '/42'
          }
        },
        {
          id: '51',
          parentId: '4',
          uid: '51',
          address: '来自杭州',
          content: '11约束条件变了，原来的收益，一下子都变为成本。生命如果架在锅上，成本自然也就很高了[tv_微笑]',
          likes: 16,
          createTime: 1710249323012,
          user: {
            username: 'Blizzard1',
            avatar:
              'https://static.juzicon.com/user/avatar-3cb86a0c-08e7-4305-9ac6-34e0cf4937cc-180320123405-BCV6.jpg?x-oss-process=image/resize,m_fill,w_100,h_100',
            level: 3,
            homeLink: '/42'
          }
        },
        {
          id: '52',
          parentId: '4',
          uid: '52',
          address: '来自杭州',
          content: '12约束条件变了，原来的收益，一下子都变为成本。生命如果架在锅上，成本自然也就很高了[tv_微笑]',
          likes: 16,
          createTime: 1710241793012,
          user: {
            username: 'Blizzard1',
            avatar:
              'https://static.juzicon.com/user/avatar-3cb86a0c-08e7-4305-9ac6-34e0cf4937cc-180320123405-BCV6.jpg?x-oss-process=image/resize,m_fill,w_100,h_100',
            level: 3,
            homeLink: '/42'
          }
        },
        {
          id: '53',
          parentId: '4',
          uid: '53',
          address: '来自杭州',
          content: '13约束条件变了，原来的收益，一下子都变为成本。生命如果架在锅上，成本自然也就很高了[tv_微笑]',
          likes: 16,
          createTime: 1710242893012,
          user: {
            username: 'Blizzard1',
            avatar:
              'https://static.juzicon.com/user/avatar-3cb86a0c-08e7-4305-9ac6-34e0cf4937cc-180320123405-BCV6.jpg?x-oss-process=image/resize,m_fill,w_100,h_100',
            level: 3,
            homeLink: '/42'
          }
        }
      ]
    }
  },

  {
    id: '5',
    parentId: null,
    uid: '15',
    address: '来自杭州',
    content:
      '鱼说：我时时刻刻睁开眼睛，就是为了能让你永远在我眼中！<br>水说：我时时刻刻流淌不息，就是为了能永远把你拥抱！！<br>锅说：都快熟了，还这么贫。',
    likes: 13,
    createTime: 1710249317012,
    user: {
      username: 'Blizzard1',
      avatar:
        'https://static.juzicon.com/user/avatar-3cb86a0c-08e7-4305-9ac6-34e0cf4937cc-180320123405-BCV6.jpg?x-oss-process=image/resize,m_fill,w_100,h_100',
      level: 3,
      homeLink: '/5'
    }
  },
  {
    id: '6',
    parentId: null,
    uid: '16',
    address: '来自杭州',
    content:
      '鱼说：我时时刻刻睁开眼睛，就是为了能让你永远在我眼中！<br>水说：我时时刻刻流淌不息，就是为了能永远把你拥抱！！<br>锅说：都快熟了，还这么贫。',
    likes: 13,
    createTime: 1710242893012,
    user: {
      username: 'Blizzard1',
      avatar:
        'https://static.juzicon.com/user/avatar-3cb86a0c-08e7-4305-9ac6-34e0cf4937cc-180320123405-BCV6.jpg?x-oss-process=image/resize,m_fill,w_100,h_100',
      level: 3,
      homeLink: '/6'
    }
  }
]

export const commentSize = comment.length
export const getComment = (pageNum, pageSize) => usePage(pageNum, pageSize, comment)

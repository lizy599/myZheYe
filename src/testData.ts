export interface ColumnProps {
  id: number
  title: string
  avatar?: string
  description: string
}
export interface PostProps {
  id: number
  title: string
  content: string
  image?: string
  createAt: string
  columnId: number
}
export const testData: ColumnProps[] = [
  {
    id: 1,
    title: 'test1',
    description: '专栏描述1',
    avatar: 'https://img1.baidu.com/it/u=413643897,2296924942&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1682442000&t=ffadc74c8e09630847fc4729167fa449'
  },
  {
    id: 2,
    title: 'test2',
    description: '专栏描述2',
    avatar: 'https://img1.baidu.com/it/u=3007048469,3759326707&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1682442000&t=df68da4483b076d658ee4f32e8bff30a'
  },
  {
    id: 3,
    title: 'test3',
    description: '专栏描述3',
    avatar: 'https://img1.baidu.com/it/u=413643897,2296924942&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1682442000&t=ffadc74c8e09630847fc4729167fa449'
  },
  {
    id: 4,
    title: 'test4',
    description: '专栏描述4',
    avatar: 'https://img1.baidu.com/it/u=3007048469,3759326707&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1682442000&t=df68da4483b076d658ee4f32e8bff30a'
  },
  {
    id: 5,
    title: 'test5',
    description: '专栏描述5',
    avatar: ''
  }
]
export const testPosts: PostProps[] = [
  {
    id: 1,
    title: '文章1',
    content: '内容1',
    image: 'https://img1.baidu.com/it/u=413643897,2296924942&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1682442000&t=ffadc74c8e09630847fc4729167fa449',
    createAt: '2023-1-1 00:00:00',
    columnId: 1
  },
  {
    id: 2,
    title: '文章2',
    content: '内容2',
    image: 'https://img1.baidu.com/it/u=413643897,2296924942&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1682442000&t=ffadc74c8e09630847fc4729167fa449',
    createAt: '2023-1-2 00:00:00',
    columnId: 2
  },
  {
    id: 3,
    title: '文章3',
    content: '内容3',
    image: 'https://img1.baidu.com/it/u=413643897,2296924942&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1682442000&t=ffadc74c8e09630847fc4729167fa449',
    createAt: '2023-1-3 00:00:00',
    columnId: 3
  },
  {
    id: 4,
    title: '文章4',
    content: '内容4',
    image: 'https://img1.baidu.com/it/u=413643897,2296924942&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1682442000&t=ffadc74c8e09630847fc4729167fa449',
    createAt: '2023-1-4 00:00:00',
    columnId: 4
  }
]

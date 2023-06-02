import { createStore } from 'vuex'
import { createPost, getColumnById, getColumns, getPosts, getUser, login } from '../request/api'
interface UserProps {
  nickName: string
  _id: string
  email: string
  description?: string
  avatar?: ImageProps
  column?: string
  createdAt?: string
}
interface ImageProps {
  _id?: string
  url?: string
  createdAt?: string
}
export interface GlobalDataProps {
  columns: ColumnProps[]
  posts: PostProps[]
  user: UserProps
  loading: boolean
  token: string
}
export interface ColumnProps {
  _id: string
  title: string
  avatar?: ImageProps
  description: string
}
export interface PostProps {
  _id: number
  title: string
  excerpt?: string
  content: string
  image?: ImageProps
  createAt: string
  column: string
}
const store = createStore({
  state: {
    columns: [],
    posts: [],
    user: {
      nickName: '',
      _id: '',
      email: '',
      description: '',
      avatar: {},
      column: '',
      createdAt: ''
    },
    loading: false,
    token: window.localStorage.getItem('ZheYeToken') || ''
  },
  mutations: {
    setLoading(state: GlobalDataProps, status: boolean) {
      state.loading = status
    },
    login(state: GlobalDataProps, data) {
      state.token = data.token
      window.localStorage.setItem('ZheYeToken', data.token)
    },
    loginOut(state) {
      window.localStorage.removeItem('ZheYeToken')
      state.token = ''
    },
    fetchUser(state, data) {
      state.user = data
    },
    createPost(state: GlobalDataProps, newPost: PostProps) {
      if (newPost) {
        state.posts.push(newPost)
      }
    },
    fetchColumns(state: GlobalDataProps, data: { data: { list: ColumnProps[] } }) {
      state.columns = data.list
    },
    fetchColumn(state: GlobalDataProps, data: { data: ColumnProps }) {
      state.columns = [data]
    },
    fetchPosts(state: GlobalDataProps, data: { data: { list: PostProps[] } }) {
      state.posts = data.list
    }
  },
  actions: {
    // 登录
    async fetchLogin(context, data: { email: string; password: string }) {
      const res = await login(data)
      if (res && res.code === 0) {
        context.commit('login', res.data)
        context.dispatch('fetchUser')
      } else {
        alert('请求错误')
      }
    },
    // 获取用户信息
    async fetchUser({ commit }) {
      const res = await getUser()
      if (res && res.code === 0) {
        commit('fetchUser', res.data)
      } else {
        alert('请求错误')
      }
    },
    // 获取所有专栏
    async fetchColumns(context) {
      const res = await getColumns()
      if (res && res.code === 0) {
        context.commit('fetchColumns', res.data)
      } else {
        alert('请求错误')
      }
    },
    // 获取单个专栏
    async fetchColumn({ commit }, id: string) {
      const res = await getColumnById(id)
      if (res && res.code === 0) {
        commit('fetchColumn', res.data)
      } else {
        alert('请求错误')
      }
    },
    // 获取专栏对应文章
    async fetchPosts({ commit }, id: string) {
      const res = await getPosts(id)
      if (res && res.code === 0) {
        commit('fetchPosts', res.data)
      } else {
        alert('请求错误')
      }
    },
    // 创建文章
    async createPost({ commit }, postData) {
      try {
        const res = await createPost(postData)
        if (res && res.code === 0) {
          commit('createPost', res.data)
        }
      } catch (error) {
        console.log('createPost', error)
      }
    }
  },
  getters: {
    getColumnById: (state: GlobalDataProps) => (id: string) => state.columns.find(item => item._id === id),
    getPostsByCid: (state: GlobalDataProps) => (cid: string) => state.posts.filter(item => item.column === cid)
  }
})
export default store

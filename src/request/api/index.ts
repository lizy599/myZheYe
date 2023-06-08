import request from '../request.ts'
// 登录
export function login(data: { email: string; password: string }) {
  return request({
    url: '/user/login',
    method: 'POST',
    data
  })
}
// 注册
export function signup(data: { email: string; password: string; nickName: string }) {
  return request({
    url: '/users',
    method: 'POST',
    data
  })
}
// 用户
export function getUser() {
  return request({
    url: 'user/current',
    headers: {
      Authorization: 'Bearer ' + window.localStorage.getItem('ZheYeToken') || ''
    }
  })
}
// 专栏
export function getColumns(params = { currentPage: 1, pageSize: 10 }) {
  return request({
    url: '/columns',
    method: 'GET',
    params
  })
}
// 单个专栏
export function getColumnById(id: string) {
  return request({
    url: '/columns/' + id,
    method: 'GET'
  })
}
// 文章
export function getPosts(id: string) {
  return request({
    url: `/columns/${id}/posts`,
    method: 'GET'
  })
}
// 单个文章详情
export function getPost(id: string) {
  return request({
    url: '/posts/' + id
  })
}
// 创建文章
export function createPost(data: { title: string; content: string; image: string; column: string; author: string }) {
  return request({
    url: '/posts',
    method: 'POST',
    data
  })
}
// 编辑文章
export function patchPost(data: { _id: string; title: string; content: string; image: string }) {
  return request({
    url: '/posts/' + data._id,
    method: 'PATCH',
    data: { ...data, _id: undefined }
  })
}
// 上传图片
export function upload(data) {
  return request({
    url: '/upload',
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

import Mock from 'mockjs'
Mock.mock('/api/user/login', {
  status: 0,
  data: {
    'id|10001-1000': 12,
    username: '@cname',
    email: '@email',
    phone: '010',
    role: 0,
    createTime: 1479048325000,
    updateTime: 1479048325000
  }
})

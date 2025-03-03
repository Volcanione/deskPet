import request from '@renderer/utils/request'

export function SettingConfig() {
  return request({ url: '/setting', method: 'get' })
}
export function SettingConfigUpdate(data: {}) {
  return request({ url: '/setting', method: 'post', data })
}

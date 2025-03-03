import { reactive } from 'vue'
import { SettingConfig, SettingConfigUpdate } from '@renderer/api/index'

export const SettingHook = () => {
  const SettingConfigData = reactive({})

  const getSettingConfig = async () => {
    try {
      const { data } = await SettingConfig()
      console.log(data)
      Object.assign(SettingConfigData, data)
    } catch (error) {
      console.log(error)
    }
  }

  const updateSettingConfig = async () => {
    try {
      console.log(SettingConfigData);
      await SettingConfigUpdate(SettingConfigData)
    } catch (error) {
      console.log(error)
    }
  }
  return {
    SettingConfigData,
    getSettingConfig,
    updateSettingConfig
  }
}

import { createI18n } from 'vue-i18n/index'
import storage from 'store'
import Zhlang from 'element-plus/lib/locale/lang/zh-cn'
import Enlang from 'element-plus/lib/locale/lang/en'
import locale from 'element-plus/lib/locale'


export const defaultLang = storage.get('lang') || 'zh'

const i18n = createI18n({
  silentTranslationWarn: true,
  locale: defaultLang,
  messages: {
    zh: require('./lang/zh.js'),
    en: require('./lang/en.js')
  }
})
locale.use(i18n.global.locale == 'en'?Enlang:Zhlang)
const loadedLanguages = [defaultLang]

function setI18nLanguage(lang) {
  i18n.global.locale = lang
  locale.use(lang== 'en'?Enlang:Zhlang)
  document.querySelector('html').setAttribute('lang', lang)
  return lang
}


export function loadLanguageAsync(lang = defaultLang) {
  return new Promise(resolve => {
    // 缓存语言设置
    storage.set('lang', lang)
    if (i18n.global.locale !== lang) {
      if (!loadedLanguages.includes(lang)) {
        return import(/* webpackChunkName: "lang-[request]" */ `./lang/${lang}`).then(msg => {
          const locale = msg.default
          i18n.global.setLocaleMessage(lang, locale)
          loadedLanguages.push(lang)
          return setI18nLanguage(lang)
        })
      }
      return resolve(setI18nLanguage(lang))
    }
    return resolve(lang)
  })
}

export function i18nRender(key) {
  return i18n.t(`${key}`)
}
export default i18n;
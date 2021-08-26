const fs = require('fs')
const glob = require('glob')
const head = require('./nuxt-config/head')
const headEn = require('./nuxt-config/headEn')

const title = head.meta.find((item) => item.hid === 'title').content
const titleEn = headEn.meta.find((item) => item.hid === 'title').content
const description = head.meta.find((item) => item.hid === 'description').content
const descriptionEn = headEn.meta.find(
  (item) => item.hid === 'description'
).content
const og = head.meta.find((item) => item.hid === 'og:image').content
const ogEn = headEn.meta.find((item) => item.hid === 'og:image').content
const vk = head.meta.find((item) => item.hid === 'vk:image').content
const vkEn = head.meta.find((item) => item.hid === 'vk:image').content

// eslint-disable-next-line node/handle-callback-err
glob('./dist/en/**/*.html', (err, res) => {
  res.forEach((file) => {
    let data = fs.readFileSync(file, { encoding: 'utf8' })
    data = data.replace(new RegExp(title, 'g'), titleEn)
    data = data.replace(new RegExp(description, 'g'), descriptionEn)
    data = data.replace(new RegExp(og, 'g'), ogEn)
    data = data.replace(new RegExp(vk, 'g'), vkEn)

    fs.writeFileSync(file, data, { encoding: 'utf-8' })
  })
})

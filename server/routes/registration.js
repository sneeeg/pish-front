import { getResponse } from '~/server/utils'

const RESPONSE = {
  title: 'Спасибо!',
  message: `Ваша регистрация прошла успешно.</br> В ближайщее время вы получите письмо на указанную вами почту с подтверждением регистрации.`,
}

/**
 * Registration routes
 */
export default (pretender) => {
  // Form
  pretender.post('/api/registration', () => {
    return [200, { 'Content-Type': 'application/json' }, getResponse(RESPONSE)]
  })
}

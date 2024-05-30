import { compareSync } from 'bcrypt'

export function comparePassword(password: string, userByEmailPassword: string) {
  return compareSync(password, userByEmailPassword)
}

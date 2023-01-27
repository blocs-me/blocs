import daysBetween from '@/utils/dateUtils/daysBetween'
import { BlocsUserServer } from '../../global-types/blocs-user'

const isTrialValid = (blocsUser: BlocsUserServer) => {
  const freeTrialStartedAt = blocsUser?.data?.freeTrialStartedAt
  const isValid = freeTrialStartedAt
    ? daysBetween(new Date(), new Date(freeTrialStartedAt)) <= 14
    : false

  return isValid
}

export default isTrialValid

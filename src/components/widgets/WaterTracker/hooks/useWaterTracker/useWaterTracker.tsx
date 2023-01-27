import makeStore from '@/utils/makeStore'

const initialState = {
  role: '',
  token: ''
}

type State = {
  role: 'friend' | 'blocs-user'
  token: string
}

type Actions = {}

const reducer = (state: State, action: Actions) => {}

const [Provider, useStore, useDispatch] = makeStore({ initialState, reducer })

const useWaterTracker = () => {}

export default useWaterTracker

export { Provider as WaterTrackerProvider }
export { useStore as useWaterTrackerStore }

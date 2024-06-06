import {
  HYEventStore
} from 'hy-event-store'

const playStore = new HYEventStore({
  state: {
    playListSongs: []
  },
})

export default playStore
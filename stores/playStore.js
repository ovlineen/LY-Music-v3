import {
  HYEventStore
} from 'hy-event-store'

const playStore = new HYEventStore({
  state: {
    playListSongs: [],
    playSongIndex: 0
  },
})

export default playStore
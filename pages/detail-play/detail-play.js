// pages/detail-play/detail-play.js
import {
  getSongDetail,
  getLyricsData
} from "../../services/play";

import {
  parseLyric
} from '../../utils/parse-lyric'

import playStore from '../../stores/playStore'

import _ from 'lodash'

const app = getApp();
const audioContent = wx.createInnerAudioContext();

Page({
  data: {
    id: 0,
    isPlaying: true,
    songData: {},
    statusHeight: 20,
    currentPage: 0,
    currentHeight: 500,
    lyric: "",
    currentTime: 0,
    durationTime: 0,
    sliderValue: 0,
    lyricInfos: [],
    currentLyricText: "",
    currentLyricIndex: 0,
    lyricScrollTop: 0,
    playListSongs: [],
    playSongIndex: 0
  },

  onLoad(options) {
    const id = options.id;
    this.setData({
      id,
      statusHeight: app.globalData.statusBarHeight,
      currentHeight: app.globalData.currentHeight,
    });

    audioContent.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
    audioContent.autoplay = true;
    audioContent.onTimeUpdate(() => {
      this.updateProgress()

      // 匹配当前歌词
      if (!this.data.lyricInfos.length) return
      let index = this.data.lyricInfos.length - 1
      for (let i = 0; i < this.data.lyricInfos.length; i++) {
        const info = this.data.lyricInfos[i]
        if (info.time > audioContent.currentTime * 1000) {
          index = i - 1
          break
        }
      }
      this.setData({
        currentLyricText: this.data.lyricInfos[index].text,
        currentLyricIndex: index,
        lyricScrollTop: 40 * index
      })

      audioContent.onWaiting(() => {
        audioContent.pause()
      });

      audioContent.onCanplay(() => {
        audioContent.play()
      })
    });

    this.feachSongDetail();
    this.feachLyricsData();

    // 侦听状态管理器数据
    playStore.onStates(["playListSongs", "playSongIndex"], this.getPlaySongInfoHandler)
  },

  async feachSongDetail() {
    const res = await getSongDetail(this.data.id);
    this.setData({
      songData: res.songs[0],
      durationTime: res.songs[0].dt,
    });
  },

  async feachLyricsData() {
    const res = await getLyricsData(this.data.id);
    const lyric = res.lrc.lyric
    const lyricInfos = parseLyric(lyric)
    this.setData({
      lyricInfos
    })
  },

  // 页面切换事件
  onSwiperChange(e) {
    this.setData({
      currentPage: e.detail.current,
    });
  },

  // 页面返回事件
  onBacktrackTouch() {
    wx.navigateBack();
  },

  onSliderTouch(e) {
    const value = e.detail.value;
    const currentTime = value / 100 * this.data.durationTime;
    audioContent.seek(currentTime / 1000)
    this.setData({
      currentTime,
      sliderValue: value
    })
  },

  // 播放和暂停
  onPlayOrPauseTap() {
    if (this.data.isPlaying) {
      audioContent.pause()
      this.setData({
        isPlaying: false
      })
    } else {
      audioContent.play()
      this.setData({
        isPlaying: true
      })
    }
  },

  // 头部标签切换
  onTabTitle(e) {
    const index = e.currentTarget.dataset.index
    this.setData({
      currentPage: index
    })
  },

  updateProgress() {
    this.setData({
      currentTime: audioContent.currentTime * 1000,
    });

    const sliderValue = this.data.currentTime / this.data.durationTime;
    this.setData({
      sliderValue: sliderValue * 100,
    });
  },

  // 切换歌曲
  onPrevBtnTap() {
    console.log(1212);
  },
  onNextBtnTap() {
    const length = this.data.playListSongs.length
    let index = this.data.playSongIndex
    index = index + 1
    console.log(index);
    // 边界判断 
    if (index == length) index = 0

    // 根据索引获取信息
    const newSong = this.data.playListSongs[index]
    console.log(newSong.id);

    //将最新索引写入状态管理中
    playStore.setState("playSongIndex", index)
  },

  // 将状态管理器数据写入当前 Data 中
  getPlaySongInfoHandler(value) {
    const {
      playListSongs,
      playSongIndex
    } = value
    if (value.playListSongs) {
      this.setData({
        playListSongs
      })
    }
    if (value.playSongIndex) {
      this.setData({
        playSongIndex
      })
    }
  }
});
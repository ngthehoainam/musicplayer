//Tiến Độ Công Việc
// 1. Render songs 0k
//1.1 Render songs for categories 
// 2. Scroll top 0k
// 3. Play / Pause / seek 0k  
// 4. CD rotate  0k
// 5. Next / prev 0k
// 6. Random  
// 7. Next / Repeat when ended 
// 8. Active song  
// 9. Scroll active song into view 
// 10. Play song when click 
//11. handle option
//11.1 Download song when click option
//11.2 Handle song love 



  const $ = document.querySelector.bind(document);
  const $$ = document.querySelectorAll.bind(document);
  const cd = $('.cd');
  const cdthumb = $('.cd-thumb');
  const playBtn = $('.btn-toggle-play')
  const progress = $('#progress')
  const curTime = $('#curtime')
  const durTime = $('#durtime')
  const nextBtn = $('.btn-next')
  const prevBtn = $('.btn-prev')
  const randomBtn = $('.btn-random')
  const repeatBtn = $('.btn-repeat')
const app = {
  currentIndex : 0,
  isPlaying : false,
  isRandom : false,
   songs: [
    {
      name: 'Cổ Điển',
      singer: 'Tofu&VoVanDuc',
      path: './assets/path/RapLove/Classiclove.mp3',
      image: './assets/img/tns4l.jfif'
    },
    
    {
      name: 'Ghé Qua',
      singer: 'Dick x Tofu x PC',
      path: './assets/path/Raplove/Ghé Qua.mp3',
      image: './assets/img/ghequa.jfif'
    },
    {
      name: 'Đi Qua Hoa Cúc',
      singer: 'Tùng TeA & VoVanDuc',
      path: './assets/path/Raplove/Di qua hoa cuc.mp3',
      image: './assets/img/tns4l.jfif'
    },
    {
      name: 'Già Cùng Nhau Là Được',
      singer: 'Tùng TeA & Pc (Prod.VoVanDuc)',
      path: './assets/path/Raplove/Già Cùng Nhau Là Được.mp3',
      image: './assets/img/tns4l.jfif'
    },
    {
      name: 'Mây Lang Thang',
      singer: 'Tùng TeA & Pc',
      path: './assets/path/Raplove/Mây Lang Thang.mp3',
      image: './assets/img/tns4l.jfif'
    },
    {
      name: 'Thôi Trễ Rồi, Chắc Anh Phải Về Thôi',
      singer: 'Tùng TeA & Pc',
      path: './assets/path/Raplove/Thoi tre roi chac anh phai ve thoi.mp3',
      image: './assets/img/tns4l.jfif'
    },
    {
      name: 'Bản Tình Ca Không Hoàn Thiện',
      singer: 'TaynguyenSound',
      path: './assets/path/Raplove/Bản tình ca không hoàn thiện.mp3',
      image: './assets/img/tns4l.jfif'
    } 
   ],
   render: function() {
     const htmls = this.songs.map(song => {
          return `<div class="song">
                    <div class="song-thumb" style="background-image: url('${song.image}')"></div>
                    <div class="song-heading">
                        <h4 class="song-name">${song.name}</h4>
                        <p class="song-singer">${song.singer}</p>
                    </div>
                    <div class="song-options">
                        <i class=" fas fa-ellipsis-v"></i>
                    </div>
                </div>`
     })
     $('.playlist').innerHTML = htmls.join('');
   },
   defineProperties: function() {
      Object.defineProperty(this, 'currentSong' , {
        get: function() {
          return this.songs[this.currentIndex]
        }
      })
   },
   handleEvents: function() {
    const cdWidth = cd.offsetWidth
    _this = this
    //Xử lý cd quay
    const cdthumbAnimation =  cdthumb.animate([
      {
        transform: 'rotate(360deg)'
      }
    ],
    {
        duration: 10000, // 10sec
        iterations: Infinity
    })
    cdthumbAnimation.pause()

    // Xử Lý thu nhỏ cd khi xem list nhạc
    document.onscroll = function() {
      const scrollTop = document.documentElement.scrollTop
      const newCdWidth = cdWidth - scrollTop;
      cd.style.width = newCdWidth > 0 ? newCdWidth+ 'px' : 0;
      cdWidth.style.opacity = newCdWidth / cdWidth ;
    },

    playBtn.onclick = function() {
      if(_this.isPlaying){
          audio.pause();
      }else{
         audio.play();
      }
    },

    //Khi play
      audio.onplay = function() {
        _this.isPlaying = true;
        cdthumbAnimation.play()
        playBtn.classList.add('playing')
      },
    //Khi pause
    audio.onpause = function() {
      _this.isPlaying = false
      cdthumbAnimation.pause()
      playBtn.classList.remove('playing')
    },
    //Thời Gian  chạy
    audio.ontimeupdate = function() {
       if(audio.duration){
        const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
        progress.value = progressPercent
       }
    },
    // Xử lý khi tua
    progress.onchange = function(e) {
        const seekTime = audio.duration / 100 * e.target.value
        audio.currentTime = seekTime
    },
    // Thời Gian Thực Song
     audio.addEventListener('timeupdate', function (){
        const currentTime = audio.currentTime
        var min = Math.floor(currentTime / 60)
        var sec = Math.floor(currentTime % 60)
        curTime.innerText = (min < 10 ? '0' + min : min) + ':' + (sec < 10 ? '0' + sec : sec)
     }),
     // Tổng thời gian bài hát
     audio.onloadedmetadata = function () {
      duration = audio.duration
      var min = Math.floor(duration / 60)
      var sec = Math.floor(duration % 60)
      durTime.innerText = (min < 10 ? '0' + min : min) + ':' + (sec < 10 ? '0' + sec : sec)
    },
    // Xử lý nút next
    nextBtn.onclick = function() {
      if(_this.isRandom) {
        _this.randomSong()
      }else {
        _this.nextSong()
      }
      audio.play()
    },
    // Xử lý nút prev
    prevBtn.onclick = function() {
      if(_this.isRandom) {
        _this.randomSong()
      }else {
        _this.prevSong()
      }
      audio.play()
    }
    //Xử lý random 
    randomBtn.onclick = function() {
      _this.random = !_this.random
       randomBtn.classList.toggle('active',_this.random)
    }
   },
   //Load bai hat hien tai
   loadCurrentSong: function() {
      const heading = $('header h2');
      const audio = $('#audio');

      heading.textContent = this.currentSong.name
      cdthumb.style.backgroundImage = `url('${this.currentSong.image}')`
      audio.src = this.currentSong.path
   },
   //Khi next bai hat
   nextSong: function() {
      this.currentIndex ++
      if( this.currentIndex >= this.songs.length){
        this.currentIndex = 0
      }
      this.loadCurrentSong()
   },
   //Khi prev bai hat
   prevSong: function() {
    this.currentIndex --
    if( this.currentIndex < 0){
      this.currentIndex = this.songs.length - 1
    }
    this.loadCurrentSong()
 },

  //Khi Bật tính năng ngẫu nhiên
    randomSong: function() {
        let newIndex
        do {
          newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex === this.currentIndex);
    },


   start: function(){
      this.defineProperties()

      this.handleEvents()

      this.loadCurrentSong()

      this.render()

      this.randomSong()
   }
};
  app.start();
 
   
   
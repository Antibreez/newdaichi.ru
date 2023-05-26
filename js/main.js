let onMouseMove

$(document).on('mousedown', function () {
  $('html').addClass('clicking')
})

$(document).on('mouseup', function () {
  $('html').removeClass('clicking')
})

$(window).on('focus', function () {
  $(document.activeElement).addClass('window-focus')
})

$(document).on('keydown', function (e) {
  if (e.key === 'Tab') {
    $('html').removeClass('clicking')
  }
})

const addFocusEventListeners = items => {
  items.forEach(item => {
    $(document).on('focus', item, function (e) {
      if ($(e.currentTarget).hasClass('window-focus')) {
        $(e.currentTarget).removeClass('window-focus')
        return
      }

      if ($('html').hasClass('clicking')) return

      $(e.currentTarget).addClass('focused')
    })

    $(document).on('blur', item, function (e) {
      $(e.currentTarget).removeClass('focused')
    })

    $(document).on('mousedown', item, function (e) {
      $(e.currentTarget).removeClass('focused')
    })

    // $(document).on('mousedown', item, function (e) {
    //   $(e.currentTarget).addClass('clicking')
    //   $(e.currentTarget).removeClass('focused')

    //   onMouseMove = () => {
    //     console.log('mousemove')
    //     $(e.currentTarget).removeClass('clicking')
    //     $(document).off('mousemove', onMouseMove)
    //   }

    //   $(document).on('mousemove', onMouseMove)
    // })

    // $(document).on('mouseleave', item, function (e) {
    //   $(e.currentTarget).removeClass('clicking')
    // })

    // $(document).on('mouseup', item, function (e) {
    //   $(e.currentTarget).removeClass('clicking')
    //   $(document).off('mousemove', onMouseMove)
    // })
  })
}

// let onKeyup

// // let ku

// $(document).on('keydown', function (e) {
//   console.log('###down', e.key)

//   const ku = function (evt) {
//     console.log('###up', evt.key)

//     $(document).off('keyup', ku)
//   }

//   $(document).on('keyup', ku)
// })

// const addFocusEventListeners = items => {
//   items.forEach(item => {
//     $(document).on('focus', item, function (evt) {
//       // console.log('####focus', $(evt.currentTarget))
//       // $(item).removeClass('focused')
//       onKeyup = function (e) {
//         if (e.key === 'Tab') {
//           // console.log('#####tab', $(evt.currentTarget))
//           $(evt.currentTarget).addClass('focused')
//         }

//         $(document).off('keyup', onKeyup)
//       }
//       $(document).on('keyup', onKeyup)
//     })

//     $(document).on('blur', item, function (evt) {
//       // console.log('####blur', $(evt.target))
//       $(evt.target).removeClass('focused')
//       $(evt.target).off('keyup', onKeyup)
//     })

//     $(document).on('mousedown', item, function (e) {
//       // console.log('###mousedown')
//       $(e.target).removeClass('focused')
//     })
//   })
// }

// $(document).on('click', function () {
//   const data = $._data(document, 'events')
//   const all = Object.values(data).reduce((prev, next) => prev + next.length, 0)
//   console.log(all)
//   console.log(data)
// })

debounce = (f, ms) => {
  let timeout

  return function () {
    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(() => {
      f.apply(this, arguments)
      clearTimeout(timeout)
    }, ms)
  }
}

class PerfectSB {
  constructor(item) {
    this.item = item
    this.el = null
  }

  init() {
    this.el = new PerfectScrollbar(this.item[0])
  }

  update() {
    this.el.update()
  }

  destroy() {
    this.el.destroy()
  }
}

// class Sel2 {
//   constructor(item) {
//     this.item = item
//     this.el = el
//     this.options = null
//   }

//   setOptions(options) {
//     this.options = options
//   }

//   init() {
//     const firstOption = this.item.find('option').eq(0)
//     if (firstOption.val() !== '' && this.item.is('[data-empty]')) {
//       this.item.prepend("<option value=''></option>").val('')
//     }

//     if (this.options) item.select2(this.options)
//     else item.select2()
//   }
// }

addFocusEventListeners(['.input-field input', '.select-field .select2-selection', 'button', 'a'])

// const fancyboxContainer = new PerfectSB($('.fancybox-slide'))
// const searchMainList = new PerfectSB('.modal__search-main-result-list')
const citySearchList = new PerfectSB($('.modal__city-list'))

$('[data-fancybox]').fancybox({
  touch: false,
  autoFocus: false,
  backFocus: false,
  afterShow: function () {
    new PerfectSB($('.fancybox-slide')).init()

    // if ($(this.src).find('.modal__search-main-result-list').length) {
    //   !!searchMainList.el ? searchMainList.update() : searchMainList.init()
    // }

    if ($(this.src).find('.modal__city-list').length) {
      !!citySearchList.el ? citySearchList.update() : citySearchList.init()
    }

    setTimeout(() => {
      $(this.src + '.fancybox-content')
        .parent()
        .addClass('perfectScrollbar-init')
    }, 100)
  },
  afterClose: function () {
    $(this.src + '.fancybox-content')
      .parent()
      .removeClass('perfectScrollbar-init')
  },
})

const getOptions = item => {
  const options = {}
  if (!item.is('[data-search]')) {
    options.minimumResultsForSearch = Infinity
  }

  return options
}

const initSelect = item => {
  const options = getOptions(item)

  const firstOption = item.find('option').eq(0)

  if (firstOption.val() !== '' && item.is('[data-empty]')) {
    item.prepend('<option hidden disabled></option>').val('')
  }

  if (item.is('[data-empty]')) {
    options.dropdownCssClass = 'select2-dropdown-first-empty'
  }

  item.select2(options)
  // addFocusEventListeners(['.select-field .select2-selection'])
}

$('.select-field select').each((idx, item) => {
  initSelect($(item))

  $(item).on('select2:select', function () {
    $(this).attr('data-selected', '')
  })
})

// $('.company-map__underlayer').parallax({
//   mirrorContainer: '.company-map__mirror-container',
//   // naturalWidth: '2350px',
//   speed: 0.1,
// })

// const mapUnderlayerImgStyles = {
//   marginTop: `-${$('.company-map__underlayer img').outerHeight() / 2}px`,
// }

// const mapUnderlayerStyles = {
//   width: `${$('.company-map__underlayer').parent().outerWidth()}px`,
//   //height: `${$('.company-map__underlayer').parent().height()}px`,
//   marginLeft: `-${$('.company-map__underlayer').parent().outerWidth() / 2}px`,
// }

// $('.company-map__underlayer img').css(mapUnderlayerImgStyles)
// $('.company-map__underlayer').css(mapUnderlayerStyles)

$(window).on('load', function () {
  $(this).trigger('scroll')
})

$(window).on('resize', function () {
  $(this).trigger('scroll')

  // mapUnderlayerImgStyles.marginTop = `-${$('.company-map__underlayer img').outerHeight() / 2}px`

  // mapUnderlayerStyles.width = `${$('.company-map__underlayer').parent().outerWidth()}px`
  // //mapUnderlayerStyles.height = `${$('.company-map__underlayer').parent().height()}px`
  // mapUnderlayerStyles.marginLeft = `-${$('.company-map__underlayer').parent().outerWidth() / 2}px`

  // $('.company-map__underlayer img').css(mapUnderlayerImgStyles)
  // $('.company-map__underlayer').css(mapUnderlayerStyles)
})

const $mapPlacesFragment = $(document.createDocumentFragment())

try {
  companyMapBranches.forEach(item => {
    const placeNode = $('#map-place').prop('content')
    const $place = $(placeNode).find('.company-map__place').clone()
    $place.css({
      left: `${item.x}%`,
      bottom: `${item.y}%`,
    })

    $place.find('.company-map__popup-city').text(item.name)
    $place.find('.company-map__popup-label:contains("Адрес")').next().text(item.address)
    const $tel = $place.find('.company-map__popup-label:contains("Телефон")').next()
    $tel.children().html(item.telephone)
    $tel
      .children()
      .attr('href', `tel:${item.telephone.split('-').join('').split(' ').join('').split('&nbsp;').join('')}`)
    const $email = $place.find('.company-map__popup-label:contains("Почта")').next()
    $email.children().html(item.email)
    $email.children().attr('href', `mailto:${item.email}`)
    $mapPlacesFragment.append($place)
    $('.company-map__places').append($mapPlacesFragment)
  })
} catch {
  console.log('catch')
}

console.log('next')

$(document).on('click', '.company-map__pin-btn', function () {
  if ($(this).parent().hasClass('opened')) {
    $(this).parent().removeClass('opened')
  } else {
    $('.company-map__place').removeClass('opened')
    $(this).parent().addClass('opened')
  }
})

$(document).on('click', function (e) {
  if ($(e.target).closest('.company-map__place').length) return
  $('.company-map__place').removeClass('opened')
})

$(document).on('click', '.company-map__popup-close', function () {
  $(this).parents('.company-map__place').removeClass('opened')
})


const headerMenuMobile = new PerfectSB($('.header__menu-mobile'))

$(document).on('click', '.header__menu-button', function () {
  $(this).parents('.header').toggleClass('opened')

  if ($(this).parents('.header').hasClass('opened')) {
    setTimeout(() => {
      headerMenuMobile.init()
    }, 500)
  } else {
    headerMenuMobile.destroy()
  }
})

$(window).on('load', function () {
  $('.input-field input').each((idx, item) => {
    if ($(item).val().trim() !== '') {
      $(item).parents('.input-field').addClass('active')
    }
  })
})

$(document).on('focus', '.input-field input', function (e) {
  $(e.currentTarget).parents('.input-field').addClass('active')
})

$(document).on('blur', '.input-field input', function (e) {
  if ($(e.currentTarget).val().trim() !== '') return
  $(e.currentTarget).val('')
  $(e.currentTarget).parents('.input-field').removeClass('active')
})

$(document).on('input', '.input-field.is--search input', function (e) {
  if ($(e.currentTarget).val().trim() !== '') {
    $(e.currentTarget).nextAll('.input-field__clear-button').show()
  } else {
    $(e.currentTarget).nextAll('.input-field__clear-button').hide()
  }
})

$(document).on('click', '.input-field__clear-button', function (e) {
  const $target = $(e.currentTarget)
  $target.prevAll('input').val('')
  $target.hide()
})

// $(document).on('input', '.input-field', function(e) {
//   const $target = $(e.currentTarget);

// })

class CityModal {
  constructor() {
    this.el = $('#city-select')
  }

  onInput(cb) {
    $(document).on(
      'input',
      '#city-select .input-field input',
      debounce(e => {
        cb(this.el.find('.input-field input').val())
      }, 500)
    )
  }

  onSelect(cb) {
    $(document).on('click', '#city-select .modal__city-link', e => {
      if ($(e.target).hasClass('active')) return
      cb($(e.target).text())
    })
  }

  onClear(cb) {
    $(document).on('click', '#city-select .input-field__clear-button', e => {
      cb()
    })
  }
}

const cityModal = new CityModal()

if ($('.page-main').length && $('.main-slider').length) {
  const mainSliderHeight = $('.main-slider').outerHeight()

  $(document).on('scroll', function () {
    const offset = $('.main-slider').offset().top + mainSliderHeight - $(document).scrollTop()

    if (offset < 0) {
      $('.header').addClass('is--visible')
    } else {
      $('.header').removeClass('is--visible')
    }
  })
}

// const slides = $('.main-slider__slide').length
// const frag = $(document.createDocumentFragment)
// for (let i = 0; i < slides.length; i++) {
//   frag.append()
// }

const mainSlider = new Swiper('.main-slider__slides', {
  centeredSlides: true,
  autoplay: {
    delay: +$('.main-slider').attr('data-speed'),
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  pagination: {
    el: '.main-slider .main-slider__progress',
    clickable: true,
  },
  navigation: {
    nextEl: '.main-slider .main-slider__control--next',
    prevEl: '.main-slider .main-slider__control--prev',
  },
  on: {
    autoplayTimeLeft(s, time, progress) {
      const perc = Math.round((1 - progress) * 10000) / 100
      const bg = `
        linear-gradient(to right, #151515, #151515 ${perc}%, #F4F4F8 ${perc}%, #F4F4F8)
      `
      $('.main-slider .main-slider__progress span').eq(this.activeIndex).css('background', bg)
    },
    slideChange() {
      $('.main-slider .main-slider__progress span').css('background', '')
      $('.main-slider .main-slider__progress span').removeClass('is--passed')
      $('.main-slider .main-slider__progress span').slice(0, this.activeIndex).addClass('is--passed')
    },
  },
})

const mainNavSliderMobile = new Swiper('.main-slider--mobile .main-slider__nav', {
  freeMode: true,
  slidesPerView: 'auto',
  pagination: {
    el: '.main-slider--mobile .main-slider__nav .main-slider__progressbar',
    type: 'progressbar',
  },
})

const mainSliderMobile = new Swiper('.main-slider__mobile-slides', {
  freeMode: true,
  slidesPerView: 'auto',
  pagination: {
    el: '.main-slider__mobile-slides .main-slider__progressbar',
    type: 'progressbar',
  },
})

const searchMainPS = new PerfectSB($('#search-main').parent())
// searchMainList.init()

class MainSearchModal {
  constructor() {
    this.addEventListeners()
  }

  openModal() {
    $('#search-main').addClass('is--opened')
    $('#search-main').parent().addClass('is--opened')
    $('.modal-custom__overlay').eq(0).addClass('is--visible')
    $('.header').addClass('is--hidden')
    $('.modal__search-main-result-list')[0].scrollTop = 0
    setTimeout(() => {
      searchMainPS.init()
    }, 500)
  }

  closeModal() {
    $('#search-main').removeClass('is--opened')
    $('#search-main').parent().removeClass('is--opened')
    $('.modal-custom__overlay').eq(0).removeClass('is--visible')
    $('.header').removeClass('is--hidden')
    searchMainPS.destroy()
  }

  onInput(cb) {
    $(document).on(
      'input',
      '#search-main .input-field input',
      debounce(e => {
        cb($(e.target).val())
      }, 500)
    )
  }

  onClear(cb) {
    $(document).on('click', '#search-main .input-field__clear-button', e => {
      cb()
    })
  }

  addEventListeners() {
    $('.header__search-button').on('click', e => {
      e.preventDefault()
      this.openModal()
    })
    $('.modal__search-main-close').on('click', this.closeModal)
    $('.modal-custom').on('click', e => {
      if ($(e.target).closest('#search-main').length) return
      this.closeModal()
    })
  }
}

const mainSearchModal = new MainSearchModal()

// const slides = $('.main-slider__slide').length
// const frag = $(document.createDocumentFragment)
// for (let i = 0; i < slides.length; i++) {
//   frag.append()
// }

const newsSlider = new Swiper('.news-articles__slides', {
  freeMode: true,
  slidesPerView: 'auto',
  pagination: {
    el: '.news-articles .main-slider__progressbar',
    type: 'progressbar',
  },
  on: {
    lock() {
      $(this.el).removeClass('with-scroll-indicator')
    },
    unlock() {
      $(this.el).addClass('with-scroll-indicator')
    },
  },
})

// const slides = $('.main-slider__slide').length
// const frag = $(document.createDocumentFragment)
// for (let i = 0; i < slides.length; i++) {
//   frag.append()
// }

const objectsSlider = new Swiper('.objects-slider__slides', {
  centeredSlides: true,
  autoplay: {
    delay: +$('.objects-slider').attr('data-speed'),
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  pagination: {
    el: '.objects-slider .main-slider__progress',
    clickable: true,
  },
  navigation: {
    nextEl: '.objects-slider .main-slider__control--next',
    prevEl: '.objects-slider .main-slider__control--prev',
  },
  on: {
    autoplayTimeLeft(s, time, progress) {
      const perc = Math.round((1 - progress) * 10000) / 100
      const bg = `
        linear-gradient(to right, #151515, #151515 ${perc}%, #F4F4F8 ${perc}%, #F4F4F8)
      `
      $('.objects-slider .main-slider__progress span').eq(this.activeIndex).css('background', bg)
    },
    slideChange() {
      $('.objects-slider .main-slider__progress span').css('background', '')
      $('.objects-slider .main-slider__progress span').removeClass('is--passed')
      $('.objects-slider .main-slider__progress span').slice(0, this.activeIndex).addClass('is--passed')
    },
  },
})

//# sourceMappingURL=main.js.map

const ttt = document.querySelector('.hideForLoader')
ttt.style.display = 'none'
const leftSliderBtn = document.querySelector('.header_slider_btn_left');
const rightSliderBtn = document.querySelector('.header_slider_btn_right');
const header = document.querySelector('.header');
let imageSliderCount = 1
const arraySrc = ['./assets/bg_1.webp', './assets/bg_2.webp', './assets/bg_3.webp']
const sliderStateDots = document.querySelectorAll('.header_slider_dots_item')
const headerTitle = document.querySelector('.header_title')
const loader = document.querySelector('.loader')

function isLoadImagesHeader(arraySrc) {
    let results = []
    for (let i = 0; i < arraySrc.length; i++) {
        const img = new Image()
        img.src = arraySrc[i]
        const isLoad = img.onload = () => true
        results.push(isLoad())
    }
    if (results.length === 3) {
        return true
    }
}

function load() {
    const isLoadedImages = isLoadImagesHeader(arraySrc)
    window.onload = () => {
        loader.style.display = 'none'
        if (isLoadedImages) {
            ttt.style.display = 'block'
            console.log('block')
            function changeStateSlider(imageSliderCount) {
                for (let i = 0; i < sliderStateDots.length; i++) {
                    sliderStateDots[i].style.opacity = '0'
                    sliderStateDots[imageSliderCount - 1].style.background = 'white'
                    sliderStateDots[imageSliderCount - 1].style.opacity = '1'
                }
            }

            function changeHeaderTitle(imageSliderCount) {
                if (imageSliderCount === 2) {
                    headerTitle.innerHTML = 'ВСЕ ПРЕДСТАВИТЕЛИ НАШЕГО ПИТОМНИКА ИМЕЮТ ВЕТЕРИНАРНЫЙ ПАСПОРТ'
                }
                if (imageSliderCount === 3) {
                    headerTitle.innerHTML = 'ВСЕ СОТРУДНИКИ НАШЕГО ПИТОМНИКА СПЕЦИАЛИСТЫ'
                }
                if (imageSliderCount === 1) {
                    headerTitle.innerHTML = 'ПЕРВЫЙ ПИТОМНИК С РАСШИРЕННЫМ СПЕКТРОМ УСЛУГ'
                }
            }

            changeStateSlider(imageSliderCount)

            rightSliderBtn.addEventListener('click', (e) => {
                imageSliderCount++
                if (imageSliderCount === 4) {
                    imageSliderCount = 1
                }
                header.style.backgroundImage = `url('./assets/bg_${imageSliderCount}.webp')`
                changeStateSlider(imageSliderCount)
                changeHeaderTitle(imageSliderCount)
            })

            leftSliderBtn.addEventListener('click', (e) => {
                imageSliderCount--
                if (imageSliderCount === 0) {
                    imageSliderCount = 3
                }
                header.style.backgroundImage = `url('./assets/bg_${imageSliderCount}.webp')`
                changeStateSlider(imageSliderCount)
            })

            ymaps.ready(init);

            function init() {
                // Создание карты.
                let myMap = new ymaps.Map("map", {
                    // Координаты центра карты.
                    // Порядок по умолчанию: «широта, долгота».
                    // Чтобы не определять координаты центра карты вручную,
                    // воспользуйтесь инструментом Определение координат.
                    center: [55.76, 37.64],
                    // Уровень масштабирования. Допустимые значения:
                    // от 0 (весь мир) до 19.
                    zoom: 7

                }, { searchControlProvider: 'yandex#search'});
                myMap.controls.get('trafficControl').options.set('size', 'small');
            }
        }
    }
}
load()








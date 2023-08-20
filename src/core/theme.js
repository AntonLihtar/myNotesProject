class OptionTheme {
    constructor(title, color, hover, btnColor, backgroundClass) {
        this.title = title
        this.color = color
        this.hover = hover
        this.btnColor = btnColor
        this.backgroundClass = backgroundClass
    }
}

const theme = [
    new OptionTheme('зеленая',
        '#232223',
        '#726c72',
        '#16725c',
        'body-bac-green'),
    new OptionTheme('розовая',
        '#463f3f',
        '#e86777',
        '#ec98a0',
        'body-bac-pink'),
    new OptionTheme('желтая',
        '#4e4e56',
        '#fff900',
        '#e7cc34',
        'body-bac-yellow')
]


export class Theme {
    constructor() {
        this.root = document.querySelector(':root')
        this.btnTheme = document.getElementById('theme-btn')
        this.counter = 0
        this.name = 'Ant'

        this.init()
    }

    init() {
        this.btnTheme.addEventListener('click', setThemeColor.bind(this))
    }
}

function setThemeColor() {
    this.counter++
    if (this.counter === theme.length) {
        this.counter = 0
    }

    this.root.style.setProperty('--main-color', theme[this.counter].color)
    this.root.style.setProperty('--hover-main-color', theme[this.counter].hover)
    this.root.style.setProperty('--btn-color', theme[this.counter].btnColor)

    document.body.className = theme[this.counter].backgroundClass
    this.btnTheme.textContent = `theme: ${theme[this.counter].title}`
}

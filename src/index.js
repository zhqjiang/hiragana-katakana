let viewed = arr.map(ele => false)
let nowElement = ['', '', '']
let nowIndex = -1;
let mode = 'R' // 'R', 'H', 'K'

document.querySelector('#view-btn').addEventListener('click', () => { view() })
document.querySelector('#next-btn').addEventListener('click', next)
document.querySelector('#mode-select').addEventListener('change', handleChangeMode)

function handleChangeMode(e) {
    mode = e.target.value
    viewed = arr.map(ele => false)
    next()
}

function view(mode) {
    if (mode === 'R' || !mode) {
        document.querySelector('#romaji').innerHTML = nowElement[0]
    }
    if (mode === 'H' || !mode) {
        document.querySelector('#hiragana').innerHTML = nowElement[1]
    }
    if (mode === 'K' || !mode) {
        document.querySelector('#katakana').innerHTML = nowElement[2]
    }
}

function clear() {
    document.querySelector('#romaji').innerHTML = ''
    document.querySelector('#hiragana').innerHTML = ''
    document.querySelector('#katakana').innerHTML = ''
}

function next() {
    clear()
    if (nowIndex > -1) {
        viewed[nowIndex] = true;
    }
    if (viewed.every(ele => ele)) {
        alert('全部完成')
        return
    }

    const leftNumber = viewed.reduce((acc, cur) => (cur ? acc : acc + 1), 0)
    const newRandom = Math.floor(Math.random() * leftNumber)

    // 找到第newRandom个还未被查看的元素
    let iter = -1;

    for (let i = 0; i < viewed.length; i += 1) {
        if (!viewed[i]) {
            if ((iter + 1) === newRandom) {
                nowIndex = i
                break;
            } else if ((iter + 1) < newRandom) {
                iter += 1;
            }
        }
    }

    nowElement = arr[nowIndex]

    view(mode)
}

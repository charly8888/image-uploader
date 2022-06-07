const app = document.getElementById('containerAplication')
// app.innerHTML =
//   '<div id="container"><img id="img" /></div><form id="form"><input type="file" /><button>send</button></form><button id="pedir" class="bg-lime-500 p-1">Pegir imagen</button>'
const container = document.getElementById('container')
const form = document.getElementById('form')
import axios from 'axios'
import './index.css'

form.addEventListener('submit', (e) => {
  e.preventDefault()
  handleEnviarFile(e)
})

function handleEnviarFile(form) {
  try {
    const file = form.target[0].files[0]
    console.log(file)
    const formData = new FormData()
    formData.append('file', file)
    console.log(formData)
    const req = async () => {
      const response = await axios.post(
        import.meta.env.VITE_URL_TO_FETCH_DATA,
        formData,
        {
          headers: {
            'Content-Type': 'multipar/form-data',
          },
          onUploadProgress(e) {
            app.innerHTML = `<progress class="w-80 h-3 bg-slate-50"  value="${
              (e.loaded / file.size) * 100
            }" max="100" id="bar"></progress>`
          },
        }
      )

      if (!response.status === 200) return console.log('error')

      console.log('respuesta del post', response.data.newPath)

      app.innerHTML = `<div class=""><img src="${response.data.newPath}"><p id="link">${response.data.newPath}</p ><button id="copy">Copy link</button></div>`

      const buttonCopy = document.getElementById('copy')
      buttonCopy.addEventListener('click', () => {
        navigator.clipboard
          .writeText(document.getElementById('link').innerText)
          .then(() => {
            console.log('Text copied to clipboard...')
          })
          .catch((err) => {
            console.log('Something went wrong', err)
          })
      })
    }
    req()
  } catch (err) {
    console.log(err)
  }
}

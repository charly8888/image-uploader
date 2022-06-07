const app = document.getElementById('containerAplication')
const container = document.getElementById('container')
const inputFileBtm = document.getElementById('inputFileBtm')
const buttonUpload = document.getElementById('buttonUpload')
const dropContainer = document.getElementById('dropContainer')

dropContainer.addEventListener('dragover', (e) => {
  e.preventDefault()
  // console.log('hola desde el drop')
})
dropContainer.addEventListener('dragleave', (e) => {
  e.preventDefault()
  // console.log('hola desde el drop')
  console.log(e)
})
dropContainer.addEventListener('drop', (e) => {
  e.preventDefault()
  const file = e.dataTransfer.files
  handleSendFileFromDrag(file[0])
})
buttonUpload.addEventListener('click', () => {
  inputFileBtm.click()
})
import axios from 'axios'
import './index.css'

inputFileBtm.addEventListener('change', (e) => {
  e.preventDefault()
  handleEnviarFile(e)
})

function handleSendFileFromDrag(form) {
  console.log(form)
  try {
    request(form)
  } catch (err) {
    console.log(err)
  }
}
function handleEnviarFile(form) {
  console.log(form)
  try {
    const file = form.target.files[0]
    console.log(file)
    request(file)
  } catch (err) {
    console.log(err)
  }
}

async function request(file) {
  const formData = new FormData()
  formData.append('file', file)
  console.log(formData)
  const response = await axios.post(
    import.meta.env.VITE_URL_TO_FETCH_DATA,
    formData,
    {
      headers: {
        'Content-Type': 'multipar/form-data',
      },
      onUploadProgress(e) {
        app.innerHTML = `<p class="text-lg text-left mb-6 font-medium">Uploading...</p>
        <div class="w-full bg-slate-300 rounded-lg h-2 overflow-hidden">
        <div class="bg-blue-500 h-full" style="width: ${
          (e.loaded / file.size) * 100
        }%"></div>
      </div>
        `
      },
    }
  )

  if (!response.status === 200) return console.log('error')

  console.log('respuesta del post', response.data.newPath)

  app.innerHTML = `<svg class="h-9 w-9 text-green-600 inline-block mb-3" viewBox="0 0 20 20" fill="currentColor">
  <path
    fill-rule="evenodd"
    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
    clip-rule="evenodd"
  />
</svg>
<h1 class="text-lg font-medium mb-6">Uploaded Succsesfully!</h1>
<img
  src="${response.data.newPath}"
  class="rounded-xl w-96 mb-6"
/>
<div
  class="w-full bg-gray-200 relative h-9 rounded-lg flex items-center p-2 border-2 border-gray-300"
>
  <p class="text-xs text-gray-600" id="link">
  ${response.data.newPath}
  </p>
  <button
    class="bg-blue-500 text-xs absolute right-1 px-5 py-[6px] rounded-lg text-white"
    id="copy"
  >
    Copy Link
  </button>
</div>`

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

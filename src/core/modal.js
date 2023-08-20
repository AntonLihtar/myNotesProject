export class Modal {
  constructor() {
    this.$modal = document.getElementById('md-modal')
    this.titleModal = this.$modal.querySelector('#md-header-title')
    this.contentModal = this.$modal.querySelector('#md-body')

    window.addEventListener('mousedown', closeHandler.bind(this))
  }

  open() {
    this.$modal.classList.remove('hide')
  }

  close() {
    this.contentModal.innerHTML = ''
    this.$modal.classList.add('hide')
  }

  setContentAndTitle(options) {

    if (options.title) {
      this.titleModal.textContent = options.title
    }
    this.contentModal.appendChild(options.content)
  }

  removeContent(){
    this.contentModal.innerHTML = ''
  }

}

function closeHandler(event) {

  if (event.target.dataset.close) {
    this.close()
  }
}
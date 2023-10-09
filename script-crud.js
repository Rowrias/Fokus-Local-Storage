const taskListContainer = document.querySelector('.app__section-task-list')                     //

const toggleFormTaskBtn = document.querySelector('.app__button--add-task')                      // Botão que abre o Formulario " + Adicionar nova tarefa"
const cancelFormTaskBtn = document.querySelector('.app__form-footer__button--cancel')           // Botão que fecha o Formulario " X cancelar"
const formTask = document.querySelector('.app__form-add-task')                                  // O Formulario que abre dps de clicar no Botão " + Adicionar nova tarefa"
const formLabel = document.querySelector('.app__form-label')                                    // Label que esta escrito "Adicionando Tarefa"

const taskAtiveDescription = document.querySelector('.app__section-active-task-description')    // 

const textarea = document.querySelector('.app__form-textarea')                                  // O Campo onde digita a tarefa

const btnDeletar = document.querySelector('.app__form-footer__button--delete')

const localStorageTarefas = localStorage.getItem('tarefas')                                     // Pega os itens na lista de tarefas e coloca no local storage

//  Verifica se no local storage existe uma lista de tarefas salvas se não tiver cria uma lista de Tarefas vazia
let tarefas = localStorageTarefas ? JSON.parse(localStorageTarefas) :  [
                                                                            // {
                                                                            //     descricao: 'Tarefa Concluída',
                                                                            //     concluida: true
                                                                            // },
                                                                            // {
                                                                            //     descricao: 'Tarefa Pendente',
                                                                            //     concluida: false
                                                                            // }
                                                                        ]

//  Icone
const taskIconSvg = `
<svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24"
    fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#FFF" />
    <path
        d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
        fill="#01080E" />
</svg>
`

// 
let tarefaSelecionada = null
let itemTarefaSelecionada = null

let tarefaEmEdicao = null
let paragraphEmEdicao = null

// Função que seleciona tarefas que já existem
const selecionaTarefa = (tarefa, elemento) => {
    if(tarefa.concluida){
        return
    }

    document.querySelectorAll('.app__section-task-list-item-active').forEach(function (button) {
        button.classList.remove('app__section-task-list-item-active')
    })

    if (tarefaSelecionada == tarefa) {
        taskAtiveDescription.textContent = null
        itemTarefaSelecionada = null
        tarefaSelecionada = null
        return
    }

tarefaSelecionada = tarefa
itemTarefaSelecionada = elemento
taskAtiveDescription.textContent = tarefa.descricao
elemento.classList.add('app__section-task-list-item-active')
}

//  Fecha o Formulario e apaga o texto
const limparForm = () => {
    tarefaEmEdicao = null
    paragraphEmEdicao = null
    textarea.value = ''
    formTask.classList.add('hidden')
}

// 
const selecionaTarefaParaEditar = (tarefa, elemento) => {
    if(tarefaEmEdicao == tarefa) {
        limparForm()
        return
    }

    formLabel.textContent='Editando tarefa'
    tarefaEmEdicao=tarefa
    paragraphEmEdicao=elemento
    textarea.value = tarefa.descricao
    formTask.classList.remove('hidden')
}

//  Função que organiza o conteudo da tarefa para o HTML
function createTask(tarefa) {

    const li = document.createElement('li')                                 // <li></li>
    li.classList.add('app__section-task-list-item')                         // <li class="app__section-task-list-item"></li>

    const svgIcon = document.createElement('svg')                           // <svg></svg>
    svgIcon.innerHTML = taskIconSvg                                         // <svg> taskIconSvg </svg>

    const paragraph = document.createElement('p')                           // <p></p>
    paragraph.classList.add('app__section-task-list-item-description')      // <p class="app__section-task-list-item-description"></p>

    paragraph.textContent = tarefa.descricao                                // <p class="app__section-task-list-item-description"> tarefa.descricao </p>

    const button = document.createElement('button')                         // <p class="app__section-task-list-item-description"> tarefa.descricao <button> </button> </p>
    button.classList.add('app_button-edit')                                // <p class="app__section-task-list-item-description"> tarefa.descricao <button class="app__button-edit"> </button> </p>   
    const editIcon = document.createElement('img')
    editIcon.setAttribute('src', '/imagens/edit.png')
    button.appendChild(editIcon)                                            // <p class="app__section-task-list-item-description"> tarefa.descricao <button class="app__button-edit"> </button> editIcon </p>

    button.addEventListener('click', (event) => {
        event.stopPropagation()
        selecionaTarefaParaEditar(tarefa, paragraph)
    })

    li.onclick = () => {
        selecionaTarefa(tarefa, li)
    }

    // marca a tarefa como concluída clicando no 'icone svg'
    svgIcon.addEventListener('click', (event) => {
        if(tarefa==tarefaSelecionada){
            event.stopPropagation()
            button.setAttribute('disabled', true)
            li.classList.add('app__section-task-list-item-complete')
            tarefaSelecionada.convluida = true
            updateLocalStorage()
        }
    })

    if(tarefa.concluida){
        button.setAttribute('disabled', true)
        li.classList.add('app__section-task-list-item-complete')
    }

    li.appendChild(svgIcon)                                                 // <li> <svg> taskIconSvg </svg> </li>
    li.appendChild(paragraph)                                               // <li> <svg> taskIconSvg </svg>  <p> tarefa.descricao </p> </li>
    li.appendChild(button)                                                  // <li> <svg> taskIconSbg </svg>  <p> tarefa.descricao </p>  <button> editIcon </button>

    return li                                                               // <li class="app__section-task-list-item">
                                                                            //      <svg> taskIconSvg </svg>
                                                                            //      <p class="app__section-task-list-item-description"> tarefa.descricao </p>
                                                                            //      <button class="app__button-edit"> editIcon </button>
                                                                            // </li>
}

//  Mostra as Tarefas na "Lista de tarefas:"
tarefas.forEach(task => {
    const taskItem = createTask(task)
    taskListContainer.appendChild(taskItem)
})

//  Abre o Formulário quando clica no botão " + adicionar tarefas"
toggleFormTaskBtn.addEventListener('click', () => {
    formTask.classList.toggle('hidden')
    formLabel.textContent = 'Adicionando tarefa'
    textarea.value = ''
})

//
btnDeletar.addEventListener('click', () => {
    if(tarefaSelecionada) {
        const index = tarefas.indexOf(tarefaSelecionada)

        if(index !== -1){
            tarefas.splice(index, 1)
        }
        
        itemTarefaSelecionada.remove()
        tarefas.filter(t=> t!= tarefaSelecionada)
        itemTarefaSelecionada = null
        tarefaSelecionada = null
    }
    updateLocalStorage()
    limparForm()
})

//  Fecha o Formulário quando clica no botão " X cancelar"
cancelFormTaskBtn.addEventListener('click', () => {
    limparForm()
})

//  Salva os dados no local storage
const updateLocalStorage = () => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
}

//  Captura a tarefa no "adicionando tarefa" e manda pra "lista de tarefas:"
formTask.addEventListener('submit', (evento) => {
    evento.preventDefault()
    if(tarefaEmEdicao) {
        tarefaEmEdicao.descricao = textarea.value
        paragraphEmEdicao.textContent = textarea.value
    } else {
    const task = {
        descricao: textarea.value,
        concluida: false
    }
    tarefas.push(task)
    const taskItem = createTask(task)
    taskListContainer.appendChild(taskItem)
}
    updateLocalStorage()
    limparForm()
})

document.addEventListener('TarefaFinalizada', function (e) {
    if(tarefaSelecionada) {
        tarefaSelecionada.concluida = true
        itemTarefaSelecionada.classList.add('app__section-task-list-item-complete')
        itemTarefaSelecionada.querySelector('button').setAttribute('disabled', true)
        updateLocalStorage()
    }
})
const taskListContainer = document.querySelector('.app__section-task-list')     //
const toggleFormTaskBtn = document.querySelector('.app__button--add-task')      // Botão " + Adicionar nova tarefa"
const formTask = document.querySelector('.app__form-add-task')                  // Formulario que abre dps de clicar no Botão " + Adicionar nova tarefa"
const formLabel = document.querySelector('.app__form-label')                    // Label que esta escrito "Adicionando Tarefa"

//  Tarefas dentro de uma lista
let tarefas = [
    {
        descricao: 'Tarefa Concluída',
        concluida: true
    },
    {
        descricao: 'Tarefa Pendente',
        concluida: false
    }
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

//  Função que organiza o conteudo da tarefa para o HTML
function createTask(tarefa) {

    const li = document.createElement('li')                                 // <li></li>
    li.classList.add('app__section-task-list-item')                         // <li class="app__section-task-list-item"></li>

    const svgIcon = document.createElement('svg')                           // <svg></svg>
    svgIcon.innerHTML = taskIconSvg                                         // <svg> taskIconSvg </svg>

    const paragraph = document.createElement('p')                           // <p></p>
    paragraph.classList.add('app__section-task-list-item-description')      // <p class="app__section-task-list-item-description"></p>

    paragraph.textContent = tarefa.descricao                                //<p class="app__section-task-list-item-description"> tarefa.descricao </p>

    li.appendChild(svgIcon)                                                 // <li> <svg> taskIconSvg </svg> </li>
    li.appendChild(paragraph)                                               // <li> <svg> taskIconSvg </svg>  <p> tarefa.descricao </p> </li>


    return li                                                               // <li class="app__section-task-list-item">
                                                                            //      <svg> taskIconSvg </svg>
                                                                            //      <p class="app__section-task-list-item-description"> tarefa.descricao </p>
                                                                            // </li>
}

//  Mostra as Tarefas na tela
tarefas.forEach(task => {
    const taskItem = createTask(task)
    taskListContainer.appendChild(taskItem)
})

//  Abre o Formulário quando clica no botão adicionar tarefas
toggleFormTaskBtn.addEventListener('click', () => {
    formTask.classList.toggle('hidden')
    formLabel.textContent = 'Adicionando tarefa'
})
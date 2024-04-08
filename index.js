let participantes = [
  {
    nome: "Lucas Brito",
    email: "lucas@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCkeckIn: new Date(2024, 2, 25, 22, 00)
  },
  {
    nome: "Everton Soutelo",
    email: "everton@gmail.com",
    dataInscricao: new Date(2024, 3, 01, 20, 20),
    dataCkeckIn: null
  },
  {
    nome: "Ana Silva",
    email: "ana@gmail.com",
    dataInscricao: new Date(2024, 2, 23, 15, 45),
    dataCkeckIn: new Date(2024, 2, 25, 12, 30)
  },
  {
    nome: "Pedro Santos",
    email: "pedro@gmail.com",
    dataInscricao: new Date(2024, 3, 02, 10, 30),
    dataCkeckIn: new Date(2024, 3, 03, 9, 15)
  },
  {
    nome: "Carla Oliveira",
    email: "carla@gmail.com",
    dataInscricao: new Date(2024, 2, 23, 14, 10),
    dataCkeckIn: new Date(2024, 2, 25, 17, 45)
  },
  {
    nome: "Mariana Costa",
    email: "mariana@gmail.com",
    dataInscricao: new Date(2024, 2, 24, 11, 20),
    dataCkeckIn: null
  },
  {
    nome: "Rafael Mendes",
    email: "rafael@gmail.com",
    dataInscricao: new Date(2024, 3, 01, 19, 30),
    dataCkeckIn: new Date(2024, 3, 03, 14, 20)
  },
  {
    nome: "Fernanda Lima",
    email: "fernanda@gmail.com",
    dataInscricao: new Date(2024, 2, 25, 16, 40),
    dataCkeckIn: new Date(2024, 2, 27, 9, 45)
  },
  {
    nome: "Bruno Costa",
    email: "bruno@gmail.com",
    dataInscricao: new Date(2024, 2, 26, 18, 50),
    dataCkeckIn: new Date(2024, 2, 28, 20, 30)
  },
  {
    nome: "Juliana Martins",
    email: "juliana@gmail.com",
    dataInscricao: new Date(2024, 2, 27, 21, 15),
    dataCkeckIn: null
  }
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)

  let dataCkeckIn = dayjs(Date.now()).to(participante.dataCkeckIn)

  if(participante.dataCkeckIn == null) {
    dataCkeckIn = `
      <button
        data-email="${participante.email}"
        onClick="fazerCheckIn(event)"      
      >
        Confirmar check-in
      </button>
    `
  }
  
  return `
  <tr>
    <td>
    <strong>${participante.nome}</strong>
    <br>
    <small>${participante.email}</small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCkeckIn}</td>
  </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""
  for(let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }

  document
  .querySelector('tbody')
  .innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCkeckIn: null
  }

  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
  )

  if(participanteExiste) {
    alert('Email já cadastrado!')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  // limpar formulário
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
  const mensagemConfirmacao = 'Realmente deseja fazer o check-in?'
  
  if(confirm(mensagemConfirmacao) == false){
    return
  }

  const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email
  })

  participante.dataCkeckIn = new Date()

  atualizarLista(participantes)

}
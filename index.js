const caminhoBancoDeDados = './dadosPet.json';
const fs = require('fs');
let bancoDeDados = JSON.parse(fs.readFileSync(caminhoBancoDeDados, 'utf-8'));
const moment = require('moment');
const prompt = require('prompt-sync')();
const nomePetshop = "PETSHOP AVANADE";
let pets = bancoDeDados.pets;

const buscarPet = nomePet => {
    let found = pets.find(el => el.nome == nomePet);
    return found ? found : console.log(`Nenhum pet encontrado com nome ${nomePet}`);
}

const pesquisarPet = nomePet => {
    if (buscarPet(nomePet) != null) console.log(buscarPet(nomePet));
    else buscarPet(nomePet);
}

const filtrarTipoPet = tipoPet => {
    let especiesFiltradas = pets.filter(pet => pet.tipo == tipoPet);
    return especiesFiltradas;
}

const indiceDoPet = nomePet => {
    for (let i = 0; i < pets.length; i++) {
        if (pets[i].nome == nomePet) {
            return i;
        }
    }
}

const escreverJSON = () => {
    let dadosJS = JSON.stringify(bancoDeDados, null, 4);

    fs.writeFileSync(caminhoBancoDeDados, dadosJS, 'utf-8');
}

const listarPets = () => {
    console.log('--------- Listando Pets --------');
    pets.forEach(pet => {
        let {nome, idade, tipo, raca, servicos, vacinado} = pet;

        console.log(`Nome: ${nome} \nIdade: ${idade} \nTipo: ${tipo} \nRaça: ${raca}`);

        console.log('Serviços:');
        for (let servico of servicos) {
            let {nome, data} = servico;
            console.log(`${data} - ${nome}`);
        }

        vacinado ? console.log(`${nome} está vacinado!`) : console.log(`${nome} NÃO está vacinado!`);
        console.log('--------------------------------');
    });
}

const vacinarPet = nomePet => {
    if (buscarPet(nomePet) != null) {
        if (buscarPet(nomePet).vacinado == true) {
            console.log(`Ops, ${nomePet} já está vacinado!`);        
        } else {
            buscarPet(nomePet).vacinado = true;
            escreverJSON();
            console.log(`${nomePet} foi vacinado com sucesso!`);
        }     
    } else buscarPet(nomePet);
}

const campanhaVacina = () => {
    console.log("Campanha de vacina");

    let soma = 0;
    let totalVacinados = 0;
    pets.map(function () {
        if (!pets[soma].vacinado) {
            vacinarPet(pets[soma].nome);
            totalVacinados++;
        }
        soma++;
    });

    (totalVacinados == 0) ? console.log("Nenhum pet foi vacinado.") : (totalVacinados == 1) ? console.log(`${totalVacinados} pet foi vacinado!`) : console.log(`${totalVacinados} pets foram vacinados!`);
}

const adicionarPet = (nome, tipo, idade, raca, peso, tutor, contato, vacinado, servicos) => {    
    if (buscarPet(nome) == null) {
        let dados = {
            nome: nome,
            tipo: tipo,
            idade: idade,
            raca: raca,
            peso: peso,
            tutor: tutor,
            contato: contato,
            vacinado: Boolean(vacinado),
            servicos: servicos
        };
        
        pets.push(dados);

        escreverJSON();
        
        console.log(`${dados.nome} foi adicionado(a) com sucesso!`);
    } else console.log(`${nome} já está cadastrado, tente outro nome!`);
}

const clientePremium = nomePet => {
    if (buscarPet(nomePet) == null) {
        const contadorServicos = pets[indiceDoPet(nomePet)].servicos.length;

        switch (contadorServicos) {
            case 0:
                console.log("Nenhum serviço encontrado!");
                break;
            case 1:
                console.log(`${nomePet} realizou ${contadorServicos} serviço!`);
                console.log("Realize mais um serviço para obter 10% de desconto!");
                break;
            case 2:
                console.log(`${nomePet} realizou ${contadorServicos} serviços!`);
                console.log("Parabéns você obteve 10% de desconto!");
                break;
            case 3:
                console.log(`${nomePet} realizou ${contadorServicos} serviços!`);
                console.log("Parabéns, você obteve 20% de desconto!");
                break;
            default:
                console.log(`${nomePet} realizou ${contadorServicos} serviços!`);
                console.log("Parabéns, você obteve 30% de desconto!");
        }
    } else buscarPet(nomePet);
}

const atenderCliente = (servico, nomePet) => { 
    if (buscarPet(nomePet) != null) {
        pets[indiceDoPet(nomePet)].servicos.push(JSON.parse(JSON.stringify({
            nome: servico,
            data: moment().format('DD-MM-YYYY')
        })));
        
        escreverJSON();

        clientePremium(nomePet);

        switch (servico) {
            case 'banho':
                console.log(`${nomePet} está de banho tomado!`);
                break;
            case 'tosa':
                console.log(`${nomePet} está com cabelinho na régua!`);
                break;
            case 'corte de unhas':
                console.log(`${nomePet} está de unhas aparadas!`);
                break;
        }
    } else buscarPet(nomePet);
}

const contatoTutor = nomePet => {
    let {nome, tutor, contato} = nomePet;

    return `Tutor: ${tutor} \nContato: ${contato} \nPet: ${nome}`;
}

const filtrarTutor = nomeTutor => {
    let petsTutor = pets.filter((pet) => {
        return pet.tutor == nomeTutor;
    });
    
    console.log(`-- Pets do tutor ${nomeTutor} --`);
    petsTutor.forEach((pet) => {
        console.log(`${contatoTutor(pet)}`);
        console.log('-------------');
    });
}

/*var entrada = 9;

while (entrada != 0) {
    console.log(`
    Bem-vindo ao ${nomePetshop}!
    Estes são os serviços disponíveis: 
    [1] - Listar Pets
    [2] - Vacinar Pet
    [3] - Saber quandos pets foram vacinados
    [4] - Adicionar pet
    [5] - Atender cliente
    [6] - Verificar se é cliente Premium
    [7] - Buscar pet
    [8] - Filtrar tutor
    [0] - Sair`);
    
    entrada = prompt('Digite o número do serviço que deseja: ');
    
    if (entrada == '0') {
        console.log('Volte sempre!');
        break;
    } 
    else if (entrada == '1') listarPets();
    else if (entrada == '2') vacinarPet(prompt('Digite o nome do Pet: '));
    else if (entrada == '3') campanhaVacina();
    else if (entrada == '4') {
        let nome = prompt('Digite o nome do Pet: ');
        let tipo = prompt('Digite o tipo de Pet: ');
        let idade = prompt('Digite a idade do Pet: ');
        let raca = prompt('Digite a raça do Pet: ');
        let peso = prompt('Digite o peso do Pet: ');
        let tutor = prompt('Digite o nome do tutor: ');
        let contato = prompt('Digite o contato do tutor: ');
        let vacinado = prompt('O pet está vacinado?[true/false] ');
        adicionarPet(nome, tipo, idade, raca, peso, tutor, contato, vacinado, []);
    }
    else if (entrada == '5') {
        let nome = prompt('Digite o nome do Pet: ');
        let servico = prompt('Digite o tipo de serviço: ');
        atenderCliente(servico, nome);
    }
    else if (entrada == '6') {
        let nome = prompt('Digite o nome do Pet: ');
        clientePremium(nome);
    }
    else if (entrada == '7') {
        let nome = prompt('Digite o nome do Pet para consultar: ');
        pesquisarPet(nome);
    }
    else if (entrada == '8') {
        let nomeTutor = prompt('Digite o nome do tutor para consultar: ');
        filtrarTutor(nomeTutor);
    } else console.log('Opção inválida, tente novamente!');
}*/
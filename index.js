const caminhoBancoDeDados = './dadosPet.json';
let bancoDeDados = require(caminhoBancoDeDados);
const moment = require('moment');
const fs = require('fs');
const prompt = require('prompt-sync')();
const nomePetshop = "PETSHOP AVANADE";
let pets = bancoDeDados.pets;

const validarPet = (nomePet) => {
    for (const pet of pets) {
        if (pet.nome == nomePet) return true;
    }
}

const indiceDoPet = (nomePet) => {
    for (let i = 0; i < pets.length; i++) {
        if (pets[i].nome == nomePet) {
            return i;
        }
    }
}

const escreverJSON = () => {
    let dadosJS = JSON.stringify(bancoDeDados, null, 4);

    fs.writeFileSync(caminhoBancoDeDados, dadosJS);
}

const listarPets = () => {
    for (let pet of pets) {
        console.log(`Nome: ${pet.nome} \nIdade: ${pet.idade} \nTipo: ${pet.tipo} \nRaça: ${pet.raca}`);

        for (let servico of pet.servicos) {
            console.log(`${servico.data} - ${servico.nome}`);
        }

        pet.vacinado ? console.log(`${pet.nome} está vacinado!`) : console.log(`${pet.nome} NÃO está vacinado!`);
        console.log('--------------------------------')
    }
}

//listarPets();

const vacinarPet = nomePet => {
    if (validarPet(nomePet)) {
        if (pets[indiceDoPet(nomePet)].vacinado == true) {
            console.log(`Ops, ${pets[indiceDoPet(nomePet)].nome} já está vacinado!`);        
        } else {
            pets[indiceDoPet(nomePet)].vacinado = true;
            escreverJSON();
            console.log(`${pets[indiceDoPet(nomePet)].nome} foi vacinado com sucesso!`);
        }     
    } else {
        console.log(`${nomePet} não foi encontrado!`);
    }
}

const campanhaVacina = () => {
    var soma = 0;
    for (let pet of pets) {
        if (pet.vacinado == false) {
            soma ++;
        }
    }
    console.log(`${soma} foram vacinados!`)
}

const adicionarPet = (nome, tipo, idade, raca, peso, tutor, contato, vacinado, servicos) => {    
    if (!validarPet(nome)) {
        let dados = {
            nome: nome,
            tipo: tipo,
            idade: idade,
            raca: raca,
            peso: peso,
            tutor: tutor,
            contato: contato,
            vacinado: vacinado,
            servicos: servicos
        };
        
        pets.push(dados);

        escreverJSON();
        
        console.log(`${dados.nome} foi adicionado(a) com sucesso!`);
    } else {
        console.log(`${nomePet} já está cadastrado, tente outro nome!`);
    }
}

const atenderCliente = (servico, nomePet) => { 
    if (validarPet(nomePet)) {
        pets[indiceDoPet(nomePet)].servicos.push(JSON.stringify({
            nome: servico,
            data: moment().format('DD-MM-YYYY')
        }));
        
        escreverJSON();

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
    } else {
        console.log(`${nomePet} não foi encontrado!`);
    }
}

var entrada = 9;

while (entrada != 0) {
    console.log(`
    Bem-vindo ao ${nomePetshop}!
    Estes são os serviços disponíveis: 
    [1] - Listar Pets
    [2] - Vacinar Pet
    [3] - Saber quandos pets foram vacinados
    [4] - Adicionar pet
    [5] - Atender cliente
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
    } else console.log('Opção inválida, tente novamente!');
}
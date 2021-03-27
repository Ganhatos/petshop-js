let bancoDeDados = require('./dadosPet.json');
const moment = require('moment');
const fs = require('fs');
const nomePetshop = "PETSHOP AVANADE";

let pets = bancoDeDados.pets;

const escreverJSON = () => {
    let dadosJS = JSON.stringify(bancoDeDados, null, 4);

    fs.writeFileSync('dadosPet.json', dadosJS);
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
    for (let i = 0; i < pets.length; i++) {
        if (pets[i].nome == nomePet) {
            if (pets[i].vacinado == true) {
                console.log(`Ops, ${pets[i].nome} já está vacinado!`);
                return;
            
            } else {
                pets[i].vacinado = true;
                escreverJSON();
                console.log(`${pets[i].nome} foi vacinado com sucesso!`);
                return;
            }
        }       
    }
    console.log(`${nomePet} não foi encontrado!`);
}

//vacinarPet('Sansão');

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
}

//adicionarPet("Cremosinho", "cachorro", 6, "Snoop", 12, "Alex", "(81)9 8541-7852", false, []);

const atenderCliente = (servico, nomePet) => { 
    for (let i = 0; i < pets.length; i++) {
        if (pets[i].nome == nomePet) {
            pets[i].servicos.push(JSON.stringify({
                nome: servico,
                data: moment().format('DD-MM-YYYY')
            }));
            //escreverJSON();
        }       
    }

    console.log(pets);

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
        default:
            console.log(`${nomePet} não foi encontrado!`);
            break;
    }
}

//atenderCliente('banho', 'Sansão');
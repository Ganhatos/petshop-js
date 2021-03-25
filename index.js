const nomePetshop = "PETSHOP AVANADE";

let pets = [
    {
        nome: 'Lala',
        tipo: 'cachorro',
        idade: 5,
        raca: 'Vira-lata',
        peso: 3,
        tutor: 'Doug',
        contato: '(81) 98145-7456',
        vacinado: false,
        servicos: ['banho', 'tosa']
    },
    {
        nome: 'Sansão',
        tipo: 'cachorro',
        idade: 5,
        raca: 'Vira-lata',
        peso: 3,
        tutor: 'Doug',
        contato: '(81) 98145-7456',
        vacinado: false,
        servicos: []
    },
    {
        nome: 'Satanas',
        tipo: 'gato',
        idade: 6,
        raca: 'Vira-lata',
        peso: 3,
        tutor: 'Bruxa do 71',
        contato: '(81) 98541-3214',
        vacinado: false,
        servicos: ['banho', 'corte de unha']
    }
];

/*const listarPets = () => {
    for (let i = 0; i < pets.length; i++) {
        // console.log(pets[i].nome + " " + pets[i].raca);
        console.log(`O nome do pet é ${pets[i].nome}.`);        
    }
}*/

const listarPets = () => {
    for (let pet of pets) {
        console.log(`${pet.nome}, ${pet.idade}, ${pet.tipo}, ${pet.raca}`);
    }
}

const vacinarPet = () => {
    for (let pet of pets) {
        if (pet.vacinado == false) {
            pet.vacinado = true;
            console.log(`${pet.nome} foi vacinado com sucesso!`)
        }
        else {
            console.log(`Ops, ${pet.nome} já está vacinado!`)
        }
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

const adicionarPet = () => {
    pets.push({
        nome: 'Jk',
        tipo: 'cachorro',
        idade: 5,
        raca: 'Vira-lata',
        peso: 3,
        tutor: 'Doug',
        contato: '(81) 98145-7456',
        vacinado: false,
        servicos: []
    });
    for (let pet of pets) {
        console.log(pet.nome);
    }
}

adicionarPet();

const darBanhoPet = () => {
    for(let pet of pets){
            if(!(pet.servicos.includes('banho'))){
                pet.servicos.push('banho');
                console.log(`${pet.nome} está de banho tomado!`);    
        }
    } 
}

darBanhoPet();
listarPets();

const tosarPet = () => {
    for(let pet of pets){
            if(!(pet.servicos.includes('tosa'))){
                pet.servicos.push('tosa');
                console.log(`${pet.nome} está com cabelinho na régua!`);    
        }
    } 
}

// tosarPet();

const apararUnhasPet = () => {
    for(let pet of pets){
            if(!(pet.servicos.includes('corte de unhas'))){
                pet.servicos.push('corte de unhas');
                console.log(`${pet.nome} está de unhas aparadas!`);    
        }
    } 
}

// apararUnhasPet();
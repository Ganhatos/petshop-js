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
        vacinado: true,
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
        vacinado: true,
        servicos: ['banho']
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

const listarPets = () => {
    for (let i = 0; i < pets.length; i++) {
        console.log(pets[i].nome);        
    }
}

listarPets();
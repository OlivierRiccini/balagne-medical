import { IContent } from '../../app/models/content';

export const PROFESSIONALS_CONTENT: IContent = {
    chapters: [
        {
            title: { text: 'La Désinfection et protection' },
            sections: [
                {
                    title: { text: 'La désinfection médicale' },
                    paragraphes: [
                        {
                            text: `Balagne Medical Services vous propose une gamme complète de désinfectants
                            sélectionnés selon vos besoins, qui vous garantiront l’hygiène de votre matériel médical e
                             de l’environnement d’intervention.`
                        },
                        {
                            text: `Par exemple nous pouvons vous proposer des lingettes désinfectantes pour la
                            désinfection des instruments, des sprays désinfectants pour les surfaces,
                            des aérosols pour la désinfection de l’atmosphère etc… Notre offre est assez
                            conséquente et sera adapté a vos besoins.`
                        },
                        {
                            text: `Disponibles en plusieurs formats, nos produits peuvent être facilement emportés en intervention.`
                        }
                    ],
                    images: [
                        { url: './assets/images/image38.jpeg' },
                        { url: './assets/images/image39.jpeg' }
                    ]
                },
                {
                    title: { text: 'La protection médicale : les draps et les gants d’examens' },
                    paragraphes: [
                        {
                            text: `Peu importe votre spécialité, nos drap d’examens sont la pour protéger votre
                            mobilier médical. Notre gamme de draps d’examen est importante, vous pouvez avoir
                            le choix de la qualité, de la couleur, plastifiés, ou encore gaufrés. Ils ont tous
                            étés conçus pour une vous assurer une protection optimale.`
                        },
                        {
                            text: `Les gants médicaux sont nécessaires en milieu médical pour se protéger et
                            éviter la propagation des bactéries. Nous pouvons vous proposer des gants latex,
                            des gants vinyles ou des gants nitriles, poudrés ou non poudrés. Nos équipes sont
                            là pour vous guider quant au choix adapté à vos besoins. Nous avons sélectionnés parmi
                            les meilleures marques, tous nos gants d’examen, alliant la sécurité et le confort
                            nécessaire à vos différents examens médicaux.`
                        }
                    ],
                    images: [
                        { url: './assets/images/image40.jpeg' },
                        { url: './assets/images/image41.jpeg' }
                    ]
                }
            ]
        },
        {
            title: { text: 'Matériel pour les professionnels de santé' },
            sections: [
                {
                    title: { text: 'Petite instrumentation médico-chirurgicale' },
                    paragraphes: [
                        {
                            text: `Pour les soins et examens médicaux, nous vous proposons  toute la gamme d’instrument
                            et de petit matériel (ciseaux, pinces, bistouris, lames, kits à usage unique…).`
                        }
                    ],
                    images: [
                        { url: './assets/images/image44.jpeg' }
                    ]
                },
                {
                    title: { text: 'Les appareils pour le diagnostic médical' },
                    paragraphes: [
                        {
                            text: `Des tensiomètres électroniques ou manuels, aux otoscopes et autres stéthoscopes,
                            toute la gamme de matériel à visé diagnostique est à votre disposition dans notre espace de vente.`
                        }
                    ],
                    images: [
                        { url: './assets/images/image45.jpeg' },
                        { url: './assets/images/image46.jpeg' }
                    ]
                }
            ]
        },
        {
            title: { text: 'Pansements' },
            sections: [
                {
                    title: { text: 'Le traitement des plaies : Les compresses, les pansements et les désinfectants' },
                    paragraphes: [
                        {
                            text: `Pour le soin des plaies et des blessures,
                            nous avons dans notre point de vente une large
                            gamme de  désinfectants et de pansement adaptés.`
                        }
                    ],
                    images: [
                        { url: './assets/images/image42.jpeg' },
                        { url: './assets/images/image43.jpeg' }
                    ]
                }
            ]
        }
    ]
};

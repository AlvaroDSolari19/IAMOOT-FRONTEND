const questionText = {
    EN: [
            {
                currentCategory: 'Legal Arguments (0-30)', 
                minValue: 0, 
                maxValue: 30,
                currentCriteria: [
                    'General Knowledge of the Inter-American human rights system',
                    'Understanding and analysis of the issues presented',
                    'Knowledge of the facts of the case',
                    'Use of case law and secondary sources'  
                ],
                currentTemplate: [
                    'Poor (0-6)',
                    'Below Average (7-12)',
                    'Average (13-18)',
                    'Above Average (19-24)',
                    'Exceptional (25-30)' 
                ]
            },
            {
                currentCategory: 'Organization of Presentation (0-20)', 
                minValue: 0, 
                maxValue: 20,
                currentCriteria: [
                    'Structure and clarity of the presentation',
                    'Ability to synthesize factual material with the legal argument',
                    'Use of time',
                    'Claim of relief'  
                ],
                currentTemplate: [
                    'Poor (0-4)',
                    'Below Average (5-8)',
                    'Average (9-12)',
                    'Above Average (13-16)',
                    'Exceptional (17-20)' 
                ]
            },
            {
                currentCategory: 'General Evaluation (0-15)', 
                minValue: 0, 
                maxValue: 15,
                currentCriteria: [
                    'Persuasiveness',
                    'Ability to maintain line of argumentation after interruptions',
                    'Originality'
                ],
                currentTemplate: [
                    'Poor (0-3)',
                    'Below Average (4-6)',
                    'Average (7-9)',
                    'Above Average (10-12)',
                    'Exceptional (13-15)' 
                ]
            },
            {
                currentCategory: 'Responsiveness to Opponents (0-10)',
                minValue: 0, 
                maxValue: 10, 
                currentCriteria: [
                    'Ability to respond to the opponent\'s arguments',
                    'Ability to counter each of the opponent\'s arguments',
                    'Ability to anticipate the opponent\'s arguments'
                ],
                currentTemplate: [
                    'Poor (0-2)',
                    'Below Average (3-4)',
                    'Average (5-6)',
                    'Above Average (7-8)',
                    'Exceptional (9-10)' 
                ]
            },
            {
                currentCategory: 'Responsiveness to Judges (0-10)', 
                minValue: 0, 
                maxValue: 10,
                currentCriteria: [
                    'Ability to respond to the judges\'s questions',
                    'Did they really respond to or evade the questions?',
                    'Throughness in answering the questions presented',
                    'Ability to deal with hypothetical questions'
                ],
                currentTemplate: [
                    'Poor (0-2)',
                    'Below Average (3-4)',
                    'Average (5-6)',
                    'Above Average (7-8)',
                    'Exceptional (9-10)' 
                ]
            },
            {
                currentCategory: 'Delivery (0-15)', 
                minValue: 0, 
                maxValue: 15,
                currentCriteria: [
                    'Tone of voice',
                    'Composure',
                    'Eye-contact',
                    'Body language'
                ],
                currentTemplate: [
                    'Poor (0-3)',
                    'Below Average (4-6)',
                    'Average (7-9)',
                    'Above Average (10-12)',
                    'Exceptional (13-15)' 
                ]
            }
        ],
    ES: [
            {
                currentCategory: 'Argumentos Jurídicos (0-30)', 
                minValue: 0, 
                maxValue: 30,
                currentCriteria: [
                    'Conocimiento general del sistema interamericano de derechos humanos',
                    'Comprensión y análisis de los problemas presentados',
                    'Conocimiento de los hechos del caso',
                    'Uso de jurisprudencia y fuentes secundarias'  
                ],
                currentTemplate: [
                    'Deficiente (0-6)',
                    'Por debajo del promedio (7-12)',
                    'Promedio (13-18)',
                    'Por encima del promedio (19-24)',
                    'Excepcional (25-30)' 
                ]
            },
            {
                currentCategory: 'Organización de la Presentación (0-20)', 
                minValue: 0, 
                maxValue: 20,
                currentCriteria: [
                    'Estructura y claridad de la presentación',
                    'Capacidad para sintetizar material fáctico con el argumento jurídico',
                    'Uso del tiempo',
                    'Reclamación de reparación'  
                ],
                currentTemplate: [
                    'Deficiente (0-4)',
                    'Por debajo del promedio (5-8)',
                    'Promedio (9-12)',
                    'Por encima del promedio (13-16)',
                    'Excepcional (17-20)' 
                ]
            },
            {
                currentCategory: 'Evaluación General (0-15)', 
                minValue: 0, 
                maxValue: 15,
                currentCriteria: [
                    'Persuasión',
                    'Capacidad para mantener la línea de argumentación después de interrupciones',
                    'Originalidad'
                ],
                currentTemplate: [
                    'Deficiente (0-3)',
                    'Por debajo del promedio (4-6)',
                    'Promedio (7-9)',
                    'Por encima del promedio (10-12)',
                    'Excepcional (13-15)' 
                ]
            },
            {
                currentCategory: 'Capacidad de Respuesta a los Oponentes (0-10)',
                minValue: 0, 
                maxValue: 10, 
                currentCriteria: [
                    'Capacidad para responder a los argumentos del oponente',
                    'Capacidad para refutar cada uno de los argumentos del oponente',
                    'Capacidad para anticipar los argumentos del oponente'
                ],
                currentTemplate: [
                    'Deficiente (0-2)',
                    'Por debajo del promedio (3-4)',
                    'Promedio (5-6)',
                    'Por encima del promedio (7-8)',
                    'Excepcional (9-10)' 
                ]
            },
            {
                currentCategory: 'Capacidad de Respuesta a los Jueces (0-10)', 
                minValue: 0, 
                maxValue: 10,
                currentCriteria: [
                    'Capacidad para responder a las preguntas de los jueces',
                    '¿Realmente respondieron o evadieron las preguntas?',
                    'Profundidad en las respuestas presentadas',
                    'Capacidad para abordar preguntas hipotéticas'
                ],
                currentTemplate: [
                    'Deficiente (0-2)',
                    'Por debajo del promedio (3-4)',
                    'Promedio (5-6)',
                    'Por encima del promedio (7-8)',
                    'Excepcional (9-10)' 
                ]
            },
            {
                currentCategory: 'Expresión Oral (0-15)', 
                minValue: 0, 
                maxValue: 15,
                currentCriteria: [
                    'Tono de voz',
                    'Compostura',
                    'Contacto visual',
                    'Lenguaje corporal'
                ],
                currentTemplate: [
                    'Deficiente (0-3)',
                    'Por debajo del promedio (4-6)',
                    'Promedio (7-9)',
                    'Por encima del promedio (10-12)',
                    'Excepcional (13-15)' 
                ]
            }
        ],
    POR: [
            {
                currentCategory: 'Argumentação Jurídica (0-30)', 
                minValue: 0, 
                maxValue: 30,
                currentCriteria: [
                    'Conhecimento geral do sistema interamericano de direitos humanos',
                    'Compreensão e análise das questões apresentadas',
                    'Conhecimento dos fatos do caso',
                    'Uso de jurisprudência e fontes secundárias'  
                ],
                currentTemplate: [
                    'Fraco (0-6)',
                    'Abaixo da média (7-12)',
                    'Médio (13-18)',
                    'Acima da média (19-24)',
                    'Excepcional (25-30)' 
                ]
            },
            {
                currentCategory: 'Organização da Apresentação (0-20)', 
                minValue: 0, 
                maxValue: 20,
                currentCriteria: [
                    'Estrutura e clareza da apresentação',
                    'Capacidade de sintetizar material fático com o argumento jurídico',
                    'Uso do tempo',
                    'Reivindicação de reparação'  
                ],
                currentTemplate: [
                    'Fraco (0-4)',
                    'Abaixo da média (5-8)',
                    'Médio (9-12)',
                    'Acima da média (13-16)',
                    'Excepcional (17-20)' 
                ]
            },
            {
                currentCategory: 'Avaliação Geral (0-15)', 
                minValue: 0, 
                maxValue: 15,
                currentCriteria: [
                    'Poder de persuasão',
                    'Capacidade de manter a linha de argumentação após interrupções',
                    'Originalidade'
                ],
                currentTemplate: [
                    'Fraco (0-3)',
                    'Abaixo da média (4-6)',
                    'Médio (7-9)',
                    'Acima da média (10-12)',
                    'Excepcional (13-15)' 
                ]
            },
            {
                currentCategory: 'Capacidade de Resposta aos Oponentes (0-10)',
                minValue: 0, 
                maxValue: 10, 
                currentCriteria: [
                    'Capacidade de responder aos argumentos do oponente',
                    'Capacidade de refutar cada um dos argumentos do oponente',
                    'Capacidade de antecipar os argumentos do oponente'
                ],
                currentTemplate: [
                    'Fraco (0-2)',
                    'Abaixo da média (3-4)',
                    'Médio (5-6)',
                    'Acima da média (7-8)',
                    'Excepcional (9-10)' 
                ]
            },
            {
                currentCategory: 'Capacidade de Resposta aos Juízes (0-10)', 
                minValue: 0, 
                maxValue: 10,
                currentCriteria: [
                    'Capacidade de responder às perguntas dos juízes',
                    'Eles realmente responderam ou evitaram as perguntas?',
                    'Profundidade nas respostas apresentadas',
                    'Capacidade de lidar com perguntas hipotéticas'
                ],
                currentTemplate: [
                    'Fraco (0-2)',
                    'Abaixo da média (3-4)',
                    'Médio (5-6)',
                    'Acima da média (7-8)',
                    'Excepcional (9-10)' 
                ]
            },
            {
                currentCategory: 'Expressão Oral (0-15)', 
                minValue: 0, 
                maxValue: 15,
                currentCriteria: [
                    'Tom de voz',
                    'Compostura',
                    'Contato visual',
                    'Linguagem corporal'
                ],
                currentTemplate: [
                    'Fraco (0-3)',
                    'Abaixo da média (4-6)',
                    'Médio (7-9)',
                    'Acima da média (10-12)',
                    'Excepcional (13-15)' 
                ]
            }
        ]
}

export default questionText; 
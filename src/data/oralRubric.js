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
                    'Exceptional (25-30)',
                    'Above Average (19-24)',
                    'Average (13-18)',
                    'Below Average (7-12)',
                    'Poor (0-6)' 
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
                    'Exceptional (17-20)',
                    'Above Average (13-16)',
                    'Average (9-12)',
                    'Below Average (5-8)',
                    'Poor (0-4)' 
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
                    'Exceptional (13-15)',
                    'Above Average (10-12)',
                    'Average (7-9)',
                    'Below Average (4-6)',
                    'Poor (0-3)' 
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
                    'Exceptional (9-10)',
                    'Above Average (7-8)',
                    'Average (5-6)',
                    'Below Average (3-4)',
                    'Poor (0-2)' 
                ]
            },
            {
                currentCategory: 'Responsiveness to Judges (0-10)', 
                minValue: 0, 
                maxValue: 10,
                currentCriteria: [
                    'Ability to respond to the judges\'s questions',
                    'Did they respond clearly or avoid the question?',
                    'Thoroughness in answering the questions presented',
                    'Ability to deal with hypothetical questions'
                ],
                currentTemplate: [
                    'Exceptional (9-10)',
                    'Above Average (7-8)',
                    'Average (5-6)',
                    'Below Average (3-4)',
                    'Poor (0-2)' 
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
                    'Exceptional (13-15)',
                    'Above Average (10-12)',
                    'Average (7-9)',
                    'Below Average (4-6)',
                    'Poor (0-3)' 
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
                    'Excepcional (25-30)',
                    'Por encima del promedio (19-24)',
                    'Promedio (13-18)',
                    'Por debajo del promedio (7-12)',
                    'Deficiente (0-6)' 
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
                    'Excepcional (17-20)',
                    'Por encima del promedio (13-16)',
                    'Promedio (9-12)',
                    'Por debajo del promedio (5-8)',
                    'Deficiente (0-4)' 
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
                    'Excepcional (13-15)',
                    'Por encima del promedio (10-12)',
                    'Promedio (7-9)',
                    'Por debajo del promedio (4-6)',
                    'Deficiente (0-3)' 
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
                    'Excepcional (9-10)',
                    'Por encima del promedio (7-8)',
                    'Promedio (5-6)',
                    'Por debajo del promedio (3-4)',
                    'Deficiente (0-2)' 
                ]
            },
            {
                currentCategory: 'Capacidad de Respuesta a los Jueces (0-10)', 
                minValue: 0, 
                maxValue: 10,
                currentCriteria: [
                    'Capacidad para responder a las preguntas de los jueces',
                    '¿Respondieron claramente o evitaron la pregunta?',
                    'Profundidad en las respuestas presentadas',
                    'Capacidad para abordar preguntas hipotéticas'
                ],
                currentTemplate: [
                    'Excepcional (9-10)',
                    'Por encima del promedio (7-8)',
                    'Promedio (5-6)',
                    'Por debajo del promedio (3-4)',
                    'Deficiente (0-2)' 
                ]
            },
            {
                currentCategory: 'Desempeño Oral (0-15)', 
                minValue: 0, 
                maxValue: 15,
                currentCriteria: [
                    'Tono de voz',
                    'Compostura',
                    'Contacto visual',
                    'Lenguaje corporal'
                ],
                currentTemplate: [
                    'Excepcional (13-15)',
                    'Por encima del promedio (10-12)',
                    'Promedio (7-9)',
                    'Por debajo del promedio (4-6)',
                    'Deficiente (0-3)' 
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
                    'Excepcional (25-30)',
                    'Acima da média (19-24)',
                    'Médio (13-18)',
                    'Abaixo da média (7-12)',
                    'Fraco (0-6)' 
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
                    'Excepcional (17-20)',
                    'Acima da média (13-16)',
                    'Médio (9-12)',
                    'Abaixo da média (5-8)',
                    'Fraco (0-4)' 
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
                    'Excepcional (13-15)',
                    'Acima da média (10-12)',
                    'Médio (7-9)',
                    'Abaixo da média (4-6)',
                    'Fraco (0-3)' 
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
                    'Excepcional (9-10)',
                    'Acima da média (7-8)',
                    'Médio (5-6)',
                    'Abaixo da média (3-4)',
                    'Fraco (0-2)' 
                ]
            },
            {
                currentCategory: 'Capacidade de Resposta aos Juízes (0-10)', 
                minValue: 0, 
                maxValue: 10,
                currentCriteria: [
                    'Capacidade de responder às perguntas dos juízes',
                    'Responderam claramente ou evitaram a pergunta?',
                    'Profundidade nas respostas apresentadas',
                    'Capacidade de lidar com perguntas hipotéticas'
                ],
                currentTemplate: [
                    'Excepcional (9-10)',
                    'Acima da média (7-8)',
                    'Médio (5-6)',
                    'Abaixo da média (3-4)',
                    'Fraco (0-2)' 
                ]
            },
            {
                currentCategory: 'Desempenho Oral (0-15)', 
                minValue: 0, 
                maxValue: 15,
                currentCriteria: [
                    'Tom de voz',
                    'Compostura',
                    'Contato visual',
                    'Linguagem corporal'
                ],
                currentTemplate: [
                    'Excepcional (13-15)',
                    'Acima da média (10-12)',
                    'Médio (7-9)',
                    'Abaixo da média (4-6)',
                    'Fraco (0-3)' 
                ]
            }
        ]
}

export default questionText; 
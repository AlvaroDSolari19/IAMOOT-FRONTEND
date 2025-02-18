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
    ES: {},
    POR: {}
}

export default questionText; 
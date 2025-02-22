const questionText = {
    EN: [
        {
            currentCategory: 'Identification of Issues - 25 Points Maximum',
            minValue: 0, 
            maxValue: 30, 
            currentCriteria: [
                'Did they identify the key legal issues to support their position?', 
                'Did they provider counterarguments for issues contrary to their position?'
            ]
        }, 
        {
            currentCategory: 'Statement of Facts - 15 Points Maximum', 
            minValue: 0, 
            maxValue: 15, 
            currentCriteria: [ 
                'Did the Statement of Facts accurately and persuasively present the record while dealing candidly with the unfavorable facts?', 
                'Were the facts organized logically (i.e., chronological or other rational and thoughtful sequence?'
            ]
        }, 
        {
            currentCategory: 'Legal Analysis (Arguments) - 40 Points Maximum', 
            minValue: 0, 
            maxValue: 40, 
            currentCriteria: [ 
                'Were the arguments well-organized and persuasive?', 
                'Were the issues addressed throughly and logically?',
                'Were the authorities for advocates\' positions explained and used to their full advantage?', 
                'Were the authorities for opponenets\' positions distinguished or explained?', 
                'Were the opponents\' arguments anticipated and/or refuted?', 
                'Did they use and interpret all authorities correctly?'
            ]
        },
        {
            currentCategory: 'Request for Relief - 5 Points Maximum', 
            minValue: 0, 
            maxValue: 5, 
            currentCriteria: [ 
                'Is there a specific request for relief?', 
                'Does the request for relief ecctively summarize their arguments?'
            ]
        },
        {
            currentCategory: 'Style and Presentation - 5 Points Maximum', 
            minValue: 0, 
            maxValue: 5, 
            currentCriteria: [ 
                'Was the writing style precise and well-organized?', 
                'Were the spelling, punctuation, and word-choice correct?', 
                'Did the writing flow and was it easy to read?'
            ]
        },
        {
            currentCategory: 'Overall - 10 Points Maximum', 
            minValue: 0, 
            maxValue: 10, 
            currentCriteria: [ 
                'How would you rate this Memorial overall? ', 
                'A. Excellent (10 points)',
                'B. Very Good (8 points)',
                'C. Good (6 points)', 
                'D. Fair (4 points)', 
                'E. Poor (2 points)'
            ]
        } 
    ]
} 

export default questionText; 
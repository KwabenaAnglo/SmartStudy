import { Basic4Subject, Topic, Lesson, VocabularyTerm, Example, Basic4Quiz, Basic4Question } from '../types';

// Sample Basic 4 Educational Content
export const basic4Subjects: Basic4Subject[] = [
  {
    id: 'english',
    name: 'English Language',
    color: '#667eea',
    description: 'Develop reading, writing, speaking, and listening skills',
    totalLessons: 24,
    completedLessons: 0,
    topics: []
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    color: '#28a745',
    description: 'Build number sense, geometry, and problem-solving skills',
    totalLessons: 30,
    completedLessons: 0,
    topics: []
  },
  {
    id: 'science',
    name: 'Science',
    color: '#ffc107',
    description: 'Explore the natural world through observation and experiments',
    totalLessons: 20,
    completedLessons: 0,
    topics: []
  },
  {
    id: 'social-studies',
    name: 'Social Studies',
    color: '#dc3545',
    description: 'Learn about communities, history, and geography',
    totalLessons: 18,
    completedLessons: 0,
    topics: []
  },
  {
    id: 'ict',
    name: 'ICT (Information & Communication Technology)',
    color: '#6f42c1',
    description: 'Develop digital literacy and computer skills',
    totalLessons: 15,
    completedLessons: 0,
    topics: []
  }
];

// English Language Topics and Lessons
export const englishTopics: Topic[] = [
  {
    id: 'english-reading',
    name: 'Reading Comprehension',
    subjectId: 'english',
    lessonNumber: 1,
    duration: '45 minutes',
    prerequisiteKnowledge: ['Basic letter recognition', 'Simple word reading'],
    lessons: [
      {
        id: 'english-reading-1',
        topicId: 'english-reading',
        lessonNumber: 1,
        title: 'Understanding Main Ideas',
        learningObjectives: [
          'Identify the main idea of a paragraph',
          'Find supporting details',
          'Answer questions about what was read'
        ],
        content: `In this lesson, we will learn how to find the main idea when reading. The main idea is what the paragraph or story is mostly about. It's like the big picture!

When you read a paragraph, ask yourself:
- What is this paragraph telling me?
- What is the most important point?
- What would I tell someone else about this?

Supporting details are the smaller pieces of information that help explain the main idea. They give us more information and make the main idea clearer.`,
        keyVocabulary: [
          {
            term: 'Main Idea',
            definition: 'The most important point or message in a text',
            example: 'The main idea of a story about a dog might be "Dogs are loyal friends."'
          },
          {
            term: 'Supporting Details',
            definition: 'Information that helps explain or prove the main idea',
            example: 'Details about how the dog helps its owner are supporting details.'
          },
          {
            term: 'Paragraph',
            definition: 'A group of sentences about one main topic',
            example: 'This lesson is written in paragraphs.'
          }
        ],
        examples: [
          {
            description: 'Reading a story about animals',
            explanation: 'The main idea might be "Animals help people in many ways." Supporting details could include examples like dogs helping police, horses helping farmers, and cats catching mice.'
          },
          {
            description: 'Reading about food',
            explanation: 'If the main idea is "Fruits are healthy," supporting details might include vitamins, fiber, and natural sugars.'
          }
        ],
        illustrations: ['/images/reading-main-idea.jpg', '/images/supporting-details.jpg'],
        duration: '45 minutes',
        difficulty: 'easy',
        isCompleted: false
      }
    ]
  },
  {
    id: 'english-grammar',
    name: 'Grammar and Parts of Speech',
    subjectId: 'english',
    lessonNumber: 2,
    duration: '45 minutes',
    prerequisiteKnowledge: ['Basic sentence structure', 'Word recognition'],
    lessons: [
      {
        id: 'english-grammar-1',
        topicId: 'english-grammar',
        lessonNumber: 1,
        title: 'Nouns and Verbs',
        learningObjectives: [
          'Identify nouns (naming words)',
          'Identify verbs (action words)',
          'Use nouns and verbs in sentences'
        ],
        content: `Today we will learn about two important parts of speech: nouns and verbs.

**Nouns** are naming words. They name:
- People: teacher, student, mother, father
- Places: school, home, park, library
- Things: book, pencil, table, car
- Animals: dog, cat, bird, fish

**Verbs** are action words. They tell us what someone or something does:
- Run, jump, play, read
- Write, draw, sing, dance
- Eat, sleep, walk, talk

Every sentence needs both a noun and a verb to make sense!`,
        keyVocabulary: [
          {
            term: 'Noun',
            definition: 'A word that names a person, place, thing, or animal',
            example: 'Cat, school, teacher, and book are all nouns.'
          },
          {
            term: 'Verb',
            definition: 'A word that shows action or what someone does',
            example: 'Run, jump, and read are all verbs.'
          },
          {
            term: 'Sentence',
            definition: 'A group of words that expresses a complete thought',
            example: 'The cat runs fast.'
          }
        ],
        examples: [
          {
            description: 'Simple sentence',
            explanation: 'The dog barks. (dog = noun, barks = verb)'
          },
          {
            description: 'Another sentence',
            explanation: 'Children play games. (children, games = nouns, play = verb)'
          }
        ],
        illustrations: ['/images/nouns-verbs.jpg', '/images/sentence-structure.jpg'],
        duration: '45 minutes',
        difficulty: 'easy',
        isCompleted: false
      }
    ]
  }
];

// Mathematics Topics and Lessons
export const mathTopics: Topic[] = [
  {
    id: 'math-numbers',
    name: 'Number Sense and Operations',
    subjectId: 'mathematics',
    lessonNumber: 1,
    duration: '45 minutes',
    prerequisiteKnowledge: ['Counting 1-100', 'Basic addition'],
    lessons: [
      {
        id: 'math-numbers-1',
        topicId: 'math-numbers',
        lessonNumber: 1,
        title: 'Place Value and Expanded Form',
        learningObjectives: [
          'Understand place value up to 1000',
          'Write numbers in expanded form',
          'Compare numbers using >, <, and ='
        ],
        content: `Today we will learn about place value and how to write numbers in different ways.

**Place Value** tells us what each digit in a number means:
- Ones place: the rightmost digit (1, 2, 3...)
- Tens place: the middle digit (10, 20, 30...)
- Hundreds place: the leftmost digit (100, 200, 300...)

**Expanded Form** shows the value of each digit:
- 234 = 200 + 30 + 4
- 156 = 100 + 50 + 6
- 789 = 700 + 80 + 9

**Comparing Numbers:**
- 234 > 156 (234 is greater than 156)
- 156 < 234 (156 is less than 234)
- 234 = 234 (234 equals 234)`,
        keyVocabulary: [
          {
            term: 'Place Value',
            definition: 'The value of a digit based on its position in a number',
            example: 'In 234, the 2 is worth 200, the 3 is worth 30, and the 4 is worth 4.'
          },
          {
            term: 'Expanded Form',
            definition: 'A way to write a number showing the value of each digit',
            example: '234 = 200 + 30 + 4'
          },
          {
            term: 'Greater Than (>)',
            definition: 'A symbol showing one number is larger than another',
            example: '5 > 3 means 5 is greater than 3.'
          }
        ],
        examples: [
          {
            description: 'Writing 456 in expanded form',
            explanation: '456 = 400 + 50 + 6 (4 hundreds + 5 tens + 6 ones)'
          },
          {
            description: 'Comparing 234 and 156',
            explanation: '234 > 156 because 234 has more hundreds (200 vs 100)'
          }
        ],
        illustrations: ['/images/place-value.jpg', '/images/expanded-form.jpg'],
        duration: '45 minutes',
        difficulty: 'medium',
        isCompleted: false
      }
    ]
  }
];

// Science Topics and Lessons
export const scienceTopics: Topic[] = [
  {
    id: 'science-living-things',
    name: 'Living Things and Their Environment',
    subjectId: 'science',
    lessonNumber: 1,
    duration: '45 minutes',
    prerequisiteKnowledge: ['Basic observation skills', 'Simple classification'],
    lessons: [
      {
        id: 'science-living-1',
        topicId: 'science-living-things',
        lessonNumber: 1,
        title: 'Characteristics of Living Things',
        learningObjectives: [
          'Identify what makes something alive',
          'Classify objects as living or non-living',
          'Understand basic needs of living things'
        ],
        content: `Today we will learn about what makes something alive and what living things need to survive.

**Living Things:**
- Grow and change
- Need food and water
- Breathe (take in air)
- Reproduce (make more of themselves)
- Respond to their environment
- Move (even plants move toward light!)

**Non-Living Things:**
- Do not grow
- Do not need food or water
- Do not breathe
- Do not reproduce
- Do not respond to environment

**Basic Needs of Living Things:**
- Food (energy)
- Water
- Air (oxygen)
- Shelter
- Space to live`,
        keyVocabulary: [
          {
            term: 'Living Thing',
            definition: 'Something that is alive and can grow, change, and reproduce',
            example: 'Plants, animals, and people are living things.'
          },
          {
            term: 'Non-Living Thing',
            definition: 'Something that is not alive and cannot grow or change',
            example: 'Rocks, water, and air are non-living things.'
          },
          {
            term: 'Environment',
            definition: 'The surroundings where living things live',
            example: 'A forest is the environment for many animals and plants.'
          }
        ],
        examples: [
          {
            description: 'Living things in your home',
            explanation: 'Pets, plants, and family members are living things. Furniture and toys are non-living.'
          },
          {
            description: 'Living things in nature',
            explanation: 'Trees, birds, insects, and fish are all living things. Rocks and water are non-living.'
          }
        ],
        illustrations: ['/images/living-things.jpg', '/images/basic-needs.jpg'],
        duration: '45 minutes',
        difficulty: 'easy',
        isCompleted: false
      }
    ]
  }
];

// Social Studies Topics and Lessons
export const socialStudiesTopics: Topic[] = [
  {
    id: 'social-community',
    name: 'Community and Citizenship',
    subjectId: 'social-studies',
    lessonNumber: 1,
    duration: '45 minutes',
    prerequisiteKnowledge: ['Knowing family and school roles'],
    lessons: [
      {
        id: 'social-community-1',
        topicId: 'social-community',
        lessonNumber: 1,
        title: 'Our Community',
        learningObjectives: [
          'Can you explain what a community is and why people live together?',
          'How do rules and laws help keep people safe?',
          'What are your rights and responsibilities as a child?'
        ],
        content: `In this lesson, we learn about what a community is, how people work together, and why rules help us live safely and happily.`,
        keyVocabulary: [
          { term: 'Community', definition: 'A group of people who live and work together', example: 'Your town is a community.', partOfSpeech: 'noun', relatedTerms: ['neighbourhood'] },
          { term: 'Rules', definition: 'Guides that tell us the right way to behave', example: 'Do not litter is a rule.' },
          { term: 'Responsibility', definition: 'Something you should do', example: 'Keeping your classroom tidy is a responsibility.' }
        ],
        examples: [
          { description: 'School rules', explanation: 'Rules help keep everyone safe and fair.' }
        ],
        illustrations: ['/images/community.jpg'],
        duration: '45 minutes',
        difficulty: 'easy',
        isCompleted: false
      }
    ]
  }
];

// ICT Topics and Lessons
export const ictTopics: Topic[] = [
  {
    id: 'ict-basics',
    name: 'Computer Basics and Safety',
    subjectId: 'ict',
    lessonNumber: 1,
    duration: '45 minutes',
    prerequisiteKnowledge: ['Basic classroom safety'],
    lessons: [
      {
        id: 'ict-basics-1',
        topicId: 'ict-basics',
        lessonNumber: 1,
        title: 'Parts of a Computer and Safe Use',
        learningObjectives: [
          'Can you name parts of a computer (monitor, mouse, keyboard)?',
          'How do you create, save, and open a simple file?',
          'What is the internet and how do we use it safely?'
        ],
        content: `We will learn the names of basic computer parts and how to use a computer safely and responsibly.`,
        keyVocabulary: [
          { term: 'Monitor', definition: 'The screen you look at', example: 'The monitor shows pictures and text.' },
          { term: 'Keyboard', definition: 'The keys you press to type', example: 'Use the keyboard to write words.' },
          { term: 'Mouse', definition: 'A tool to move the pointer on the screen', example: 'Click the mouse to open a program.' }
        ],
        examples: [
          { description: 'Turning a computer on/off', explanation: 'Use the power button and shut down properly to keep files safe.' }
        ],
        illustrations: ['/images/ict-computer-parts.jpg'],
        duration: '45 minutes',
        difficulty: 'easy',
        isCompleted: false
      }
    ]
  }
];

// Sample Quizzes
export const sampleQuizzes: Basic4Quiz[] = [
  {
    id: 'quiz-english-reading-1',
    lessonId: 'english-reading-1',
    title: 'Main Ideas Quiz',
    subject: 'English Language',
    topic: 'Reading Comprehension',
    difficulty: 'easy',
    timeLimit: 15,
    questions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        text: 'What is the main idea?',
        options: [
          'The most important point in a text',
          'The longest sentence in a paragraph',
          'The first word in a story',
          'The last sentence in a paragraph'
        ],
        correctAnswer: 0,
        explanation: 'The main idea is the most important point or message in a text. It tells us what the text is mostly about.',
        points: 10
      },
      {
        id: 'q2',
        type: 'true-false',
        text: 'Supporting details help explain the main idea.',
        correctAnswer: true,
        explanation: 'Yes! Supporting details give us more information and help make the main idea clearer.',
        points: 10
      },
      {
        id: 'q3',
        type: 'fill-blank',
        text: 'Every paragraph should have one main _____ and several supporting details.',
        correctAnswer: 'idea',
        explanation: 'The blank should be filled with "idea" because every paragraph needs one main idea.',
        points: 10
      }
    ],
    createdAt: new Date(),
    userId: ''
  },
  {
    id: 'quiz-math-numbers-1',
    lessonId: 'math-numbers-1',
    title: 'Place Value Quiz',
    subject: 'Mathematics',
    topic: 'Number Sense and Operations',
    difficulty: 'medium',
    timeLimit: 20,
    questions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        text: 'What is the value of the digit 5 in the number 456?',
        options: ['5', '50', '500', '5000'],
        correctAnswer: 1,
        explanation: 'The digit 5 is in the tens place, so it has a value of 50.',
        points: 15
      },
      {
        id: 'q2',
        type: 'fill-blank',
        text: 'Write 789 in expanded form: ___ + ___ + ___',
        correctAnswer: '700 + 80 + 9',
        explanation: '789 = 7 hundreds + 8 tens + 9 ones = 700 + 80 + 9',
        points: 15
      }
    ],
    createdAt: new Date(),
    userId: ''
  }
];

// Initialize topics for each subject
basic4Subjects[0].topics = englishTopics;
basic4Subjects[1].topics = mathTopics;
basic4Subjects[2].topics = scienceTopics;
basic4Subjects[3].topics = socialStudiesTopics;
basic4Subjects[4].topics = ictTopics;

export const getAllSubjects = () => basic4Subjects;
export const getAllTopics = () => [...englishTopics, ...mathTopics, ...scienceTopics, ...socialStudiesTopics, ...ictTopics];
export const getAllLessons = () => {
  const allTopics = getAllTopics();
  return allTopics.flatMap(topic => topic.lessons);
};
export const getAllQuizzes = () => sampleQuizzes;

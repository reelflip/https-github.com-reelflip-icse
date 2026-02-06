
import { ActivityContent, StoryNode, ScienceExperiment, Grade } from "../types.ts";

const STATIC_CONTENT = {
  Math: {
    1: [
      { title: "Counting Fun", description: "Learn numbers up to 50!", question: "What comes after 19?", options: ["18", "20", "21"], answer: "20", funFact: "The number 10 is called a 'decade' of ones!" },
      { title: "Simple Shapes", description: "Finding shapes around us.", question: "What shape is a sandwich cut into two?", options: ["Square", "Triangle", "Circle"], answer: "Triangle", funFact: "Triangles are the strongest shapes!" }
    ],
    2: [
      { title: "3-Digit Magic", description: "Mastering hundreds, tens, and ones.", question: "What is the value of 4 in 452?", options: ["4", "40", "400"], answer: "400", funFact: "Zero was first used as a number in India!" },
      { title: "Carry Over Addition", description: "Adding big numbers together.", question: "What is 156 + 44?", options: ["190", "200", "210"], answer: "200", funFact: "Addition is just fast counting!" },
      { title: "Solid Shapes", description: "Exploring 3D objects.", question: "Which shape looks like a football?", options: ["Cube", "Cone", "Sphere"], answer: "Sphere", funFact: "A sphere has no corners!" }
    ],
    3: [
      { title: "4-Digit Numbers", description: "Entering the thousands!", question: "How do you write 'Five Thousand Two'?", options: ["502", "5002", "5020"], answer: "5002", funFact: "1,000 is the first number with a comma!" },
      { title: "Fractions Intro", description: "Sharing is caring!", question: "If you eat half a pizza, how many parts out of 2 is that?", options: ["1", "2", "0"], answer: "1", funFact: "The top number in a fraction is called the Numerator!" }
    ],
    4: [
      { title: "Large Numbers", description: "Numbers up to Lakhs.", question: "What is 10,000 more than 50,000?", options: ["60,000", "51,000", "1,00,000"], answer: "60,000", funFact: "One Lakh has five zeros!" },
      { title: "Area & Perimeter", description: "Measuring boundaries.", question: "What is the perimeter of a square with side 5cm?", options: ["10cm", "20cm", "25cm"], answer: "20cm", funFact: "Perimeter comes from 'peri' meaning around!" }
    ],
    5: [
      { title: "Decimals", description: "Numbers smaller than one.", question: "What is 0.5 + 0.5?", options: ["0.10", "1.0", "0.25"], answer: "1.0", funFact: "Decimal points help us talk about money!" },
      { title: "Volume", description: "Space inside a box.", question: "Volume of a cube with side 2cm?", options: ["4cm³", "6cm³", "8cm³"], answer: "8cm³", funFact: "Water expands when it freezes!" }
    ]
  },
  EVS: {
    1: [
      { title: "My Body", description: "Knowing your parts.", question: "Which part helps you taste ice cream?", options: ["Nose", "Tongue", "Eyes"], answer: "Tongue", funFact: "Your tongue is the strongest muscle for its size!" }
    ],
    2: [
      { title: "Internal Organs", description: "The machines inside you.", question: "Which organ helps you think?", options: ["Heart", "Brain", "Stomach"], answer: "Brain", funFact: "Your brain generates enough electricity to power a lightbulb!" },
      { title: "Types of Plants", description: "Herbs, Shrubs, and Trees.", question: "Which of these is a climber?", options: ["Rose", "Money Plant", "Mango Tree"], answer: "Money Plant", funFact: "Some plants can grow over 3 feet in a single day!" },
      { title: "Safety Rules", description: "Staying safe on the road.", question: "Which light tells us to STOP?", options: ["Green", "Yellow", "Red"], answer: "Red", funFact: "Red is used for stop because it can be seen from far away!" }
    ],
    3: [
      { title: "The Solar System", description: "Our neighborhood in space.", question: "Which is the Red Planet?", options: ["Venus", "Mars", "Jupiter"], answer: "Mars", funFact: "Mars has the largest volcano in the solar system!" },
      { title: "Early Man", description: "How humans lived long ago.", question: "What was the first tool made of?", options: ["Metal", "Stone", "Plastic"], answer: "Stone", funFact: "Early humans used animal skins for clothes!" }
    ],
    4: [
      { title: "Our Environment", description: "Pollution and protection.", question: "Which gas do plants give us?", options: ["Carbon Dioxide", "Oxygen", "Nitrogen"], answer: "Oxygen", funFact: "One large tree can provide oxygen for 4 people!" }
    ],
    5: [
      { title: "India's Features", description: "Mountains, Plains, and Deserts.", question: "Which is the highest mountain range in the world?", options: ["Andes", "Himalayas", "Alps"], answer: "Himalayas", funFact: "Himalaya means 'Abode of Snow'!" }
    ]
  },
  Science: {
    1: [
      { title: "Living vs Non-Living", description: "What breathes and grows?", materials: ["Stone", "Plant", "Water"], steps: ["Touch both", "Wait a week", "See which grows"], explanation: "Living things grow, breathe, and need food!", videoPrompt: "Growth of a flower" }
    ],
    2: [
      { title: "States of Matter", description: "Solid, Liquid, Gas.", materials: ["Ice", "Water", "Steam"], steps: ["Freeze water", "Melt ice", "Boil water"], explanation: "Everything is made of matter!", videoPrompt: "Melting ice cube" },
      { title: "Animal Habitats", description: "Where do animals live?", materials: ["Pictures", "Map"], steps: ["Find fish", "Find lion", "Find camel"], explanation: "Animals adapt to their surroundings!", videoPrompt: "Fish in water" }
    ],
    3: [
      { title: "Force and Motion", description: "Push and Pull.", materials: ["Toy car", "Ramp"], steps: ["Push car", "Let it roll", "Measure distance"], explanation: "A force is needed to start or stop motion!", videoPrompt: "Rolling ball" }
    ],
    4: [
      { title: "Digestive System", description: "Where food goes.", materials: ["Chart", "Model"], steps: ["Mouth", "Stomach", "Intestines"], explanation: "Digestion turns food into energy!", videoPrompt: "Food processing" }
    ],
    5: [
      { title: "Simple Machines", description: "Levers and Pulleys.", materials: ["Stick", "Stone"], steps: ["Use stick as lever", "Lift stone"], explanation: "Machines make our work easier!", videoPrompt: "Lever lifting weight" }
    ]
  },
  Stories: {
    1: [{ text: "Mia the Ant found a sugar cube. It was too heavy! She called her friends.", illustrationPrompt: "Ants carrying sugar", options: [{ text: "Push together", nextPrompt: "push" }], isEnd: false }],
    2: [{ text: "Nutty the Squirrel found a map in the Hollow Tree. It showed a path to the Golden Nut.", illustrationPrompt: "Squirrel with map", options: [{ text: "Follow the path", nextPrompt: "path" }, { text: "Ask Owl", nextPrompt: "owl" }], isEnd: false }],
    3: [{ text: "The Spaceship 'ICSE-1' landed on the Moon. Captain Leo stepped out.", illustrationPrompt: "Astronaut on moon", options: [{ text: "Explore crater", nextPrompt: "crater" }], isEnd: false }],
    4: [{ text: "Rohan discovered an old diary in the attic. It belonged to a freedom fighter.", illustrationPrompt: "Boy reading old diary", options: [{ text: "Read first page", nextPrompt: "read" }], isEnd: false }],
    5: [{ text: "Professor Brainy invented a Time Machine. He wants to visit the Mauryan Empire.", illustrationPrompt: "Mad scientist time machine", options: [{ text: "Go to 300 BC", nextPrompt: "past" }], isEnd: false }]
  }
};

export const getStoryNode = async (grade: Grade, prompt: string, history: string[] = []): Promise<StoryNode> => {
  const stories = (STATIC_CONTENT.Stories as any)[grade] || STATIC_CONTENT.Stories[2];
  if (prompt === "path") return { text: "Nutty found the Golden Nut! He shared it with all the forest animals. The End!", illustrationPrompt: "Happy animals eating", options: [], isEnd: true };
  if (prompt === "owl") return { text: "Wise Owl told Nutty that the real treasure was the map-reading skills he learned! The End!", illustrationPrompt: "Owl and squirrel talking", options: [], isEnd: true };
  return stories[0];
};

export const generateKidImage = async (prompt: string): Promise<string> => {
  const seed = encodeURIComponent(prompt.substring(0, 20));
  return `https://picsum.photos/seed/${seed}/600/600`;
};

export const getScienceExperiment = async (grade: Grade, topic: string): Promise<ScienceExperiment> => {
  const experiments = (STATIC_CONTENT.Science as any)[grade] || STATIC_CONTENT.Science[2];
  const found = experiments.find((e: any) => e.title.toLowerCase().includes(topic.toLowerCase())) || experiments[0];
  return found;
};

export const getMathChallenge = async (grade: Grade, type: string): Promise<ActivityContent> => {
  const problems = (STATIC_CONTENT.Math as any)[grade] || (STATIC_CONTENT.Math as any)[2];
  return problems[Math.floor(Math.random() * problems.length)];
};

export const getEVSTopic = async (grade: Grade, topic: string): Promise<ActivityContent> => {
  const topics = (STATIC_CONTENT.EVS as any)[grade] || (STATIC_CONTENT.EVS as any)[2];
  const found = topics.find((t: any) => t.title.toLowerCase().includes(topic.toLowerCase())) || topics[0];
  return found;
};

export const speakText = async (text: string): Promise<void> => {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.pitch = 1.1;
  utterance.rate = 0.9;
  const voices = window.speechSynthesis.getVoices();
  const femaleVoice = voices.find(v => v.name.includes('Female') || v.name.includes('Google US English'));
  if (femaleVoice) utterance.voice = femaleVoice;
  window.speechSynthesis.speak(utterance);
};
